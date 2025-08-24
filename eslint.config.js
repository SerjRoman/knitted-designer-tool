import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";
import pluginImport from "eslint-plugin-import";

const FS_LAYERS = ["app", "widgets", "features", "entities", "shared"];

export default tseslint.config([
	globalIgnores(["dist"]),
	{
		files: ["**/*.{ts,tsx}"],
		extends: [
			js.configs.recommended,
			tseslint.configs.recommended,
			reactHooks.configs["recommended-latest"],
			reactRefresh.configs.vite,
			pluginImport.flatConfigs.recommended,
		],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		rules: {
			"import/order": [
				"warn",
				{
					alphabetize: {
						order: "asc",
						caseInsensitive: true,
					},
					pathGroups: FS_LAYERS.map((layer) => ({
						pattern: `**/?(*)${layer}{,/**}`,
						group: "internal",
						position: "after",
					})),
					pathGroupsExcludedImportTypes: ["builtin"],
					groups: [
						"builtin",
						"external",
						"internal",
						"parent",
						"sibling",
						"index",
					],
				},
			],
			"no-unused-vars": "off",
			"import/no-unresolved": "off",
			"no-console": ["warn", { allow: ["warn", "error"] }],
		},
	},
]);
