'use client'

import { useEffect } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

const Editor = () => {
  useEffect(() => {
    const quill = new Quill('#editor', {
      theme: 'snow',
      placeholder: 'Write something amazing...',
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['blockquote', 'code-block'],
          ['link', 'image'],
        ],
      },
    })
  }, [])

  return <section id='editor' className='h-full bg-white'></section>
}

export default Editor
