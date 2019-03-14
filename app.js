var infoPelicula, buscar;

let favoritos = new Set(); 

function ajaxGet(nombrePelicula) {

  var url = nombrePelicula;
  var req = new XMLHttpRequest();
  req.open("GET", url, true);
  setTimeout(function(){visualializacion(req);  }, 2000);
  req.send(null);
}

function buscador (){

      buscar = prompt("Please enter your name", "all");
      document.getElementById("peliculas").innerHTML +=
      "<form name=inicioSession method=post> Inicio de sesion"+
      " <input type=text name=usuario id = usuario value = Pedro>"+
      "<input type=text name=password id = password value = b>"+
      "<input type=submit value=comprobar  onclick=comprobar()></form>"+
      "</br><form name=myForm method=post>Boton nueva busqueda "+
      " <input type=submit value ="+ buscar+ " name= ir id =ir "+
      "onclick= intermedia()></form>";
      ir.style.backgroundColor = "black";
      ajaxGet("http://www.omdbapi.com/?apikey=f12ba140&s="+
      document.getElementById("ir").value);
      document.getElementById("peliculas").innerHTML +=
      "<h1>Peliculas encontradas</h1></br>";


}

function intermedia()
{
      document.getElementById("peliculas").innerHTML ="";
      buscador();

}


function visualializacion(req){

        var respuesta = req.responseText;
        var imagenes = JSON.parse(respuesta);
        console.log(imagenes);
        var infoTotal = JSON.parse(respuesta);
        infoPelicula = infoTotal.Search;
  
        for(var x = 0; x <infoPelicula.length; x++ ){

        var y = infoPelicula[x].Title;
        y = y.replace(/ /g, ""); 
        document.getElementById("peliculas").innerHTML +=
        "<form name=favoritos  method=post><img src="+infoPelicula[x].Poster+"></br>"
        +"<p><strong>"+infoPelicula[x].Title+"</strong></p></br><input  id=year "+
        "name=year value= "+infoPelicula[x].Year+"></br> <input  id=imdbID name=imdbID"+
        " value="+infoPelicula[x].imdbID+"></br><input  id=Type name=Type value="+
         infoPelicula[x].Type+"></br><input type=submit value=Favoritos name="+y
        + " onclick=recogerFavoritos(name)></form></br></br>";
       
      }
      

}


function recogerFavoritos(nombre){

        favoritos.add(nombre);
        console.log(favoritos);
        favoritos.forEach( ( ele ) => document.getElementById("peliculas").innerHTML += 
          "<p><font color=white>- "+ele+"</font><p></br>" );

}

function verFavoritos(){

      document.getElementById("peliculas").innerHTML = "<h1>Favoritos</h1></br>";
      favoritos.forEach( ( ele ) => document.getElementById("peliculas").innerHTML += 
      "<p>- "+ele.match(/[A-Z][a-z]+|[0-9]+/g).join(" ") +"<p></br>" );
}


function comprobar(){

    var usuario = document.getElementById("usuario").value;
    var password = document.getElementById("password").value;
    if (usuario=='Pedro' && password=='b'){ 

    var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio",
    "Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    var f=new Date();
    document.getElementById("peliculas").innerHTML = "<h1>Informacion</h1></br>";
    document.getElementById("peliculas").innerHTML +="<p>La ultima sesion iniciada por "+
    usuario+" fue: "+f.getDate() + " de  " + meses[f.getMonth()] + " de " + 
    f.getFullYear()+"</p></br>"+"<form name=nuevo  method=post><input type= submit"+
    "value=Favoritos name = favoritos name=otro onclick=verFavoritos()><input type=submit "+
    "value=return name=return onclick=return()></form>";

    } else{ 

         alert("Porfavor ingrese, nombre de usuario y contraseña correctos."); 

    } 
}





buscador();
