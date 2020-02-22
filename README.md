<div align="center">
  <h1>commitlint-github</h1>
  <p>commitlint-github validates your commit messages starts with the GitHub Issue Number(s).</p>
</div>

[![GitHub](https://img.shields.io/github/license/elevai-consulting/commitlint-github)](https://github.com/elevai-consulting/commitlint-github/blob/master/LICENSE)
[![Multipack](https://img.shields.io/badge/Generated%20from-Gherciu%2Fmultipack-green)](https://github.com/Gherciu/multipack)

## Introduction

This repository was created to add custom commitlint rules to enforce that commit comments all preface the comment with the relevant GitHub Issue number similar to the convention used with projects managed in other issue tracking systems such as Jira.

For Example:

```
(#42) This is my git commit as part of the work tracked by that GitHub Issue.
```

Note: The Issue Number prefix has to:
- Use the GitHub convention of referencing the Issue Number using a '\#'; e.g. '\#42'
  - This is so that GitHub automatically creates a clickable link to the associated Issue when viewed in the browser
- But be encapsulated with parentheses at the beginning of the first line of the commit
  - This is so that the line does not start with a '\#' character since that indicates a Git Comment and so would cause problems.

### Typed Commits

_Optionally,_ you can also include a conventional commit 'type' such as 'chore', 'bug', 'ci' etc., however this is optional since including the GitHub issue number at the beginning provides additional context on the commit by following the link to the GitHub Issue.

```
(#42) chore: This is my git commit...
```

### Tracking Multiple Issues

In the rare case that a commit spans multiple GitHub Issues, you can include them all as a comma-separated list:

```
(#42, #65) This is my git commit...
```

### WIP Commits
Finally, when working using Feature Branches it is very common to create Work-In-Progress (WIP) commits and these can be added as follows, though can also be prohibited via custom rule configuration. This is particularly useful for validating PRs to ensure no WIP commits are merged:

```
WIP
```
or
```
WIP: This is my git commit...
```
or
```
WIP - This is my git commit...
```
or
```
WIP 2: This is my git commit...
```
or
```
WIP 2 - This is my git commit...
```

### Credit
As mentioned earlier, this repository was inspired by a typical Jira convention of referencing the Jira Issue at the beginning of the commit. In fact this repository was created using an existing commitlint plugin repository as its starting point.

This repository - [commitlint-jira](https://github.com/Gherciu/commitlint-jira/) - was created by [@Gherciu](https://github.com/Gherciu) for checking for code commit messages following Jira conventions. After we forked it we have customized it to make it more suitable for GitHub Issues.

## Getting started

### Install dependencies

```bash
npm install --save-dev @commitlint/cli @elevai/commitlint-config-github @elevai/commitlint-plugin-github
```

- [@elevai/commitlint-config-github](https://github.com/elevai-consulting/commitlint-github/tree/master/packages/commitlint-config-github) - is a **recomended** config which contains preconfigured rules for github commits messages style.
  - See below for a description for all available rules
- [@elevai/commitlint-plugin-github](https://github.com/elevai-consulting/commitlint-github/tree/master/packages/commitlint-plugin-github) - is a plugin that implement all github commits messages style rules and validates commit messages

### Configure Project

Configure commitlint to use github commits messages style config:

```js
// commitlint.config.js
module.exports = {
  plugins: ['@elevai/commitlint-plugin-github'],
  extends: ['github'],
}
```

### Linting Commit Comments Locally

To lint commits locally before they are pushed you can use Husky's 'commit-msg' hook:

```json
// package.json
{
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```

**Note:** You can always disable linting locally by committing using the `--no-verify` flag.

# Rules

## GitHub Issue Number Rules

### `github-issue-number-missing`

This rule validates that non-WIP commits contain a valid GitHub Issue number prefix

- The associated GitHub Issue number(s) must begin the commit message, encapsulated in parentheses

```bash
# ❌ Bad commit messages
git commit -m "My commit message body"

# ✅ Good commit messages
git commit -m "(#42) My commit message body"
git commit -m "(#10, #25) My commit message body"

git commit -m "WIP: My commit message body"      # WIPs do not need to
git commit -m "(#5) WIP: My commit message body" # But can if they'd like
```

### `github-issue-number-format`

This rule validates that the GitHub Issue number prefix is in the correct format

- Each Issue Number must be prefixed with a `#` character and be numeric
- Multiple related Issue Numbers can be comma-separated inside the parentheses

```bash
# ❌ Bad commit messages
git commit -m "(10) My commit message body"
git commit -m "(10,15) My commit message body"
git commit -m "(foo) My commit message body"

# ✅ Good commit messages
git commit -m "(#10) My commit message body"
git commit -m "(#10,#15) My commit message body"
git commit -m "(#10, #15) My commit message body"
```

### `github-issue-number-duplicate`

This rule validates that any GitHub Issue numbers referenced are not duplicated

```bash
# ❌ Bad commit messages
git commit -m "(#1, #2, #1) My commit message body"

# ✅ Good commit messages
git commit -m "(#1, #2, #3) My commit message body"
```

## WIP Rules

### `wip-allowed`

This rule policies whether WIP commits are allowed

- If the 'when' in the configuration is 'always', then they are allowed
- If the 'when' in the configuration is 'never', then they are not allowed
- The default configuration permits them, but PR builds will likely want to override to prevent WIPs being merged.

#### When 'always' is configured, or default configuration is used

```bash
# ❌ Bad commit messages
git commit -m "WIP    " # Contains trailing unnecessary spaces
git commit -m "WIPA"    # Contains a non-numeric suffix
git commit -m "WIP foo" # No separator after WIP; should be a colon, hyphen, or full-stop

# ✅ Good commit messages
git commit -m "WIP"
git commit -m "WIP: My commit message body"
git commit -m "WIP. My commit message body"
git commit -m "WIP 2: My commit message body"
git commit -m "WIP 2 - My commit message body"
git commit -m "(#10) My commit message body"   # Non-WIPs are also permitted of course
```

#### When 'never' is configured

```bash
# ❌ Bad commit messages - Any valid WIP commit comment is disallowed
git commit -m "WIP"
git commit -m "WIP: My commit message body"
git commit -m "WIP. My commit message body"
git commit -m "WIP 2: My commit message body"
git commit -m "WIP 2 - My commit message body"

# ✅ Good commit messages - Any valid non-WIP commit comment
git commit -m "(#10) My commit message body"
```

## Subject Rules

### `subject-empty`

This rule delegates to the [standard @commitlint rule](https://commitlint.js.org/#/reference-rules?id=subject-empty) and validates whether the subject is empty

- Default configuration is prohibit an empty subject

```bash
# ❌ Bad commit messages
git commit -m "(#42)  "
git commit -m "(#42) chore:"

# ✅ Good commit messages
git commit -m "(#42) My commit comment."
git commit -m "(#42) chore: My commit comment."
```

### `subject-case`

This rule delegates to the [standard @commitlint rule](https://commitlint.js.org/#/reference-rules?id=subject-case) and validates the case of the subject

- Default configuration is to use `sentence-case`.

```bash
# ❌ Bad commit messages
git commit -m "(#42)  does not start with an upper-case character."

# ✅ Good commit messages
git commit -m "(#42) This does start with an upper-case character (doesn't end in a full-stop)"
git commit -m "WIP: these are not validated"
```

### `subject-full-stop`

This rule delegates to the [standard @commitlint rule](https://commitlint.js.org/#/reference-rules?id=subject-full-stop) and validates whether the subject ends with a full stop.

- Default configuration is require a full-stop at the end of the (first) commit message line.

```bash
# ❌ Bad commit messages
git commit -m "(#42) this does not end with a full-stop"

# ✅ Good commit messages
git commit -m "(#42) this does."
git commit -m "WIP: these are not validated"
```

### `subject-min-length`

This rule delegates to the [standard @commitlint rule](https://commitlint.js.org/#/reference-rules?id=subject-min-length) and validates whether the subject is at least a minimum length

- This rule is not enabled in the default configuration.

```bash
# ❌ Bad commit messages (when configured with a 10-charater min length)
git commit -m "(#42) Too short"

# ✅ Good commit messages
git commit -m "(#42) That's better"
git commit -m "WIP: ok" # WIPs aren't validated
```

### `subject-max-length`

This rule delegates to the [standard @commitlint rule](https://commitlint.js.org/#/reference-rules?id=subject-max-length) and validates whether the subject less than or equal to a maximum length

- This rule is not enabled in the default configuration.

```bash
# ❌ Bad commit messages (when configured with a 10-charater max length)
git commit -m "(#42) Far too long"

# ✅ Good commit messages
git commit -m "(#42) I'm good!"
git commit -m "WIP: This is ok too" # WIPs aren't validated
```

### `subject-separator`

This rule validates that there is a space separator before the start of the subject.

- Default configuration is require a space before the start of the subject.

```bash
# ❌ Bad commit messages
git commit -m "(#42)there is no space before the subject"
git commit -m "(#42) chore:there is no space before the subject"

# ✅ Good commit messages
git commit -m "(#42) that is better"
git commit -m "(#42) chore: much better"
git commit -m "WIP:I get a pass" # WIPs aren't validated
```

## Type Rules

A note about the Type rules, and Types in general:

- **Important:** WIP Commits are treated as **not** having a type; it does _not_ have a 'WIP' type.
- 'WIP' isn't treated as a type since its upper-case is inconsistent with the conventional lower-case types normally used.
- This is hypothetical as **no** rules currently apply to WIP commits, in large part due to the enforced binary nature of the 'when' clause by [@commitlint/lint](https://github.com/conventional-changelog/commitlint/blob/master/%40commitlint/lint/src/lint.ts)
  - [An Issue](https://github.com/conventional-changelog/commitlint/issues/1003) was created there to investigate if this restriction could be loosened, and an explanation of why is written up there.

### `type-empty`

This rule delegates to the [standard @commitlint rule](https://commitlint.js.org/#/reference-rules?id=type-empty) and validates whether the type is empty

- This rule is not enabled in the default configuration, so types are not required by default.

```bash
# ❌ Bad commit messages (if configured to be required)
git commit -m "(#42) My commit message."

# ✅ Good commit messages
git commit -m "(#42) chore: My commit comment."
git commit -m "WIP: ok" # WIPs aren't validated
```

### `type-case`

This rule delegates to the [standard @commitlint rule](https://commitlint.js.org/#/reference-rules?id=type-case) and validates the case of the type

- Default configuration is require a lowercase type if specified

```bash
# ❌ Bad commit messages (if configured to be required)
git commit -m "(#42) Chore: My commit message."

# ✅ Good commit messages
git commit -m "(#42) chore: My commit comment."
git commit -m "WIP: ok" # WIPs aren't validated
```

### `type-enum`

This rule delegates to the [standard @commitlint rule](https://commitlint.js.org/#/reference-rules?id=type-enum) and validates whether the type is part of a given enum of allowed values.

- Default configuration is the current _conventional_ list, with the added inclusion of 'feature' for those who also see 'feat' as an unnecessary abbrev:
  - build
  - chore
  - ci
  - docs
  - feat
  - feature _(sneakily added in)_
  - fix
  - improvement
  - perf
  - refactor
  - revert
  - style
  - test

```bash
# ❌ Bad commit messages (if configured to be required)
git commit -m "(#42) foo: My commit message."

# ✅ Good commit messages
git commit -m "(#42) feature: Oh yes!"
git commit -m "WIP: ok" # WIPs aren't validated
```

### `type-min-length`

This rule delegates to the [standard @commitlint rule](https://commitlint.js.org/#/reference-rules?id=type-min-length) and validates whether the type is at least a minimum length

- This rule is not enabled in the default configuration.

```bash
# ❌ Bad commit messages (when configured with a 15-charater min length)
git commit -m "(#42) too-short: That type is just too short."

# ✅ Good commit messages
git commit -m "(#42) pretty-superfluous: That's better"
git commit -m "WIP: ok" # WIPs aren't validated
```

### `type-max-length`

This rule delegates to the [standard @commitlint rule](https://commitlint.js.org/#/reference-rules?id=type-max-length) and validates whether the type less than or equal to a maximum length

- This rule is not enabled in the default configuration.

```bash
# ❌ Bad commit messages (when configured with a 5-charater max length)
git commit -m "(#42) too-long: That type is just too short."

# ✅ Good commit messages
git commit -m "(#42) sure: That's better"
git commit -m "WIP: ok" # WIPs aren't validated
```

# Getting Involved

## Customise/Override `commitlint-github-config` rules

```diff
// commitlint.config.js
module.exports = {
  plugins: ['commitlint-plugin-github'],
  extends: ['github'],
  rules: {
    // To override default configuration, e.g. to disallow WIP commits:
+   'wip-allowed': [2, 'never']
    // To turn off a rule completely:
+   'github-task-id-max-length': 0
  },
}
```

## Contributing

- Fork it!
  - `git clone git@github.com:elevai-consulting/commitlint-github.git`
- Create your feature branch:
  - `git checkout -b my-new-feature`
- Commit your changes:
  - `git commit -am 'Add some feature'`
- Push to the branch:
  - `git push origin my-new-feature`
- Submit a pull request 👍
