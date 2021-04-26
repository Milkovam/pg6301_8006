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

       <>
           <header><h1>Welcome to chat app</h1> </header>
           <main> <div id="messageFelt">

           </div>
           </main>
           <footer>
               <form>
                   <input type="text" autoFocus={true}/>
                   <button>Submit</button>
               </form>
           </footer>
           </>

    );
}





