const express=require("express");
const path =require("path");

const app =express();

app.get("/api/profile", (req,res) => {
    const authorization = req.header("Authorization");
    if(!authorization){
        return res.send(401);
    }
    return res.json({
        username: "test",
    });
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