
export function GridPattern({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <pattern
                id="grid-pattern"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
            >
                <path
                    d="M.5 20V.5H20"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="2 2"
                />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
    )
}
