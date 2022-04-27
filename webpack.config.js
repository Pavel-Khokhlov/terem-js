const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let mode = "development";
if (process.env.NODE_ENV === "production") {
  mode = "production";
}

console.log(mode + ' mode');

module.exports = {
  mode: mode,
  entry: {
    index: './src/index.js',
    form: './src/form.js',
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "",
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[hash][ext]',
    clean: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      // подключение нужных css & js к странице
      chunks: ['index'],
      // загрузка script в конец body
      inject: 'body',
      // отключаем script defer
      scriptLoading: 'blocking',
    }),
    new HtmlWebpackPlugin({
      filename: 'form.html',
      template: './src/form.html',
      // подключение нужных css & js к странице
      chunks: ['form'],
      // загрузка script в конец body
      inject: 'body',
      // отключаем script defer
      scriptLoading: 'blocking',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(sass|scss|css)$/,
        use: [
          mode === "development" ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'postcss-preset-env',
                  {
                    // options
                  },
                ],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread'],
          },
        },
      },
    ],
  },
};
