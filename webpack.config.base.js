import path from 'path';
import DotenvPlugin from 'dotenv-webpack';
import WebpackBarPlugin from 'webpackbar';
import ESLintPlugin from 'eslint-webpack-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import MomentLocalesPlugin from 'moment-locales-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { name, parcel } from './package.json';

const BUILD_PATH = 'build';
const ASSETS_PATH = 'assets';
const CONTENT_HASH = '[contenthash:8]';
const publicPath = parcel.publicPath.endsWith('/') ? parcel.publicPath : parcel.publicPath + '/';

export default function(env) {
    
  return {
    target: ['web', 'es5'],
    cache: {
      type: 'filesystem'              // 默认缓存在: /node_modules/.cache/webpack
    },
    entry: {
      main: ['./src/index.ts']
    },
    output: {
      publicPath: publicPath,
      path: path.resolve(__dirname, BUILD_PATH),
      filename: `${ASSETS_PATH}/js/[name].${CONTENT_HASH}.js`,
      chunkFilename: `${ASSETS_PATH}/js/[name].${CONTENT_HASH}.chunk.js`,
      // 避免多个应用之间 jsonpFunction 名冲突
      chunkLoadingGlobal: name
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
        Contexts: path.resolve(__dirname, 'src/contexts/'),
        Fonts: path.resolve(__dirname, 'src/fonts/'),
        Hooks: path.resolve(__dirname, 'src/hooks/'),
        Images: path.resolve(__dirname, 'src/images/'),
        Layouts: path.resolve(__dirname, 'src/layouts/'),
        Pages: path.resolve(__dirname, 'src/pages/'),
        Public: path.resolve(__dirname, 'public/'),
        Services: path.resolve(__dirname, 'src/services/'),
        Styles: path.resolve(__dirname, 'src/styles/'),
        Utils: path.resolve(__dirname, 'src/utils/')
      }
    },
    optimization: {
      splitChunks: {
        minSize: 10,
        minChunks: 1,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      },
      emitOnErrors: false
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
              cacheDirectory: true
            }
          }
        }, {
          /**
                     * 主项目样式
                     */
          test: /\.(css|less)$/,
          include: path.resolve(__dirname, 'src'),
          use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false
            }
          }, {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: {
                localIdentName: '[local]__[hash:base64:5]'
              }
            }
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }]
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
                  javascriptEnabled: true
                }
              }
            }
          ]
        }, {
          /**
                     * 全局图片
                     */
          test: /\.(bmp|png|jpg|jpeg|gif|svg)$/,
          exclude: path.resolve(__dirname, 'src/fonts'),
          type: 'asset/resource',
          generator: {
            filename: `${ASSETS_PATH}/images/[name].${CONTENT_HASH}[ext]`
          }
        }, {
          /**
                     * 全局字体
                     */
          test: /\.(woff|woff2|eot|ttf|svg)$/,
          type: 'asset/resource',
          generator: {
            filename: `${ASSETS_PATH}/fonts/[name].${CONTENT_HASH}[ext]`
          }
          // 新 loader 需要加在 file-loader 之前
        }]
      }]
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
        async: false
      }),
      // JS 规范检测
      new ESLintPlugin({
        fix: true,
        cache: true,
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        overrideConfigFile: `.eslintrc${env === 'development' ? '' : '.prod'}.js`
      }),
      // CSS规范校验
      new StyleLintPlugin({
        context: 'src',
        files: '**/*.(c|sc|sa|le)ss',
        fix: true,
        cache: true,
        failOnError: false
      }),
      // 样式提取插件
      new MiniCssExtractPlugin({
        filename: `${ASSETS_PATH}/css/[name].${CONTENT_HASH}.css`,
        chunkFilename: `${ASSETS_PATH}/css/[name].${CONTENT_HASH}.chunk.css`,   // chunk css file
        ignoreOrder: true
      }),
      // 用于文件拷贝
      new CopyWebpackPlugin({
        patterns: [{
          from: './public',
          toType: 'dir'
        }]
      }),
      // moment 库减重插件
      new MomentLocalesPlugin({
        localesToKeep: ['zh-cn']
      }),
      // index.html 模板插件
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/template.ejs',
        faviconPath: publicPath + 'favicon.ico'
      }),
      // 配置全局变量
      new DotenvPlugin({
        path: env === 'development' ? '.env.development' : '.env',
        expand: true
      }),
      // 文件大小写检测
      new CaseSensitivePathsPlugin()
    ]
  };
}