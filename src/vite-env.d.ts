/// <reference types="vite/client" />

// 声明环境变量类型
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_API_BASE_URL: string;
  // 更多的环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}