'use client'

import dynamic from 'next/dynamic'

const Spline = dynamic(() => import('@splinetool/react-spline'), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-neutral-900 animate-pulse" />,
})

interface SplineSceneProps {
    scene: string
    className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
    return (
        <div className={className}>
            <Spline scene={scene} />
        </div>
    )
}
