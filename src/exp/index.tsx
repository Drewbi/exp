import { Link } from "react-router-dom"
import "./style.css"

import Tets from "./tets"
import Boids from "./boi"
import Anem from "./anem"

export const config = [
    {
        name: "Tet(s)",
        path: "tets",
        element: <Tets />
    },
    {
        name: "Boid(s)",
        path: "boids",
        element: <Boids />
    },
    {
        name: "Anem(one)",
        path: "anem",
        element: <Anem />
    }
]

export function Exp() {
    return (
        <ul>
            {config.map(e =>
                <li key={e.name}>
                    <Link to={e.path}>{e.name}</Link>
                </li>
            )}
        </ul>
    )
}