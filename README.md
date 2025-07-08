# Rich Text to Markdown Editor
### Project Description

This minimalist web app is a rich text editor built with React and several open-source libraries. It allows users to compose formatted text and export it as Markdown, either by copying the Markdown output or downloading it as a .md file. The interface is designed to be clean and user-friendly, with all essential features easily accessible. In addition to standard Markdown formatting, the editor supports GitHub Flavored Markdown extensions such as underline and strikethrough.

### Why I build this

When I'm typing up a README file, I usually use an online "rich text to markdown" tool to make sure it comes out perfect. I decided to make my own rich text to markdown converter/editor, including only the necessary features including headings, lists, etc. styled in a sleek and enjoyable way!

### Features

-   Rich text editor including:
    -   **Bold font**
    -   _Italic font_
    -   ~~Strikethrough font~~
    -   Unordered lists
    1. Ordered lists
    -   Multiple heading options (h1, h2, h3)
    -   And more!
-   Dark mode toggle
-   Copy converted markdown text to clipboard
-   Download converted text as a .md file
-   Text is stored locally in browser (so it persists when you close the tab or reload)

<img width="1234" alt="Screenshot 2025-07-08 at 15 00 25" src="https://github.com/user-attachments/assets/e53086f3-11e2-40cf-a55f-5d6db8fa385d" />
<img width="1232" alt="Screenshot 2025-07-08 at 15 00 35" src="https://github.com/user-attachments/assets/65dd9e1c-c885-48f8-bfb5-b2ac43ed17df" />


### Tools Used

-   React with Typescript
-   TailwindCSS
-   Vite
-   TipTap - a text editor framework
-   Turndown - for HTML -> MD conversion
-   Lucide Icons from react-icons

P.S. I typed up this very README file using this project!
