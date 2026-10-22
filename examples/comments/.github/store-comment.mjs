import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";

/**
 * Validates one submitted comment and writes it as a file.
 *
 * This is the only gate between a stranger's browser and the store, so it
 * fails closed: anything it does not recognise is rejected and the job exits
 * non-zero, which means nothing is committed.
 *
 * Everything arrives through the environment. Nothing here is ever passed to a
 * shell.
 */

const MAX_AUTHOR = 60;
const MAX_BODY = 2000;

/**
 * A post key is a slug, and `.` is not in the set — which is what makes a
 * traversal out of the store impossible rather than merely unlikely.
 */
const POST_KEY = /^[a-z0-9][a-z0-9/-]{0,80}$/;

/** Control characters are the usual way to smuggle something past a check. */
// Strip input controls while preserving tabs and newlines.
// eslint-disable-next-line no-control-regex
const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

/** @param {string | undefined} value */
const clean = (value) => (value ?? "").replace(CONTROL, "").trim();

/** @param {string} reason */
function reject(reason) {
    console.error(`rejected: ${reason}`);
    process.exit(1);
}

const post = clean(process.env.COMMENT_POST);
const author = clean(process.env.COMMENT_AUTHOR);
const body = clean(process.env.COMMENT_BODY).replace(/\r\n/g, "\n");
const lang = clean(process.env.COMMENT_LANG);

if (!POST_KEY.test(post)) reject("post key");
if (author.length === 0 || author.length > MAX_AUTHOR) reject("author length");
if (body.length === 0 || body.length > MAX_BODY) reject("body length");
if (lang && !/^[a-z]{2}$/.test(lang)) reject("lang");

const published = new Date().toISOString();

/*
 * Content-addressed: a double submit — a second click, a retried request —
 * lands on the same filename and overwrites rather than posting twice.
 */
const id = createHash("sha256")
    .update(`${post}\u0000${author}\u0000${body}`)
    .digest("hex")
    .slice(0, 12);

const record = {
    post,
    author,
    body,
    published,
    ...(lang ? { lang } : {}),
    // Nothing reaches a reader until this is flipped by hand.
    approved: false,
};

mkdirSync(post, { recursive: true });
writeFileSync(
    `${post}/${published.slice(0, 10)}-${id}.json`,
    `${JSON.stringify(record, null, 2)}\n`,
);

console.log(`stored ${post}/${published.slice(0, 10)}-${id}.json`);
