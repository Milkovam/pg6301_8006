import * as React from "react";
import {useLoading} from "./useLoading";

export function MessagingSystem({loadMessaging}) {
    const {loading, error} = useLoading(async () => await loadMessaging());

    if (loading) {
        return <div>...Loading...</div>;
    }
    if (error) {
        return (
            <div><h1>Ops, some error occurred</h1>
                <div>{error.toString()}</div>
            </div>
        );
    }
    return (

        <div><h1>Messaging</h1>
        </div>

    );
}





