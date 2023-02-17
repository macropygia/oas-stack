import { Grid, GridItem, useDisclosure } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'preact/hooks'
import AceEditor from 'react-ace'

import { Header } from './header'
import { Input } from './input'
import { Menu } from './menu'
import { Output } from './output'
import { defaultDoc, defaultOptions } from '../../const'

import type { Options } from '../../types'
import type { Ace } from 'ace-builds'

const protocol = import.meta.env.VITE_VERCEL_URL ? 'https' : 'http'
const domain = import.meta.env.VITE_VERCEL_URL
  ? import.meta.env.VITE_VERCEL_URL
  : 'localhost'
const port = import.meta.env.VITE_API_PORT
  ? parseInt(import.meta.env.VITE_API_PORT, 10)
  : 3000
const portFragment = port === 80 ? '' : `:${port}`

export function App() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const inputRef = useRef<Ace.Editor>()
  const outputRef = useRef<Ace.Editor>()
  const [doc, setDoc] = useState<string>(defaultDoc)
  const [options, setOptions] = useState<Options>(defaultOptions)
  const debounceTimer = useRef<number>()

  useEffect(() => {
    const loadedOptions = window.localStorage.getItem('oas30-to-zod-settings')
    if (loadedOptions) setOptions(JSON.parse(loadedOptions))
    convert()
  }, [])

  useEffect(() => {
    window.localStorage.setItem(
      'oas30-to-zod-settings',
      JSON.stringify(options)
    )
  }, [options])

  const convert = async () => {
    const prettierConfig = JSON.parse(options.inheritPrettier)
    await fetch(`${protocol}://${domain}${portFragment}/api/z`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        doc,
        options,
        prettier:
          typeof prettierConfig === 'object' ? prettierConfig : undefined,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        outputRef.current?.setValue(json)
        outputRef.current?.clearSelection()
      })
  }

  useEffect(() => {
    window.clearTimeout(debounceTimer.current)
    debounceTimer.current = window.setTimeout(async () => {
      await convert()
      window.clearTimeout(debounceTimer.current)
    }, 1000)
  }, [doc])

  return (
    <Grid
      minHeight="$100vh"
      minWidth="100%"
      gridTemplateRows={`auto 1fr`}
      gridTemplateColumns={`${options.splitRatio}% ${
        100 - options.splitRatio
      }%`}
    >
      <GridItem colSpan={2}>
        <Header onOpen={onOpen} />
      </GridItem>
      <GridItem>
        <Input
          AceEditor={AceEditor}
          options={options}
          inputRef={inputRef}
          setDoc={setDoc}
        />
      </GridItem>
      <GridItem>
        <Output AceEditor={AceEditor} options={options} outputRef={outputRef} />
      </GridItem>
      <Menu
        isOpen={isOpen}
        onClose={onClose}
        options={options}
        setOptions={setOptions}
        convert={convert}
      />
    </Grid>
  )
}
