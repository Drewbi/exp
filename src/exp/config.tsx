import Tets from "./tets"
import Anem from "./anem"
import Dots from "./dots"
import Mag from "./mag"
import Vecfrag from "./vecfrag"
import Sparkl from "./sprkl"
import Globe from "./globe"
import Gen1 from "./gen/gen1"
import Gen2 from "./gen/gen2"
import Gen3 from "./gen/gen3"
import Symbol from "./symbol"
import Void from "./void"
import Scale from "./scale"
import Drown from "./drown"
import Ice from "./ice"

import anemPreview from "../assets/anemprev.png"
import dotsPreview from "../assets/dotsprev.png"
import vecPreview from "../assets/vecprev.png"
import tetsPreview from "../assets/tetsprev.png"
import magPreview from "../assets/magprev.png"
import sprklPreview from "../assets/sprklprev.png"
import globePreview from "../assets/globeprev.png"
import gen1Preview from "../assets/gen1prev.png"
import palettePreview from "../assets/paletteprev.png"
import gen3Preview from "../assets/gen3prev.png"
import symbolPreview from "../assets/symbolprev.png"
import voidPreview from "../assets/voidprev.png"
import scalePreview from "../assets/scaleprev.png"
import drownPreview from "../assets/drownprev.png"
import icePreview from "../assets/iceprev.png"

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
        date: new Date("01/25/2024"),
        path: "tets",
        element: <Tets />,
        preview: tetsPreview,
        previewHash: "U39%*Vj[00j[WBfQj[fQ00ay~qfQxufQRjfQ",
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
        name: "Globe",
        date: new Date("11/11/2023"),
        path: "globe",
        element: <Globe />,
        preview: globePreview,
        previewHash: "U3EV-Y0E~h4#tBWDj@azN0WDRmj@tBWDazaz"
    },
    {
        name: "Particles (Gen 1)",
        date: new Date("1/1/2024"),
        path: "gen1",
        element: <Gen1 />,
        preview: gen1Preview,
        previewHash: "U07-Zw%M9FofRjWBt7ofD%M{%MM{xuWBt7of"
    },
    {
        name: "Palette (Gen 2)",
        date: new Date("1/2/2024"),
        path: "gen2",
        element: <Gen2 />,
        preview: palettePreview,
        previewHash: "U16b3@:O00Brzm%OGFM]006O?:=y5]D}$*nn"
    },
    {
        name: "Droste (Gen 3)",
        date: new Date("1/9/2024"),
        path: "gen3",
        element: <Gen3 />,
        preview: gen3Preview,
        previewHash: "U07.8uo#kDo#tSfQfkfQkXfRH;f6tSfQayfQ"
    },
    {
        name: "Sym(bl)",
        date: new Date("5/4/2024"),
        path: "symbol",
        element: <Symbol />,
        preview: symbolPreview,
        previewHash: "UEECwday00j[offQWBfQ00fQ~qayayfQj[fQ"
    },
    {
        name: "Void",
        date: new Date("1/11/2024"),
        path: "void",
        element: <Void />,
        preview: voidPreview,
        previewHash: "U05q|sj[~qt74n~qRjRj~qRjD%Rj-;IU-;Rj"
    },
    {
        name: "Scale",
        date: new Date("5/5/2024"),
        path: "scale",
        element: <Scale />,
        preview: scalePreview,
        previewHash: "UA9@SDt600M{oxfQaMfj4mWC_4t6aOfQkTf7",
        hidden: true,
    },
    {
        name: "Drown",
        date: new Date("6/30/2024"),
        path: "drown",
        element: <Drown />,
        preview: drownPreview,
        hidden: false,
    },
    {
        name: "Ice",
        date: new Date("7/23/2024"),
        path: "ice",
        element: <Ice />,
        preview: icePreview,
        hidden: false,
    }
]

export default config;
