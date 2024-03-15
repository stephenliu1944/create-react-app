import { name, parcel, version } from './package.json';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import dotenv from 'dotenv';
import DotenvPlugin from 'dotenv-webpack';
import ESLintPlugin from 'eslint-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import WebpackBarPlugin from 'webpackbar';

const BUILD_PATH = 'build';
const ASSETS_PATH = 'assets';
const CONTENT_HASH = '[contenthash:8]';
const publicPath = parcel.publicPath.endsWith('/') ? parcel.publicPath : parcel.publicPath + '/';

export default function(mode) {
  const isEnvDev = mode === 'development';
  const DOTENV_FILE = isEnvDev ? '.env' : '.env.production';
  const ESLINT_FILE = isEnvDev ? '.eslintrc.js' : '.eslintrc.prod.js';
  dotenv.config({ path: DOTENV_FILE });

  return {
    target: ['web', 'es5'],
    cache: {
      type: 'filesystem',              // 默认缓存在: /node_modules/.cache/webpack
    },
    entry: {
      main: ['./src/index.ts'],
    },
    output: {
      publicPath: publicPath,
      path: path.resolve(__dirname, BUILD_PATH),
      filename: `${ASSETS_PATH}/js/[name].${CONTENT_HASH}.js`,
      chunkFilename: `${ASSETS_PATH}/js/[name].${CONTENT_HASH}.chunk.js`,
      // 避免多个应用之间 jsonpFunction 名冲突
      chunkLoadingGlobal: name,
    },
    resolve: {
      // 确保 npm link 时, 优先使用本项目依赖包
      modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.less', '.css'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        Components: path.resolve(__dirname, 'src/components/'),
        Config: path.resolve(__dirname, 'src/config/'),
        Constants: path.resolve(__dirname, 'src/constants/'),
        Enums: path.resolve(__dirname, 'src/enums/'),
        Contexts: path.resolve(__dirname, 'src/contexts/'),
        Fonts: path.resolve(__dirname, 'src/fonts/'),
        Hooks: path.resolve(__dirname, 'src/hooks/'),
        Images: path.resolve(__dirname, 'src/images/'),
        Layouts: path.resolve(__dirname, 'src/layouts/'),
        Pages: path.resolve(__dirname, 'src/pages/'),
        Services: path.resolve(__dirname, 'src/services/'),
        Styles: path.resolve(__dirname, 'src/styles/'),
        Types: path.resolve(__dirname, 'src/types/'),
        Utils: path.resolve(__dirname, 'src/utils/'),
        Public: path.resolve(__dirname, 'public/'),
      },
    },
    optimization: {
      chunkIds: 'named',
      emitOnErrors: false,
      splitChunks: {
        minSize: 10,
        minChunks: 1,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
    module: {
      rules: [{
        /**
         * webpack按顺序查找匹配的loader
         */
        oneOf: [{
          /**
           * 主项目js
           */
          test: /\.(js|ts)x?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        }, {
          /**
           * 主项目样式
           */
          test: /\.(css|less)$/,
          include: path.resolve(__dirname, 'src'),
          use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          }, {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: {
                auto: true,
                localIdentName: '[local]__[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          }],
        }, {
          /**
           * 第三方样式
           */
          test: /\.(css|less)$/,
          exclude: path.resolve(__dirname, 'src'),
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  javascriptEnabled: true,
                },
              },
            },
          ],
        }, {
          /**
           * 全局图片
           */
          test: /\.(bmp|png|jpg|jpeg|gif|svg|pdf)$/,
          exclude: path.resolve(__dirname, 'src/fonts'),
          type: 'asset/resource',
          generator: {
            filename: `${ASSETS_PATH}/images/[name].${CONTENT_HASH}[ext]`,
          },
        }, {
          /**
           * 全局字体
           */
          test: /\.(woff|woff2|eot|ttf|svg)$/,
          type: 'asset/resource',
          generator: {
            filename: `${ASSETS_PATH}/fonts/[name].${CONTENT_HASH}[ext]`,
          },
          // 新 loader 需要加在 file-loader 之前
        }],
      }],
    },
    plugins: [
      // 编译进度条
      new WebpackBarPlugin(),
      // 清除编译目录
      new CleanWebpackPlugin(),
      // TypeScript 类型检测
      new ForkTsCheckerWebpackPlugin({
        // async 为 false，同步的将错误信息反馈给 webpack，如果报错了，webpack 就会编译失败
        // async 默认为 true，异步的将错误信息反馈给 webpack，如果报错了，不影响 webpack 的编译
        async: isEnvDev,
      }),
      new CircularDependencyPlugin({
        // exclude detection of files based on a RegExp
        exclude: /node_modules/,
        // include specific files based on a RegExp
        include: /src/,
        // add errors to webpack instead of warnings
        failOnError: true,
        // allow import cycles that include an asyncronous import,
        // e.g. via import(/* webpackMode: "weak" */ './file.js')
        allowAsyncCycles: false,
        // set the current working directory for displaying module paths
        cwd: process.cwd(),
      }),
      // JS 规范检测
      new ESLintPlugin({
        fix: true,
        cache: true,
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        overrideConfigFile: ESLINT_FILE,
      }),
      // CSS规范校验
      new StyleLintPlugin({
        context: 'src',
        files: '**/*.(c|sc|sa|le)ss',
        fix: true,
        cache: true,
        failOnError: false,
      }),
      // 样式提取插件
      new MiniCssExtractPlugin({
        filename: `${ASSETS_PATH}/css/[name].${CONTENT_HASH}.css`,
        chunkFilename: `${ASSETS_PATH}/css/[name].${CONTENT_HASH}.chunk.css`,   // chunk css file
        ignoreOrder: true,
      }),
      // 用于文件拷贝
      new CopyWebpackPlugin({
        patterns: [{
          from: './public',
          toType: 'dir',
        }],
      }),
      // index.html 模板插件
      new HtmlWebpackPlugin({
        version,
        filename: 'index.html',
        template: './src/template.ejs',
        faviconPath: publicPath + 'favicon.ico',
        vconsolePath: publicPath + 'libs/vconsole.min.js',
        erudaPath: publicPath + 'libs/eruda.min.js',
      }),
      // 配置全局变量
      new DotenvPlugin({
        path: DOTENV_FILE,
        expand: true,
      }),
      // 文件大小写检测
      new CaseSensitivePathsPlugin(),
    ],
  };
}