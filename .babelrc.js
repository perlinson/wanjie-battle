module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ]
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          components: './components',
          config: './config',
          data: './data',
          enums: './enums',
          lib: './lib',
          moves: './lib/moves',
          styles: './styles',
          utils: './utils'
        }
      }
    ]
  ]
};
