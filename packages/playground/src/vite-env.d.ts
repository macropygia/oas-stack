/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PROTOCOL: string
  readonly VITE_DOMAIN: string
  readonly VITE_PORT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
