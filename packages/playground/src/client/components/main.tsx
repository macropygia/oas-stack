import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { hydrateRoot } from 'react-dom/client'

import { App } from './app.js'

const theme = extendTheme({
  fonts: {
    body: `Roboto, 'Noto Sans JP', 'Noto Sans CJK JP', 'Hiragino Sans',
    'Hiragino Kaku Gothic ProN', 'BIZ UDPGothic', meiryo, sans-serif`,
    heading: `Roboto, 'Noto Sans JP', 'Noto Sans CJK JP', 'Hiragino Sans',
    'Hiragino Kaku Gothic ProN', 'BIZ UDPGothic', meiryo, sans-serif`,
    mono: `'Fira Code', monospace`,
  },
})

hydrateRoot(
  document.getElementById('app'),
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
)
