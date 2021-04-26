
const express=require("express");
const path =require("path");
const fetch=require("node-fetch");

const app =express();

const discoveryURL = "https://accounts.google.com/.well-known/openid-configuration";

async function fetchJSON(url, options) {
    const res = await fetch(url, options);
    if (!res.ok) {
        throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
    }
    return await res.json();
}


app.get("/api/profile", async (req,res) => {
    const authorization = req.header("Authorization");
    if(!authorization){
        return res.send(401);
    }

    const {userinfo_endpoint} = await fetchJSON(discoveryURL);
    const userinfo= await fetchJSON (userinfo_endpoint, {
        headers: {
            Authorization: authorization,
        },
    });

    console.log(userinfo);

    return res.json(userinfo);

});
app.use(express.static(path.resolve(__dirname,"..","..","dist")));
app.use((req,res,next) => {
    if (req.method ==="GET" && !req.path.startsWith("/api")){
        return res.sendFile(path.resolve(__dirname,"..","..","dist","index.html")
        );
    }
    next();
});

const server=app.listen(3000, () => {
    console.log(`Server stared on http://localhost:${server.address().port}`);
});