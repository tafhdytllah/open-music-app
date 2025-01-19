export default [
  {
    files: ['**/*.js'], // Apply this configuration to all JavaScript files
    languageOptions: {
      ecmaVersion: 'latest',
    },
    env: {
      node: true, // Enable Node.js global variables like 'process'
    },
  },
];
