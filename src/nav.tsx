import { Link } from "react-router-dom"
import "./nav.css"

import Tets from "./exp/tets"
import Boids from "./exp/boi"
import Anem from "./exp/anem"
import anemPreview from "./assets/anemprev.png"
import dotsPreview from "./assets/dotsprev.png"
import tetsPreview from "./assets/fragprev.png"

interface Config {
    name?: string,
    path: string,
    element: JSX.Element,
    preview?: string,
}

export const config: Config[] = [
    {
        name: "Tet(s)",
        path: "tets",
        element: <Tets />,
        preview: anemPreview,
    },
    {
        name: "Boid(s)",
        path: "boids",
        element: <Boids />,
        preview: dotsPreview,
    },
    {
        name: "Anem(one)",
        path: "anem",
        element: <Anem />,
        preview: tetsPreview
    }
]

export default function() {
    return (
        <ul>
            {config.map(e =>
                <li key={e.name}>
                    <img src={e.preview} alt={"Preview for " + e.name} />
                    <Link to={e.path}>{e.name}</Link>
                </li>
            )}
        </ul>
    )
}
