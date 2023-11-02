import {
    createBrowserRouter,
    RouterProvider,
    RouteObject
} from 'react-router-dom';

import Error from './layouts/error';
import Base from './layouts/base';
import Showcase from './layouts/showcase';

import config from './exp/config';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Showcase />,
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

export default function () {
    return (
        <RouterProvider router={router} />
    )
}
