import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';

import Base from './base';
import Error from './error';
import { Exp } from './exp';
import Tets from './exp/tets';
import Boids from './exp/boi';
import Anem from './exp/anem';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Base />,
        errorElement: <Error />,
        children: [
            {
                path: "/exp",
                element: <Exp />,
            },
            {
                path: "/exp/tets",
                element: <Tets />
            },
            {
                path: "/exp/boids",
                element: <Boids />
            },
            {
                path: "/exp/anem",
                element: <Anem />
            },
        ],
    }
])

export default function() {
    return (
        <RouterProvider router={router} />
    )
}