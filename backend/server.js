import app from "./app.js";


app.listen(process.env.PORT ||4000, ()=>{
    console.log(`SERVER HAS STARTED AT PORT ${process.env.PORT}`);
})
