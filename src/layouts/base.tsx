import { Link, Outlet } from "react-router-dom";

export default function() {
    return (
        <div className="flex justify-center items-center w-full h-full p-5">
            <Link to='..' relative="path" className="absolute top-4 left-4 z-10">
                <div className="w-10 h-10 border-8 bg-grey border-white rounded-full flex flex-col justify-center items-center">
                    <div className="font-mono text-white text-center pr-1">&#9664;</div>
                </div>
            </Link>
            <div className="aspect-square max-w-5xl w-full lg:max-w-none lg:w-auto xl:h-full border-8 border-white">
                <Outlet />
            </div>
        </div>
    )
}

