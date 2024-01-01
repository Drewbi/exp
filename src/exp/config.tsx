import Tets from "./tets"
import Anem from "./anem"
import Dots from "./dots"
import Mag from "./mag"
import Vecfrag from "./vecfrag"
import Sparkl from "./sprkl"
import Gen1 from "./gen/gen1"

import anemPreview from "../assets/anemprev.png"
import dotsPreview from "../assets/dotsprev.png"
import vecPreview from "../assets/vecprev.png"
import tetsPreview from "../assets/tetsprev.png"
import magPreview from "../assets/magprev.png"
import sprklPreview from "../assets/sprklprev.png"
import gen1Preview from "../assets/gen1prev.png"

interface Config {
    name?: string,
    date: Date,
    path: string,
    element: JSX.Element,
    preview?: string,
    previewHash?: string,
    hidden?: boolean,
}

const config: Config[] = [
    {
        name: "Tet(s)",
        date: new Date("03/27/2023"),
        path: "tets",
        element: <Tets />,
        preview: tetsPreview,
        previewHash: "U0F$bF%M9F%M-;j[j[ay4nfQj[ay-;j[j[ay",
        hidden: true,
    },
    {
        name: "Vec(tor)",
        date: new Date("10/07/2023"),
        path: "Vec",
        element: <Vecfrag />,
        preview: vecPreview,
        previewHash: "",
        hidden: true,
    },
    {
        name: "Dot(s)",
        date: new Date("09/04/2022"),
        path: "dots",
        element: <Dots />,
        preview: dotsPreview,
        previewHash: "U54e=?Mx4T%hI9tRt8Mx8wfk?wWA%#WBRPtR"
    },
    {
        name: "Mag(net)",
        date: new Date("11/02/2023"),
        path: "mag",
        element: <Mag />,
        preview: magPreview,
        previewHash: "UD6mHGyZQ,R4Q,fku5pIR4Q,aKozadadaeR4",
        hidden: true
    },
    {
        name: "Anem(one)",
        date: new Date("09/24/2022"),
        path: "anem",
        element: <Anem />,
        preview: anemPreview,
        previewHash: "UD6mHGyZQ,R4Q,fku5pIR4Q,aKozadadaeR4"
    },
    {
        name: "Spark(l)",
        date: new Date("11/11/2023"),
        path: "sprkl",
        element: <Sparkl />,
        preview: sprklPreview,
        previewHash: "U038;jj[M{j[offQayfQM{fQt7fQj[fQj[fQ"
    },
    {
        name: "Particles (Gen 1)",
        date: new Date("1/1/2024"),
        path: "gen1",
        element: <Gen1 />,
        preview: gen1Preview,
        previewHash: "U07-Zw%M9FofRjWBt7ofD%M{%MM{xuWBt7of"
    }
]

export default config;
