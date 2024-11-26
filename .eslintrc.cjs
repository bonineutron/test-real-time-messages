module.exports = {
   root: true,
   env: { browser: true, es2020: true },
   extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended',
      'next/core-web-vitals', // Mantiene las reglas de Next.js
      'next/typescript' // Mantiene las reglas para TypeScript en Next.js
   ],
   ignorePatterns: ['dist', '.eslintrc.cjs'],
   parser: '@typescript-eslint/parser',
   plugins: ['react-refresh'],
   rules: {
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react-hooks/rules-of-hooks': 'off'
   }
};
