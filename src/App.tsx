// import { useState } from 'react'
import RichTextEditor from './components/RichTextEditor';
import Heading from './components/Heading';
import DarkModeButton from './components/DarkModeButton';

function App() {
  return (
    <div className="bg-zinc-100 dark:bg-zinc-800 h-screen w-full">
      <Heading />
      <RichTextEditor />
      <DarkModeButton />
    </div>
  )
}

export default App
