import { useEditor, EditorContent } from '@tiptap/React';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import TurndownService from 'turndown';
import { LuCopy, LuCheck, LuDownload } from "react-icons/lu";
import { useState } from 'react';
import '../editor.css';

// toolbar buttons
import Underline from '@tiptap/extension-underline';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';

function RichTextEditor() {
  const [copied, setCopied] = useState(false);

  const Toolbar = ({ editor }: { editor: any }) => {
    if (!editor) return null;

    // buttons for editor toolbar
    return (
        <div className="max-w-md flex flex-wrap justify-start mb-2 w-full gap-2">
            <button onMouseDown={() => editor.chain().focus().toggleBold().run()} className="btn font-bold">B</button>
            <button onMouseDown={() => editor.chain().focus().toggleItalic().run()} className="btn italic">I</button>
            <button onMouseDown={() => editor.chain().focus().toggleUnderline().run()} className="btn underline">U</button>
            <button onMouseDown={() => editor.chain().focus().toggleStrike().run()} className="btn line-through">S</button>
            <button onMouseDown={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className="btn">H1</button>
            <button onMouseDown={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className="btn">H2</button>
            <button onMouseDown={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className="btn">H3</button>
            <button onMouseDown={() => editor.chain().focus().toggleBulletList().run()} className="btn">• List</button>
            <button onMouseDown={() => editor.chain().focus().toggleOrderedList().run()} className="btn">1. List</button>
            <button onMouseDown={() => editor.chain().focus().toggleSuperscript().run()} className="btn">X<sup>2</sup></button>
            <button onMouseDown={() => editor.chain().focus().toggleSubscript().run()} className="btn">X<sub>2</sub></button>
        </div>
      );
    };

  // store text locally on browser-- persists when tab is closed or refreshed
  const LOCAL_STORAGE_KEY = 'tiptap-content';
  const savedContent = typeof window !== 'undefined'
  ? localStorage.getItem(LOCAL_STORAGE_KEY)
  : '';
  
  //editor settings/rules
  const editor = useEditor({
    extensions: [
        StarterKit.configure({
          // disabling features so custom ones can be used-- the default ones weren't working
        codeBlock: false,
        heading: false,   // disable default heading
        bulletList: false, // disable default bullet list
        orderedList: false, // disable default ordered list
        listItem: false,   // disable default list item
        }),
        Placeholder.configure({
        placeholder: 'Enter text here...',
        emptyEditorClass: 'is-editor-empty',
        }),
        Underline,
        Superscript,
        Subscript,
        Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
        }),
        BulletList.configure({
        HTMLAttributes: {
            class: 'my-bullet-list',
        },
        }),
        OrderedList.configure({
        HTMLAttributes: {
            class: 'my-ordered-list',
        },
        }),
        ListItem,
    ],
    // load saved content or empty string if saved content is empty
    content: savedContent || '',
    editorProps: {
        // get rid of focus ring
        attributes: {
        class: 'outline-none ring-0 focus:outline-none focus:ring-0 focus:ring-transparent',
        },
    },
    //update saved storage
    onUpdate({ editor }) {
      const html = editor.getHTML();
      localStorage.setItem(LOCAL_STORAGE_KEY, html);
  },
    });

  
  // convert then copy the rich text into markdown using turndown service
  const copyMarkdown = () => {
    if (!editor) return;
    const html = editor.getHTML();
    const turndownService = new TurndownService({
      headingStyle: 'atx', // use # for headings (as opposed to underlines)
      bulletListMarker: '-', // - for bulleted lists
      codeBlockStyle: 'fenced', // ``` for code blocks
    });
    
    // handle underline (convert to HTML since markdown doesn't have native underline)
    turndownService.addRule('underline', {
      filter: ['u'],
      replacement: function (content) {
        return '<u>' + content + '</u>';
      }
    });

    // handle strikethrough
    turndownService.addRule('strikethrough', {
      filter: ['s', 'del'],
      replacement: function (content) {
        return '~~' + content + '~~';
      }
    });

    // handle superscript
    turndownService.addRule('superscript', {
      filter: ['sup'],
      replacement: function (content) {
        return '^' + content + '^';
      }
    });

    // handle subscript
    turndownService.addRule('subscript', {
      filter: ['sub'],
      replacement: function (content) {
        return '~' + content + '~';
      }
    });

    // handle headings more explicitly
    turndownService.addRule('heading', {
      filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      replacement: function (content, node) {
        const level = parseInt(node.nodeName.charAt(1));
        const hashes = '#'.repeat(level);
        return '\n' + hashes + ' ' + content + '\n';
      }
    });

    const md = turndownService.turndown(html);
    navigator.clipboard.writeText(md);
    
    // show copied feedback
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // download markdown as an md file
  const downloadMarkdown = () => {
    if (!editor) return;
    const html = editor.getHTML();
    const turndownService = new TurndownService({
      headingStyle: 'atx',
      bulletListMarker: '-',
      codeBlockStyle: 'fenced',
    });

    // add the same custom rules as the copy function
    turndownService.addRule('underline', {
      filter: ['u'],
      replacement: function (content) {
        return '<u>' + content + '</u>';
      }
    });

    turndownService.addRule('strikethrough', {
      filter: ['s', 'del'],
      replacement: function (content) {
        return '~~' + content + '~~';
      }
    });

    turndownService.addRule('superscript', {
      filter: ['sup'],
      replacement: function (content) {
        return '^' + content + '^';
      }
    });

    turndownService.addRule('subscript', {
      filter: ['sub'],
      replacement: function (content) {
        return '~' + content + '~';
      }
    });

    turndownService.addRule('heading', {
      filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      replacement: function (content, node) {
        const level = parseInt(node.nodeName.charAt(1));
        const hashes = '#'.repeat(level);
        return '\n' + hashes + ' ' + content + '\n';
      }
    });

    const md = turndownService.turndown(html);
    
    // create blob with the markdown content
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    
    // temp download link
    const link = document.createElement('a');
    link.href = url;
    link.download = `new-markdown-document.md`;
    document.body.appendChild(link);
    link.click();
    
    // cleanup from download link
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="text-lg max-w-4xl mx-auto p-4 h-full space-y-4">
        {/* toolbar */}
        <Toolbar editor={editor} />

        {/* horizontal line to separate textbox from toolbar */}
        <hr className="max-w-4xl flex flex-wrap justify-start mb-2 w-full text-zinc-200 dark:text-zinc-700"/>

        {/* editor that grows to fix the size of the text */}
        <div className="p-4 rounded-lg">
        <EditorContent
            editor={editor}
            className="text-black dark:text-white prose dark:prose-invert [&_[contenteditable]]:min-h-[12rem]"
        />
        </div>

      {/* copy markdown to clipboard button  */}
      <button
        onClick={copyMarkdown}
        className="px-4 py-2 text-zinc-400 rounded-lg transition cursor-pointer hover:-translate-y-0.5"
      >
        {copied ? <LuCheck className="text-zinc-400" /> : <LuCopy />}
      </button>

      {/* download md file to downloads */}
      <button
        onClick={downloadMarkdown}
        className="px-4 py-2 text-zinc-400 rounded-lg transition cursor-pointer hover:-translate-y-0.5"
      >
        <LuDownload className="text-zinc-400" />
      </button>
    </div>
  );
}

export default RichTextEditor