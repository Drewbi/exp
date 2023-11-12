import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import * as blurhash from 'blurhash-wasm';
import config from '../exp/config'

export default function () {
    return (
        <div className="w-full h-full px-10 py-20">
            <ul className="flex flex-col lg:flex-row lg:h-full relative ">
                {config.filter(exp => !exp.hidden).sort((a, b) => {
                    return b.date.getTime() - a.date.getTime();
                }).map(e =>
                    <div key={e.name} className="border-l-8 lg:border-l-0 lg:border-b-8 border-white pb-16 lg:pb-0 lg:pr-16 lg:h-full">
                        <li className="flex relative justify-end lg:h-full">
                            <Link className="flex flex-col w-3/4 lg:w-auto lg:h-3/4" to={e.path}>
                                <PreloadImage src={e.preview} hash={e.previewHash} alt={"Preview for" + e.name} />
                                <div className="flex justify-between text-white font-mono">
                                    <span>{e.date.toLocaleDateString("en-AU", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit"
                                    })}</span>
                                    <span>{e.name}</span>
                                </div>
                            </Link>
                            <div className="flex flex-col lg:flex-row justify-center absolute -left-4 top-1/2 lg:top-auto lg:-bottom-4 lg:left-1/2 w-6 h-10 lg:h-6 lg:w-10 bg-grey">
                                <div className="w-6 h-2 lg:w-2 lg:h-6 bg-white"></div>
                            </div>
                        </li>
                    </div>
                )}
                <div className="absolute -left-4 lg:-bottom-4 w-10 h-10 border-8 bg-grey border-white rounded-full flex flex-col justify-center items-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
            </ul>
        </div>
    )
}

function PreloadImage({ hash, src, alt }: { hash: string, src: string, alt: string }) {
    // Hardcoded width/height for the decode and canvas
    // We keep these low and let the UI scale them up
    const WIDTH = 100;
    const HEIGHT = 100;

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [opacity, setOpacity] = useState(-1);

    useEffect(() => {
        try {
            const pixels = blurhash.decode(hash, WIDTH, HEIGHT);
            if (pixels) {

                const asClamped = new Uint8ClampedArray(pixels);
                const imageData = new ImageData(asClamped, WIDTH, HEIGHT);

                const canvasEl = canvasRef.current;

                if (canvasEl) {
                    const ctx = canvasEl.getContext('2d')!;
                    ctx.putImageData(imageData, 0, 0);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }, [hash]);

    return (
        <div className="aspect-square relative lg:h-full flex-shrink-0">
            <canvas
                ref={canvasRef}
                width={WIDTH}
                height={HEIGHT}
                className="absolute w-full h-full border-8 border-white"
            />
            <img
                src={src}
                alt={alt}
                className="pointer-events-none select-none absolute w-full h-full border-8 border-white transition-opacity duration-500"
                style={{ opacity: opacity }}
                onLoad={() => {
                    setOpacity(1)
                }}
            />
        </div>
    );
}
