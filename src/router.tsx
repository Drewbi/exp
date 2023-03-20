import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';

import Base from './base';
import Error from './error';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Base />,
        errorElement: <Error />,
        children: [
            {
              path: "/exp",
              element: <Contact />,
            },
          ],
    }
])

export default function() {
    return (
        <RouterProvider router={router} />
    )
}