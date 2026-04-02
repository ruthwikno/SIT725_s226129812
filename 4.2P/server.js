
var express = require("express")
var app = express()
app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const cardList = [
{
  title: "Koenigsegg Regera",
  image: "images/koenigsegg.jpg",
  link: "About Koenigsegg Regera",
  description: "Top speed : 410 km/h\n0-100km/h : 2.8 sec\nEngine : 5.0L twin-turbo V8\nhorsepower : 1500 hp"
},
{
  title: "Bugatti Chiron",
  image: "images/Chiron.jpg",
  link: "About Bugatti Chiron",
  description: "Top speed : 420 km/h\n0-100km/h : 2.4 sec\nEngine : 8.0L W16 quad-turbocharged\nHorsepower : 1479 hp"
}
]
app.get('/api/projects',(req,res) => {
res.json({statusCode: 200, data: cardList, message:"Success"})
})
var port = process.env.port || 3000;
app.listen(port,()=>{
console.log("App listening to: "+port)
})
