import Tets from "./tets"
import Boids from "./boi"
import Anem from "./anem"
import Frag from "./frag"
import anemPreview from "../assets/anemprev.png"
import dotsPreview from "../assets/dotsprev.png"
import fragPreview from "../assets/fragprev.png"
import tetsPreview from "../assets/tetsprev.png"

interface Config {
    name?: string,
    date: Date,
    path: string,
    element: JSX.Element,
    preview: string,
    previewHash: string,
}

const config: Config[] = [
    {
        name: "Tet(s)",
        date: new Date("10/07/2023"),
        path: "tets",
        element: <Tets />,
        preview: tetsPreview,
        previewHash: "U0F$bF%M9F%M-;j[j[ay4nfQj[ay-;j[j[ay"
    },
    {
        name: "Frag",
        date: new Date("10/07/2023"),
        path: "frag",
        element: <Frag />,
        preview: fragPreview,
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

export default config;