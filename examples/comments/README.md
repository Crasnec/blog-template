# Optional comment store

These files are a starter for a **separate public repository**. Do not move the
comment workflow into the blog's active `.github/workflows/` directory. Readers
will receive a token for the comment repository's Actions API; it must not grant
access to the blog's source repository.

1. Create a public repository of your own, with `main` as its default branch.
2. Copy this directory's `.github/` folder into that repository, preserving
   `.github/workflows/comment.yml` and `.github/store-comment.mjs`.
3. Commit the files to `main` and enable Actions. Allow the workflow's built-in
   `GITHUB_TOKEN` to write repository contents so it can commit comment records.
4. Create a fine-grained token restricted to this comment repository with
   **Actions: read and write**. No Contents write permission is needed on this
   reader-facing token. The workflow itself uses `GITHUB_TOKEN` to commit.
5. Configure `PUBLIC_COMMENTS_REPO` and `PUBLIC_COMMENTS_TOKEN` in the blog as
   described in its README.

The workflow accepts a post key, author, Markdown body and optional two-letter
language code. Inputs enter the Node script through environment variables;
they are never interpolated into shell commands. The script validates lengths,
rejects invalid paths and writes `approved: false`. Limits match the blog's
defaults: 60 author characters and 2,000 body characters. Keep both repositories'
limits aligned if you change them.

The reader-facing token is public in the generated blog and can access the
comment repository's Actions API. Keep this repository limited to comment data
and this workflow; do not add privileged automation or private material.

To publish a comment, review its JSON record, change `approved` to `true`, commit,
then rebuild the blog. To remove one, delete its JSON record and rebuild.
