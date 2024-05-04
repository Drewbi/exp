import { Link, Outlet } from "react-router-dom";
import backIcon from "../assets/icons/back.png";
import "./base.css"

export default function () {
    return (
        <div className="flex justify-center items-center w-full h-full p-5">
            <Link to='.' relative="path" className="absolute top-4 left-4 z-10">
                <img src={backIcon} className="w-16" />
            </Link>
            <div id="display" className="border-8 border-white">
                <Outlet />
            </div>
        </div>
    )
}

