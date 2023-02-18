/* eslint-disable n/no-unpublished-import */
import {
  Button,
  Code,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  // SliderMark,
  Switch,
  Textarea,
} from '@chakra-ui/react'
import { useRef } from 'preact/hooks'

import { defaultOptions } from '../const'

import type { MenuProps } from '../types'

export function Menu(props: MenuProps) {
  const { isOpen, onClose, options, setOptions, convert } = props
  const btnRef = useRef()

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Options</DrawerHeader>

        <DrawerBody>
          <FormControl as={Grid} templateColumns="repeat(2, auto)">
            <FormLabel htmlFor="dereference">Dereference:</FormLabel>
            <Switch
              id="dereference"
              isChecked={options.dereference}
              onChange={(e) => {
                if (e.target !== null && e.target instanceof HTMLInputElement)
                  setOptions({
                    ...options,
                    ...{ dereference: e.target.checked },
                  })
              }}
            />

            <GridItem colSpan={2} marginBottom="3">
              <FormLabel htmlFor="exportName">Export variable:</FormLabel>
              <Input
                id="exportName"
                value={options.exportName ? options.exportName : ''}
                placeholder="schemas"
                onChange={(e: InputEvent) => {
                  if (e.target !== null && e.target instanceof HTMLInputElement)
                    setOptions({
                      ...options,
                      ...{ exportName: e.target.value || undefined },
                    })
                }}
              />
            </GridItem>

            <FormLabel htmlFor="individually">Export individually:</FormLabel>
            <Switch
              id="individually"
              isChecked={options.individually}
              onChange={(e) => {
                if (e.target !== null && e.target instanceof HTMLInputElement)
                  setOptions({
                    ...options,
                    ...{ individually: e.target.checked },
                  })
              }}
            />

            <FormLabel htmlFor="eslintDisable">Disable ESLint:</FormLabel>
            <Switch
              id="eslintDisable"
              isChecked={options.eslintDisable}
              onChange={(e) => {
                if (e.target !== null && e.target instanceof HTMLInputElement)
                  setOptions({
                    ...options,
                    ...{ eslintDisable: e.target.checked },
                  })
              }}
            />

            <GridItem colSpan={2} marginBottom="3">
              <FormLabel htmlFor="disableRules">Disable rules:</FormLabel>
              <Input
                id="disableRules"
                value={options.disableRules ? options.disableRules : ''}
                placeholder="no-control-regex, rule, rule, ..."
                onChange={(e: InputEvent) => {
                  if (e.target !== null && e.target instanceof HTMLInputElement)
                    setOptions({
                      ...options,
                      ...{
                        disableRules: e.target.value || undefined,
                      },
                    })
                }}
              />
            </GridItem>

            <FormLabel htmlFor="withoutImport">
              Without <Code>import</Code>:
            </FormLabel>
            <Switch
              id="withoutImport"
              isChecked={options.withoutImport}
              onChange={(e) => {
                if (e.target !== null && e.target instanceof HTMLInputElement)
                  setOptions({
                    ...options,
                    ...{ withoutImport: e.target.checked },
                  })
              }}
            />

            <FormLabel htmlFor="withoutExport">
              Without <Code>export</Code>:
            </FormLabel>
            <Switch
              id="withoutExport"
              isChecked={options.withoutExport}
              onChange={(e) => {
                if (e.target !== null && e.target instanceof HTMLInputElement)
                  setOptions({
                    ...options,
                    ...{ withoutExport: e.target.checked },
                  })
              }}
            />

            <FormLabel htmlFor="disableFormat">Disable format:</FormLabel>
            <Switch
              id="disableFormat"
              isChecked={options.disableFormat}
              onChange={(e) => {
                if (e.target !== null && e.target instanceof HTMLInputElement)
                  setOptions({
                    ...options,
                    ...{ disableFormat: e.target.checked },
                  })
              }}
            />

            <FormLabel htmlFor="withoutDefaults">
              Disable <Code>.default()</Code>:
            </FormLabel>
            <Switch
              id="withoutDefaults"
              isChecked={options.withoutDefaults}
              onChange={(e) => {
                if (e.target !== null && e.target instanceof HTMLInputElement)
                  setOptions({
                    ...options,
                    ...{ withoutDefaults: e.target.checked },
                  })
              }}
            />

            <FormLabel htmlFor="withDesc">
              Enable <Code>.descrive()</Code>:
            </FormLabel>
            <Switch
              id="withDesc"
              isChecked={options.withDesc}
              onChange={(e) => {
                if (e.target !== null && e.target instanceof HTMLInputElement)
                  setOptions({ ...options, ...{ withDesc: e.target.checked } })
              }}
            />

            <FormLabel htmlFor="withAnchors">
              Wrap regex with <Code>^</Code> and <Code>$</Code>:
            </FormLabel>
            <Switch
              id="withAnchors"
              isChecked={options.withAnchors}
              onChange={(e) => {
                if (e.target !== null && e.target instanceof HTMLInputElement)
                  setOptions({
                    ...options,
                    ...{ withAnchors: e.target.checked },
                  })
              }}
            />

            <FormLabel htmlFor="disableAutocomplete">
              Disable Autocomplete:
            </FormLabel>
            <Switch
              id="disableAutocomplete"
              isChecked={options.disableAutocomplete}
              onChange={(e) => {
                if (e.target !== null && e.target instanceof HTMLInputElement)
                  setOptions({
                    ...options,
                    ...{ disableAutocomplete: e.target.checked },
                  })
              }}
            />

            <GridItem colSpan={2} marginBottom="3">
              <FormLabel htmlFor="fontSize">Font size:</FormLabel>
              <NumberInput
                id="fontSize"
                value={options.fontSize}
                defaultValue={16}
                min={10}
                max={24}
                onChange={(_str, num) => {
                  setOptions({
                    ...options,
                    ...{ fontSize: num },
                  })
                }}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </GridItem>

            <GridItem colSpan={2} marginBottom="3">
              <FormLabel htmlFor="inheritPrettier">Prettier Config:</FormLabel>
              <Textarea
                id="inheritPrettier"
                value={options.inheritPrettier ? options.inheritPrettier : ''}
                placeholder="JSON format"
                onChange={(e: InputEvent) => {
                  if (
                    e.target !== null &&
                    e.target instanceof HTMLTextAreaElement
                  ) {
                    setOptions({
                      ...options,
                      ...{
                        inheritPrettier: e.target.value || undefined,
                      },
                    })
                  }
                }}
              />
            </GridItem>

            <GridItem colSpan={2}>
              <FormLabel id="splitRatio">
                Split ratio: {options.splitRatio}%
              </FormLabel>
              <Slider
                variant="colorful"
                aria-labelledby="splitRatio"
                defaultValue={50}
                min={10}
                max={90}
                step={10}
                value={options.splitRatio}
                onChange={(num) => {
                  setOptions({
                    ...options,
                    ...{ splitRatio: num },
                  })
                }}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb bg="blue.300" />
              </Slider>
            </GridItem>
          </FormControl>
        </DrawerBody>

        <DrawerFooter>
          <Button
            variant="outline"
            mr={3}
            onClick={() => {
              setOptions(defaultOptions)
            }}
          >
            Reset
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => {
              convert()
              onClose()
            }}
          >
            Apply
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
