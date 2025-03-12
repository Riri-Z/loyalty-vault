// https://docs.expo.dev/guides/using-eslint/
module.exports = {
	extends: ["expo", "prettier"],
	plugins: ["prettier"],
	rules: {
		"prettier/prettier": ["error", { endOfLine: "auto", allowIndentationTabs: true }],
		"padding-line-between-statements": [
			"error",
			{ blankLine: "always", prev: "import", next: "*" },
			{ blankLine: "never", prev: "import", next: "import" },
		],
	},
	ignorePatterns: ["/dist/*"],
};
