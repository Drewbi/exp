import { Link, Outlet } from "react-router-dom";

export default function() {
    return (
        <>
            <Link to={'/'}>
                <div className="w-10 h-10 border-8 bg-grey border-white rounded-full flex flex-col justify-center items-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
            </Link>
            <Outlet />
        </>
    )
}

