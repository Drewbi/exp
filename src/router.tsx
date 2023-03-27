import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';

import Base from './base';
import Error from './error';
import { Exp } from './exp';
import Tets from './exp/tets';
import Boids from './exp/boi';

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
        ],
    }
])

export default function() {
    return (
        <RouterProvider router={router} />
    )
}