import express from "express";

let app:express.Express = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/', (req:express.Request, res:express.Response)=>{
    res.render("home/index");
})

const port = 8080;
app.listen(port, () => {
    console.log("Server on! http://localhost:"+port);
});