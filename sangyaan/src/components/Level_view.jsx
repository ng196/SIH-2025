/**
 * Level View Component
 * 
 * Purpose: Renders the complete learning path with all levels in a curved layout
 * Parent Component: Learn.jsx
 * 
 * Features:
 * - Displays levels in a curved path layout
 * - Auto-focuses on the current level
 * - Handles level progression and unlocking
 * - Shows visual path connection between levels
 * - Responsive design for different screen sizes
 */

import Level from './Level';

const Level_view = ({
    levels = [],
    currentLevel = 1,
    onLevelClick
}) => {

    // Generate level positions for curved path
    const getLevelPosition = (index, total) => {
        const isEven = index % 2 === 0;
        const yPosition = (index * 120) + 80; // Vertical spacing

        return {
            x: isEven ? 100 : 500, // Alternate left and right
            y: yPosition,
            justify: isEven ? 'justify-start' : 'justify-end'
        };
    };

    return (
        <div className="level-path-container relative max-w-4xl mx-auto">
            {/* Curved Path SVG Background */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 600 1200"
                fill="none"
            >
                <path
                    d="M100 80 Q300 160 500 240 Q300 320 100 400 Q300 480 500 560 Q300 640 100 720 Q300 800 500 880 Q300 960 100 1040"
                    stroke="var(--primary)"
                    strokeWidth="4"
                    strokeDasharray="10,5"
                    opacity="0.3"
                />
            </svg>

            {/* Level Nodes */}
            <div className="relative py-8 space-y-16">
                {levels.map((level, index) => {
                    const position = getLevelPosition(index, levels.length);
                    const isCompleted = level <= currentLevel - 1;
                    const isCurrent = level === currentLevel;
                    const isLocked = level > currentLevel;

                    return (
                        <div
                            key={level}
                            className={`flex items-center ${position.justify} px-8`}
                        >
                            <Level
                                levelNumber={level}
                                isCompleted={isCompleted}
                                isCurrent={isCurrent}
                                isLocked={isLocked}
                                progress={isCurrent ? 75 : 0} // Mock progress for current level
                                onLevelClick={onLevelClick}
                            />
                        </div>
                    );
                })}
            </div>

            {/* Auto-scroll to current level */}
            <style jsx>{`
                .level-path-container {
                    scroll-behavior: smooth;
                }
            `}</style>
        </div>
    );
};

export default Level_view;