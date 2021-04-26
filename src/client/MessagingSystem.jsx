import * as React from "react";
import {useLoading} from "./useLoading";
import {useState} from "react";
import {useEffect} from "react";

export function MessagingSystem({loadMessaging}) {

    const [messageFelt,setMessageFelt] =useState([]);
    const {loading, error} = useLoading(async () => await loadMessaging());
    const [message, setMessage] =useState("");
    const [ws,setWs] =useState();


    useEffect(() => {
        const ws =new WebSocket("ws://" + window.location);
        ws.onopen = event => {
            console.log("opened", event);
        };
        ws.onmessage = event => {
            console.log("message", event);
        };
        ws.onmessage = event => {
            console.log("close", event);
        };
        setWs(ws);
    }, []);

    function handleSubmitMessage(e) {
        e.preventDefault();
        setMessageFelt ([... messageFelt,message]);
        ws.send(message);
        setMessage("");

    }
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
                {messageFelt.map((message, index) => (
                    <div key={index}> {message}</div>
                ))}
            </div>
            </main>
            <footer>
                <form onSubmit ={handleSubmitMessage}>
                    <input type="text"
                           autoFocus={true}
                           value={message}
                           onChange={(e)=>setMessage(e.target.value)}/>
                    <button>Submit</button>
                </form>
            </footer>
        </>

    );
}



