import { SettingsIcon } from '@chakra-ui/icons'
import {
  IconButton,
  Box,
  Wrap,
  WrapItem,
  Flex,
  Spacer,
  Link,
} from '@chakra-ui/react'
import { useRef } from 'preact/hooks'
import { SiGithub, SiNpm } from 'react-icons/si'

import packageJson from '../../../package.json'

import type { HeaderProps } from '../types'

import 'ace-builds/src-noconflict/mode-yaml'
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-monokai'

export function Header(props: HeaderProps) {
  const { onOpen } = props
  const btnRef = useRef()

  return (
    <Flex align="center">
      <Box pl={3} pr={3} fontSize={18}>
        {packageJson.name}@{packageJson.version} Playground
      </Box>
      <Spacer />
      <Wrap p={1}>
        <WrapItem>
          <Link
            href="https://github.com/macropygia/oas-stack/tree/main/packages/oas30-to-zod"
            isExternal={true}
          >
            <IconButton
              aria-label="GitHub"
              icon={<SiGithub />}
              variant="outline"
              colorScheme="blue"
            />
          </Link>
        </WrapItem>
        <WrapItem>
          <Link
            href="https://www.npmjs.com/package/oas30-to-zod"
            isExternal={true}
          >
            <IconButton
              aria-label="NPM"
              icon={<SiNpm />}
              variant="outline"
              colorScheme="blue"
            />
          </Link>
        </WrapItem>
        <WrapItem>
          <IconButton
            ref={btnRef}
            aria-label="Options"
            icon={<SettingsIcon />}
            colorScheme="blue"
            onClick={onOpen}
          />
        </WrapItem>
      </Wrap>
    </Flex>
  )
}
