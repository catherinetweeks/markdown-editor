// import { useState } from 'react'
import RichTextEditor from './components/RichTextEditor';
import Heading from './components/Heading';
import DarkModeButton from './components/DarkModeButton';

function App() {
  return (
    <div>
      <Heading />
      <RichTextEditor />
      <DarkModeButton />
    </div>
  )
}

export default App
