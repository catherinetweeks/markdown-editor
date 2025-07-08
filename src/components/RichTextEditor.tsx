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

    return (
        <div className="flex flex-wrap gap-2 mb-2">
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

  const editor = useEditor({
    extensions: [
        StarterKit.configure({
        codeBlock: false,
        heading: false,   // disable default heading to use custom
        bulletList: false, // disable default bullet list to use custom
        orderedList: false, // disable default ordered list to use custom
        listItem: false,   // disable default list item to use custom
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
    content: '',
    editorProps: {
        attributes: {
        class: 'outline-none ring-0 focus:outline-none focus:ring-0 focus:ring-transparent',
        },
    },
    });

  const copyMarkdown = () => {
    if (!editor) return;
    const html = editor.getHTML();
    const turndownService = new TurndownService({
      headingStyle: 'atx', // Use # for headings instead of underlines
      bulletListMarker: '-', // Use - for bullet lists
      codeBlockStyle: 'fenced', // Use ``` for code blocks
    });

    // add custom rules for extensions that TurndownService doesn't handle by default
    
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

  return (
    <div className="text-lg max-w-2xl mx-auto p-4 h-full space-y-4">
        <Toolbar editor={editor} />
        <div className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-lg">
        <EditorContent
            editor={editor}
            className="text-black dark:text-white prose dark:prose-invert [&_[contenteditable]]:min-h-[12rem]"
        />
        </div>

      <button
        onClick={copyMarkdown}
        className="px-4 py-2 text-zinc-400 rounded-lg transition cursor-pointer hover:-translate-y-0.5"
      >
        {copied ? <LuCheck className="text-zinc-400" /> : <LuCopy />}
      </button>
      <button
        className="px-4 py-2 text-zinc-400 rounded-lg transition cursor-pointer hover:-translate-y-0.5"
      >
        <LuDownload className="text-zinc-400" />
      </button>
    </div>
  );
}

export default RichTextEditor