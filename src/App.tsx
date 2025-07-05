// import { useState } from 'react'
import RichTextEditor from './components/RichTextEditor';
import Heading from './components/Heading';
import DarkModeButton from './components/DarkModeButton';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Heading />
      <div className="flex-1">
        <RichTextEditor />
      </div>
      <DarkModeButton />
    </div>
  )
}

export default App
