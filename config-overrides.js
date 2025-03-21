const { override, adjustWebpackConfig } = require('customize-cra');

module.exports = override(
  adjustWebpackConfig(config => {
    // Find the source-map-loader rule
    const rules = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf;
    const sourceMapLoaderRule = rules.find(rule => rule.loader && rule.loader.includes('source-map-loader'));

    if (sourceMapLoaderRule) {
      // Exclude @mediapipe/tasks-vision from source map processing
      sourceMapLoaderRule.exclude = [
        /node_modules\/@mediapipe\/tasks-vision/,
        ...(sourceMapLoaderRule.exclude || []),
      ];
    }

    return config;
  })
);