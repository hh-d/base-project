import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  // 共享选项
  root: './', // 项目根目录
  base: './', // 开发或生产环境服务的公共基础路径。
  define: { // 定义全局常量替换方式。
    __APP_VERSION__: JSON.stringify('v1.0.0'),
  },
  publicDir: 'public', // 作为静态资源服务的文件夹。
  cacheDir: 'node_modules/.vite', // 存储缓存文件的目录。
  plugins: [ // 需要用到的插件数组。[文档地址](https://cn.vitejs.dev/guide/api-plugin)
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: { // 设置路径别名
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '$utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '$api': fileURLToPath(new URL('./src/api', import.meta.url)),
    }
  },
   // 服务器选项
   server: {
    host: true, // 指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。
    port: 6017, // 指定开发服务器端口
    strictPort: false, // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口。
    open: true, // 开发服务器启动时，自动在浏览器中打开应用程序。
    proxy: {  // 为开发服务器配置自定义代理规则。
      '/api': {
        target: 'http://jsonplaceholder.typicode.com', // 目标地址
        changeOrigin: true, // 是否支持跨域
        rewrite: (path) => path.replace(/^\/api/, ''), // 重写地址
      },
    },
    warmup: { // 提前转换和缓存文件以进行预热。
      // clientFiles: ['./src/components/*.vue', './src/utils/big-utils.js'], // 是仅在客户端使用的文件
      // ssrFiles: ['./src/server/modules/*.js'], // 是仅在服务器端渲染中使用的文件
    }
  },
  // 构建选项
  build: {
    target: 'modules', // 设置最终构建的浏览器兼容目标。默认值是一个 Vite 特有的值：'modules'，这是指 支持原生 ES 模块、原生 ESM 动态导入 和 import.meta 的浏览器。Vite 将替换 modules 为 ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14']
    outDir: 'dist', // 指定输出路径（相对于 项目根目录).
    assetsDir: 'assets', // 指定生成静态资源的存放路径
  }
})
