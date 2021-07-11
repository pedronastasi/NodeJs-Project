var express = require("express");
var app = express();

const pug = require("pug");

app.use(express.static(__dirname+"/public"));

const puerto = process.env.PORT || 3000;

var perros_array = [
  {raza:"Doberman",texto:"Perro de ataque",imagen:"doberman.jpg"},
  {raza:"Dachshund",texto:"Perro de caza",imagen:"dachshund.jpg"},
  {raza:"Pastor Alemán",texto:"Perro de pastoreo",imagen:"pastorAleman.jpg"},
  {raza:"Pug",texto:"Perro de compañía",imagen:"pug.jpg"},
  {raza:"San Bernardo",texto:"Perro de rescate",imagen:"sanbernardo.jpg"},
]

app.get("/",(req,res)=>{
  //res.send("index.html");
  res.render("index.pug",{
    titulo: "Perros del mundo",
    texto: "Selecciona un perro",
    imagen: "perros.jpg",
    perros: perros_array
  });
});

app.get("/perro/:raza",(req,res)=>{
  
  var datosPerro = perros_array.filter((perro)=>{
    if (req.params.raza==perro.raza) {
      return perro;
    }
  })[0];

  res.render("perro.pug",{
    raza: req.params.raza,
    data: datosPerro
  });
});

app.use((req,res)=>{

  res.status(400);

  let error = req.originalUrl;

  res.render("404.pug",{texto:error});

});

app.listen(puerto,()=>{
  console.log("Servidor en el puerto",puerto);
});