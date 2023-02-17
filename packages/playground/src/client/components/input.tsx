import { defaultDoc } from '../../const'

import type { InputProps } from '../../types'
import type { Ace } from 'ace-builds'

export function Input(props: InputProps) {
  const { AceEditor, options, inputRef, setDoc } = props

  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <AceEditor
        name="input"
        theme="monokai"
        mode="yaml"
        tabSize={2}
        width="100%"
        height="100%"
        fontSize={`${options.fontSize}px`}
        style={{
          fontFamily: "'Fira Code', monospace",
        }}
        onChange={async (data: string) => {
          if (!data) return

          const mode = inputRef.current
            ?.getSession()
            .getMode() as Ace.SyntaxMode & { $id: string }
          const syntax = mode.$id
          if (data.startsWith('{') && syntax !== 'ace/mode/json')
            inputRef.current?.getSession().setMode('ace/mode/json')
          else if (syntax !== 'ace/mode/yaml')
            inputRef.current?.getSession().setMode('ace/mode/yaml')

          setDoc(data)
        }}
        onLoad={(editor: Ace.Editor) => {
          inputRef.current = editor
        }}
        defaultValue={defaultDoc}
      />
    </>
  )
}
