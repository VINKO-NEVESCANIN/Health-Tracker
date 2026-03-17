module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
            alias: {
              '@': './',
              '@assets': './assets',
              '@icons': './app/Icon',
              '@doctor': './app/(protected)/doctor',
              '@paciente': './app/(protected)/paciente'
            }
        }
      ]
    ]
  };
};