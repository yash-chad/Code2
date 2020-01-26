const express = require("express")
const bodyparser = require('body-parser')
const path = require("path")
const scrape = require("./scrap")
const app = express()


//Express setup
app.use(bodyparser.urlencoded({
    extended: true
}))
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname,"../public")))


app.post("/hotels",(req,res)=>{
    console.log(req.body)

    var cin_date = req.body.cin_date.split("-")[1]
    var cout_date =  req.body.cout_date.split("-")[1]

    scrape.searchHotels(cin_date,cout_date,req.body.name)
    .then(result=>{
        res.json(result)
    }).catch(e=>{
        res.send("Error")
    })
})

// app.get("/hotels/hotel",()=>{

// })

app.get("/hotels/:name/:cin_date/:cout_date",(req,res)=>{

    console.log(req.params.name)
    console.log(req.params.cout_date)
    console.log(req.params.cin_date)
    var cin_date=""
    var cout_date=""
    //if(!req.params.name) req.params.name="Mumbai"
    // if(!req.params.cin_date) cin_date = "2020-01-26"
    // if(!req.params.cout_date) cout_date ="2020-01-28"

    cin_date = req.params.cin_date.split("-")[1]
    cout_date =  req.params.cout_date.split("-")[1]

    

    scrape.searchHotels(cin_date,cout_date,req.params.name)
    .then(result=>{
        res.json(result)
    }).catch(e=>{
        res.send("Error")
    })

})



app.listen(3000,()=>{console.log("Server is up on port 3000")})