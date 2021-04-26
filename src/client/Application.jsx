import * as React from "react";
import {useState} from "react";
import {BrowserRouter, Link} from "react-router-dom";
import {Route, Switch} from "react-router";
import {ProfilePage} from "./ProfilePage";
import {fetchJSON} from "./http";
import {LoginPage} from "./LoginPage";


export function Application(){
    const [access_token,setAccess_token]=useState();

    const googleIdentityProvider = {
        discoveryURL: "https://accounts.google.com/.well-known/openid-configuration",
        client_id: "790682006731-tedr7a164klngk19hf078gceu6d17klo.apps.googleusercontent.com",

    };

    function loadProfile() {
        return fetchJSON ("/api/profile", {
            headers: {
            ...(access_token ? {Authorization: `Bearer ${access_token}` } :{}),
            },
        });
    }

   return (
       <BrowserRouter>
           <Switch>
               <Route path={"/"} exact>
                   <h1>Welcome</h1>
                   <ul>
                       <li><Link to={"/profile"}>Profile</Link></li>
                       <li><Link to={"/login"}>Login</Link></li>
                   </ul>
               </Route>
               <Route path={"/profile"}>
                   <ProfilePage loadProfile={loadProfile}/>
               </Route>
               <Route path={"/login"} exact>
                   <LoginPage identityProvider={googleIdentityProvider}/>
               </Route>
               <Route path={"/login/callback"}>
                   <h1>Login callback</h1>
               </Route>
               <Route>
                   <h1>Not Found</h1>
               </Route>
           </Switch>
       </BrowserRouter>
);
}