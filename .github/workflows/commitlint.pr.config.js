module.exports = {
  plugins: ['@elevai/commitlint-plugin-github'],
  extends: ['@elevai/commitlint-config-github'],
  rules: {
    // To disallow WIP commits
    'wip-allowed': [2, 'never'],
  },
};
