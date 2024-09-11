import React from 'react';

const AnimatedBackground: React.FC = () => (
    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-900 to-purple-900">
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <g className="animate-float">
                <circle cx="10%" cy="10%" r="5" fill="white" opacity="0.3" />
                <circle cx="90%" cy="10%" r="3" fill="white" opacity="0.3" />
                <circle cx="50%" cy="50%" r="7" fill="white" opacity="0.3" />
                <circle cx="20%" cy="80%" r="4" fill="white" opacity="0.3" />
                <circle cx="80%" cy="80%" r="6" fill="white" opacity="0.3" />
            </g>
            <g className="animate-pulse">
                <path d="M50,30 Q60,50 50,70 Q40,50 50,30" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2">
                    <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 50 50" to="360 50 50" dur="10s" repeatCount="indefinite" />
                </path>
            </g>
        </svg>
    </div>
);

export default AnimatedBackground;