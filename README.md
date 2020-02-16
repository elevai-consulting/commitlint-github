<div align="center">
  <img height="200"
    src="https://raw.githubusercontent.com/elevai-consulting/commitlint-github/master/logo.png">
  <h1>commitlint-github</h1>
  <p>commitlint-github validates your commit messages starts with the GitHub Issue Number(s).</p>
</div>

[![GitHub](https://img.shields.io/github/license/elevai-consulting/commitlint-github)](https://github.com/elevai-consulting/commitlint-github/blob/master/LICENSE)
[![Multipack](https://img.shields.io/badge/Generated%20from-Gherciu%2Fmultipack-green)](https://github.com/Gherciu/multipack)

## Credit.

This repository was created by using an existing commitlint plugin repository as the starting point: [commitlint-jira](https://github.com/Gherciu/commitlint-jira/).

## Getting started.

##### Install dependencies

```bash
npm install --save-dev @commitlint/cli commitlint-plugin-github-rules commitlint-config-github
```

- [commitlint-config-github](https://github.com/elevai-consulting/commitlint-github/tree/master/packages/commitlint-config-github) - is a **recomended** config who contain preconfigured rules for github commits messages style. See all rules in description below
- [commitlint-plugin-github-rules](https://github.com/elevai-consulting/commitlint-github/tree/master/packages/commitlint-plugin-github-rules) - is a plugin that implement all github commits messages style rules and validate commit messages

##### Configure commitlint to use github commits messages style config

```js
// commitlint.config.js
module.exports = {
  plugins: ['commitlint-plugin-github-rules'],
  extends: ['github'],
}
```

##### To lint commits before they are created you can use Husky's 'commit-msg' hook

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

## Rules

`github-task-id-empty` - this rule check if commit message task id is not empty.

```bash
// If your task do not have an id use a conventional task id e.g: IB-0000
// ❌ Bad commit messages
git commit -m"My commit message body"
git commit -m":My commit message body"
// ✅ Good commit messages
git commit -m"IB-2121, IB-21: My commit message body"
git commit -m"IB-0000: My commit message body"
```

`github-task-id-max-length` - this rule check if github task id length is loonger that the provided value.

```bash
// Preconfigured and recomended value in commitlint-config-github is 9 chars
// ❌ Bad commit messages
git commit -m"IB-2121212121212121: My commit message body"
// ✅ Good commit messages
git commit -m"IB-2121: My commit message body"
git commit -m"IB-21: My commit message body"
```

`github-task-id-min-length` - this rule check if github task id length is shorter that the provided value.

```bash
// Preconfigured and recomended value in commitlint-config-github is 3 chars
// ❌ Bad commit messages
git commit -m"I1: My commit message body"
// ✅ Good commit messages
git commit -m"IB-2121: My commit message body"
git commit -m"IB-21: My commit message body"
```

`github-task-id-case` - this rule check if taskId is in provided case.

```bash
// Preconfigured and recomended value in commitlint-config-github is "uppercase"
// ❌ Bad commit messages
git commit -m"ib-21: My commit message body"
// ✅ Good commit messages
git commit -m"IB-2121, IB-21: My commit message body"
git commit -m"IB-21: My commit message body"
```

`github-task-id-separator` - this rule check if taskId header and footer is separated with provided value.

```bash
// Preconfigured and recomended value in commitlint-config-github is "-"
// ❌ Bad commit messages
git commit -m"IB/21: My commit message body"
git commit -m"IB_21 :My commit message body"
// ✅ Good commit messages
git commit -m"IB-2121, IB-21: My commit message body"
git commit -m"IB-21: My commit message body"
```

`github-commit-status-case` - this rule check if commit status is in provided case.

```bash
// Preconfigured and recomended value in commitlint-config-github is "uppercase"
// ❌ Bad commit messages
git commit -m"[wip]IB-21: My commit message body"
// ✅ Good commit messages
git commit -m"[WIP]IB-21: My commit message body"
```

`github-commit-message-separator` - this rule check if commit message separator match provided separator.

```bash
// Preconfigured and recomended value in commitlint-config-github is ":"
// ❌ Bad commit messages
git commit -m"IB-21/ My commit message body"
git commit -m"IB-21 - My commit message body"
git commit -m"IB-21% My commit message body"
// ✅ Good commit messages
git commit -m"IB-21: My commit message body"
```

## Customise/Override `commitlint-github-config` rules

```diff
// commitlint.config.js
module.exports = {
  plugins: ['commitlint-plugin-github-rules'],
  extends: ['github'],
  rules: {
  // to Customise/Override a rule
+  'github-task-id-max-length': [2, 'always', 10]
  // to turn off a rule
+ 'github-task-id-max-length': 0
  },
}
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D
