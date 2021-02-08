module.exports = {
  presets: [
    ["@babel/preset-env"],
    ["@babel/preset-react"],
    ["@babel/preset-typescript"],
  ],
  plugins: [
    "@babel/plugin-transform-runtime",
    // TODO
    // "react-refresh/babel"
    'react-hot-loader/babel',
  ]
}
