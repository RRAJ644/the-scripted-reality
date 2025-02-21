'use client'

import React, { useState, useEffect } from 'react'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import {
  EditorState,
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  TextFormatType,
} from 'lexical'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import {
  ListNode,
  ListItemNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from '@lexical/list'
import { LinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link'
import { CodeNode } from '@lexical/code'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  ListOrdered,
  List,
  Link,
  Undo,
  Redo,
} from 'lucide-react'

const theme = {
  paragraph: 'editor-paragraph',
}

const onChange = (editorState: EditorState) => {
  console.log('Editor State Updated:', editorState)
}

const Toolbar = () => {
  const [editor] = useLexicalComposerContext()
  const [activeFormats, setActiveFormats] = useState(new Set())
  const [linkUrl, setLinkUrl] = useState('')
  const [showLinkInput, setShowLinkInput] = useState(false)

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          const newActiveFormats = new Set()
          ;['bold', 'italic', 'underline', 'strikethrough', 'code'].forEach(
            (format) => {
              if (selection.hasFormat(format as TextFormatType)) {
                newActiveFormats.add(format as TextFormatType)
              }
            }
          )
          setActiveFormats(newActiveFormats)
        }
      })
    })
  }, [editor])

  const toggleFormat = (format: any) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format)
  }

  const insertLink = () => {
    if (linkUrl) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl)
      setShowLinkInput(false)
      setLinkUrl('')
    }
  }

  return (
    <div className='toolbar flex flex-wrap space-x-2 p-2 border-b bg-white shadow-md rounded-md items-center'>
      {[
        ['bold', Bold],
        ['italic', Italic],
        ['underline', Underline],
        ['strikethrough', Strikethrough],
      ].map(([cmd, Icon], idx) => (
        <button
          key={idx}
          className={`p-2 rounded-md border transition hover:bg-gray-100 ${
            activeFormats.has(cmd)
              ? 'bg-blue-500 text-white'
              : 'text-gray-700 border-gray-300'
          }`}
          onClick={() => toggleFormat(cmd)}
        >
          <Icon className='w-5 h-5' />
        </button>
      ))}
      <button
        onClick={() =>
          editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
        }
        className='p-2 rounded-md border text-gray-700 border-gray-300 hover:bg-gray-100'
      >
        <ListOrdered className='w-5 h-5' />
      </button>
      <button
        onClick={() =>
          editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
        }
        className='p-2 rounded-md border text-gray-700 border-gray-300 hover:bg-gray-100'
      >
        <List className='w-5 h-5' />
      </button>
      <button
        onClick={() => setShowLinkInput(true)}
        className='p-2 rounded-md border text-gray-700 border-gray-300 hover:bg-gray-100'
      >
        <Link className='w-5 h-5' />
      </button>
      {showLinkInput && (
        <div className='flex items-center space-x-2'>
          <input
            type='text'
            className='border p-1 rounded-md outline-none'
            placeholder='Enter URL...'
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
          />
          <button
            onClick={insertLink}
            className='bg-blue-500 text-white px-3 py-1 rounded-md'
          >
            Add
          </button>
        </div>
      )}
    </div>
  )
}


const BlogEditor = () => {
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError: (error: any) => console.error(error),
    nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, CodeNode, LinkNode],
  }

  return (
    <section className='h-full border-2 border-gray-300 p-4 bg-white rounded-lg shadow-lg'>
      <LexicalComposer initialConfig={initialConfig}>
        <Toolbar />
        <RichTextPlugin
          contentEditable={
            <ContentEditable className='editor-input min-h-[200px] p-4 border rounded-md outline-none bg-gray-50' />
          }
          placeholder={
            <div className='editor-placeholder'>Enter some text...</div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <AutoFocusPlugin />
        <OnChangePlugin onChange={onChange} />
      </LexicalComposer>
    </section>
  )
}

export default BlogEditor
