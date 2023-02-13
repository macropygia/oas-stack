import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { render } from 'preact'

import { App } from './app'

const theme = extendTheme({
  fonts: {
    body: `Roboto, 'Noto Sans JP', 'Noto Sans CJK JP', 'Hiragino Sans',
    'Hiragino Kaku Gothic ProN', 'BIZ UDPGothic', meiryo, sans-serif`,
    heading: `Roboto, 'Noto Sans JP', 'Noto Sans CJK JP', 'Hiragino Sans',
    'Hiragino Kaku Gothic ProN', 'BIZ UDPGothic', meiryo, sans-serif`,
    mono: `'Fira Code', monospace`,
  },
})

render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>,
  document.getElementById('app') as HTMLElement
)
