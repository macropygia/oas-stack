/* eslint-disable n/no-unpublished-import */
import type { Ace } from 'ace-builds'
import type { MutableRef, StateUpdater } from 'preact/hooks'
import type ReactAce from 'react-ace'

export interface Options {
  dereference: boolean
  exportName: string | undefined
  individually: boolean
  eslintDisable: boolean
  disableRules: string | undefined
  withoutImport: boolean
  withoutExport: boolean
  disableFormat: boolean
  withoutDefaults: boolean
  withDesc: boolean
  withAnchors: boolean
  disableAutocomplete: boolean
  fontSize: number
  inheritPrettier: any | undefined
  splitRatio: number
}

export interface MenuProps {
  isOpen: boolean
  onClose: () => void
  options: Options
  setOptions: StateUpdater<Options>
  convert: () => void
}

export interface HeaderProps {
  onOpen: () => void
}

export interface InputProps {
  AceEditor: typeof ReactAce
  options: Options
  inputRef: MutableRef<Ace.Editor | undefined>
  setDoc: StateUpdater<string>
}

export interface OutputProps {
  AceEditor: typeof ReactAce
  options: Options
  outputRef: MutableRef<Ace.Editor | undefined>
}
