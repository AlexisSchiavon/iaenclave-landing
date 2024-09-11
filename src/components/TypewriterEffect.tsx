import React, { useState, useEffect, useRef } from 'react';

interface TypewriterEffectProps {
    text: string;
    delay?: number;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({ text, delay = 50 }) => {
    const [displayedText, setDisplayedText] = useState('');
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        let i = 0;
        setDisplayedText('');

        const typeNextChar = () => {
            if (i < text.length) {
                setDisplayedText(text.slice(0, i + 1));
                i++;
            } else {
                if (intervalRef.current) clearInterval(intervalRef.current);
            }
        };

        intervalRef.current = setInterval(typeNextChar, delay);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [text, delay]);

    return <span>{displayedText}</span>;
};

export default TypewriterEffect;