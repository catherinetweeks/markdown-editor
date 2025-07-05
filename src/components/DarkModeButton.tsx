import { useState, useEffect } from 'react';
import { LuSun, LuMoon } from "react-icons/lu";

function DarkModeButton () {

    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') as 'light' | 'dark';

        const initialTheme = storedTheme;
        setTheme(initialTheme);
        document.documentElement.classList.toggle('dark', initialTheme === 'dark');
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
    };

    return (
        <button
            className="bg-zinc-100 dark:bg-zinc-800 p-2 rounded-xl fixed bottom-6 right-6 cursor-pointer hover:-translate-y-0.5 transition-transform"
            onClick={toggleTheme}>
            {theme === 'light' ?  (
                <LuMoon className="w-7 h-7 text-black"/>
            ) : (
                <LuSun className = "w-7 h-7 text-white"/>
            )}
        </button>
    )
}
export default DarkModeButton