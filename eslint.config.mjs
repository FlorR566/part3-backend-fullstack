import js from "@eslint/js";
import globals from "globals";
import stylistic from "@stylistic/eslint-plugin"; // el unificado

export default [
	js.configs.recommended,
	{
		files: ["**/*.js"],
		languageOptions: {
			sourceType: "commonjs",
			globals: globals.node,
			ecmaVersion: "latest",
		},
		plugins: { stylistic },
		rules: {
			// Reglas del plugin Stylistic
			"stylistic/indent": ["error", 2],
			"stylistic/linebreak-style": ["error", "unix"],
			"stylistic/quotes": ["error", "single"],
			"stylistic/semi": ["error", "never"],
			"stylistic/no-trailing-spaces": "error",
			"stylistic/object-curly-spacing": ["error", "always"],
			"stylistic/arrow-spacing": ["error", { before: true, after: true }],
			// Reglas base de ESlint
			eqeqeq: "error",
			"no-console": "off",
		},
	},
	{ ignores: ["dist/**"] },
];
