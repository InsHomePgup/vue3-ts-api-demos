/// <reference types="vite/client" />

// 声明环境变量类型：只有 VITE_ 开头的变量会暴露给客户端，新增 .env 变量时同步在这里补充
interface ImportMetaEnv {
  /** 部署的基础路径，对应 .env 里的 VITE_BASE_URL */
  readonly VITE_BASE_URL: string
  // 更多的环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
