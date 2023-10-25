import {
    createBrowserRouter,
    RouterProvider,
    RouteObject
} from 'react-router-dom';

import Base from './base';
import Error from './error';
import Exp, { config } from './nav';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Exp />,
        errorElement: <Error />,
    },  
    {
        path: '/',
        element: <Base />,
        errorElement: <Error />,
        children: config.map((exp): RouteObject => ({
            path: exp.path,
            element: exp.element
        }))
    }
])

export default function() {
    return (
        <RouterProvider router={router} />
    )
}
