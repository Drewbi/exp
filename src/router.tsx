import {
    createBrowserRouter,
    RouterProvider,
    RouteObject
} from 'react-router-dom';

import Error from './layouts/error';
import Base from './layouts/base';
import Showcase from './layouts/showcase';
import TestShowcase from './layouts/testshowcase';

import config from './exp/config';
import testconfig from './test/config'

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
            element: exp.element,
        }))
    },
    {
        path: '/test',
        element: <TestShowcase />,
        errorElement: <Error />,
    },
    {
        path: '/test',
        element: <Base />,
        errorElement: <Error />,
        children: testconfig.map(test => {
            return {
                path: test.path,
                element: <test.Element />,
            }
        }),
    },
    {
        path: '/test',
        element: <Base />,
        errorElement: <Error />,
        children: testconfig.map(test => {
            return {
                path: test.path,
                children: test.children.map(iter => ({
                    path: iter.path,
                    element: <iter.Element />
                }))
            }
        }),
    }
])

export default function () {
    return (
        <RouterProvider router={router} />
    )
}
