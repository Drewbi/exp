import { Link } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import * as blurhash from 'blurhash-wasm';
import "./nav.css"

import Tets from "./exp/tets"
import Boids from "./exp/boi"
import Anem from "./exp/anem"
import anemPreview from "./assets/anemprev.png"
import dotsPreview from "./assets/dotsprev.png"
import tetsPreview from "./assets/fragprev.png"

interface Config {
    name?: string,
    date: Date,
    path: string,
    element: JSX.Element,
    preview: string,
    previewHash: string,
}

export const config: Config[] = [
    {
        name: "Tet(s)",
        date: new Date("10/07/2023"),
        path: "tets",
        element: <Tets />,
        preview: tetsPreview,
        previewHash: "UVAAd|XQ4,raXQfjnQf78^nj-@XQrZf7S|fj"
    },
    {
        name: "Boid(s)",
        date: new Date("10/07/2023"),
        path: "boids",
        element: <Boids />,
        preview: dotsPreview,
        previewHash: "U42GKAaKHXj]o}fQV@f6D4kW*0axQ,fQtmj["
    },
    {
        name: "Anem(one)",
        date: new Date("10/07/2023"),
        path: "anem",
        element: <Anem />,
        preview: anemPreview,
        previewHash: "UD6mHGyZQ,R4Q,fku5pIR4Q,aKozadadaeR4"
    }
]

export default function() {
    return (
        <ul className="relative mx-10 my-20">
            {config.map(e =>
                <div className="border-l-8 border-white pb-16">
                    <li key={e.name} className="flex relative justify-end">
                        <Link className="flex flex-col w-3/4" to={e.path}>
                            <PreloadImage src={e.preview} hash={e.previewHash} alt={"Preview for" + e.name} />
                            <div className="flex justify-between text-white font-mono">
                                <span>{e.date.toDateString()}</span>
                                <span>{e.name}</span>
                            </div>
                        </Link>
                        <div className="flex flex-col justify-center absolute -left-4 top-1/2 w-6 h-10 bg-grey">
                            <div className="w-6 h-2 bg-white"></div>
                        </div>
                    </li>
                </div>
            )}
            <div className="absolute -left-4 -top-4 w-10 h-10 border-8 bg-grey border-white rounded-full flex flex-col justify-center items-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div className="absolute left-0 -bottom-1 bg-white w-2 h-2 rounded-full"></div>
        </ul>
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
    <div className="aspect-square relative">
        <canvas
          ref={canvasRef}
          width={WIDTH}
          height={HEIGHT}
          className="absolute w-full h-full border-8 border-white"
        />
        <img
          src={src}
          alt={alt}
          className="absolute w-full h-full border-8 border-white transition-opacity duration-500"
          style={{opacity: opacity}}
          onLoad={() => {
            console.log('yeet')
            setOpacity(1)
          }}
        />
    </div>
  );
}
