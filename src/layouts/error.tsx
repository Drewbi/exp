import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();

    if(isRouteErrorResponse(error)) {
        return (
            <div>
                <h1>{error.status || error.statusText || 'ERROR'}</h1>
                <p>
                    <i>{error.statusText || error.status}</i>
                </p>
            </div>
        );
    } else if(error instanceof Error) {
        return (
            <div>
                <h1>ERROR</h1>
                <p>
                    <i>{error.message}</i>
                </p>
            </div>
        );
    } else {
        return (
            <div>
                <h1>ERROR</h1>
            </div>
        )
    }
}