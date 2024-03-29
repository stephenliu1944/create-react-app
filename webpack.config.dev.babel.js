import { devEnvironments } from './package.json';
import proxyConfig from '@easytool/proxy-config';
import WebpackBundleAnalyzer from 'webpack-bundle-analyzer';
import { merge } from 'webpack-merge';
import getBaseConfig from './webpack.config.base';

const { servers, proxies } = devEnvironments;
const MODE = 'development';
const baseConfig = getBaseConfig(MODE);
const output = baseConfig.output;

export default merge(baseConfig, {
  mode: MODE,
  devtool: 'cheap-module-source-map',
  devServer: {
    host: '0.0.0.0',
    allowedHosts: 'all',
    port: servers.local,
    http2: false,
    https: false,
    compress: true,             // gzip 压缩
    historyApiFallback: {
      index: output.publicPath,
      disableDotRule: true,
    },
    client: {
      overlay: false,
    },
    proxy: {
      ...proxyConfig(proxies),
    },
  },
  plugins: [
    // 依赖包大小分析
    // new WebpackBundleAnalyzer.BundleAnalyzerPlugin({
    //   analyzerPort: 9090,
    //   logLevel: 'error'
    // })
  ],
});