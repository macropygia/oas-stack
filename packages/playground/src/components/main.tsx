/* eslint-disable n/no-unpublished-import */
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import ace from 'ace-builds/src-noconflict/ace'

import { App } from './app'

// Chakra UI
const theme = extendTheme({
  fonts: {
    body: `Roboto, 'Noto Sans JP', 'Noto Sans CJK JP', 'Hiragino Sans',
    'Hiragino Kaku Gothic ProN', 'BIZ UDPGothic', meiryo, sans-serif`,
    heading: `Roboto, 'Noto Sans JP', 'Noto Sans CJK JP', 'Hiragino Sans',
    'Hiragino Kaku Gothic ProN', 'BIZ UDPGothic', meiryo, sans-serif`,
    mono: `'Fira Code', monospace`,
  },
})

// Ace Editor
import 'ace-builds/src-noconflict/mode-yaml'
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-monokai'
ace.config.set(
  'basePath',
  'https://cdn.jsdelivr.net/npm/ace-builds@latest/src-noconflict/'
)

export function Main() {
  return (
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  )
}
