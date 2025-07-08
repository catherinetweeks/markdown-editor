import { useEditor, EditorContent } from '@tiptap/React';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import TurndownService from 'turndown';
import { LuCopy } from "react-icons/lu";
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
        <button onMouseDown={() => editor.chain().focus().toggleSuperscript().run()} className="btn">Sup</button>
        <button onMouseDown={() => editor.chain().focus().toggleSubscript().run()} className="btn">Sub</button>
        </div>
    );
    };

  const editor = useEditor({
    extensions: [
        StarterKit.configure({
        codeBlock: false, // disable default to use custom CodeBlock
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
    const turndownService = new TurndownService();
    const md = turndownService.turndown(html);
    navigator.clipboard.writeText(md);
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
        <LuCopy />
      </button>
    </div>
  );
}

export default RichTextEditor


//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       Placeholder.configure({
//         placeholder: 'Enter text here...',
//         emptyEditorClass: 'is-editor-empty',
//       }),
//     ],
//     content: '',
//     editorProps: {
//       attributes: {
//         class: 'outline-none ring-0 focus:outline-none focus:ring-0 focus:ring-transparent',
//       },
//     },
//   });