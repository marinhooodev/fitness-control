const Reanimated = require('./node_modules/react-native-reanimated/mock.js');

module.exports = {
  ...Reanimated,
  useReducedMotion: () => false,
};
