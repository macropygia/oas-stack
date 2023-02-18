/* eslint-disable n/no-unpublished-import */
import type { OutputProps } from '../types'
import type { Ace } from 'ace-builds'

export function Output(props: OutputProps) {
  const { AceEditor, options, outputRef } = props

  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <AceEditor
        name="output"
        theme="monokai"
        mode="javascript"
        tabSize={2}
        width="100%"
        height="100%"
        fontSize={`${options.fontSize}px`}
        style={{
          fontFamily: "'Fira Code', monospace",
        }}
        onLoad={(editor: Ace.Editor) => {
          outputRef.current = editor
        }}
      />
    </>
  )
}
