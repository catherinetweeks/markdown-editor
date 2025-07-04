import { useState } from 'react';

function RichTextEditor() {

    const [text, setText] = useState<string>('');

    return (
        <div className="max-w-2xl mx-auto p-4">
            <textarea
                className="resize-none w-full h-64 focus:outline-none focus:ring-0"
                value={text}
                onChange={(textChange) => setText(textChange.target.value)}
                placeholder="Enter text here"
            />
        </div>
    );
}

export default RichTextEditor