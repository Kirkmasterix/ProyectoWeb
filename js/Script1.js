// JavaScript source code

(function () {

    var insertarImagenes = function () {
        var imagen = document.createElement("img");
        for (i = 1; i <= 10; i++) {
            var imagen = document.createElement("img");
            var n = document.createElement("img");
            var im = document.createElement("img");
            imagen.src = "Img\\" + i + ".jpg";
            im.src = "Img\\" + i + ".jpg";
            document.getElementsByTagName("div")[0].appendChild(imagen);
            document.getElementsByTagName("div")[0].appendChild(im);
        }
    }



    var agregarId = function () {
        var list = document.getElementsByTagName("img");
        for (i = 0; i < list.length; i++) {
            list[i].setAttribute("id", i + 1);
        }
    }


    var insertaraleatoria = function () {
        var listaimg = document.getElementsByTagName("img");

        for (j = 0; j < 20; j++) {
            var imgaleatoria = Math.floor(Math.random() * listaimg.length);
            var imagenseleccionada = listaimg[imgaleatoria];
            document.getElementsByTagName("div")[0].appendChild(imagenseleccionada);
        }
    }

    var refrescarClics = function (total) {
        var textoNuevo = document.createTextNode(total);
        var hijo = document.getElementsByTagName("p")[0].childNodes[1];
        document.getElementsByTagName("p")[0].replaceChild(textoNuevo, hijo);
    }

    var imagenAnterior;
    var contador;
    var estado;
    var totalClics;
    var tiempoSegundos;
    var minutos;
    var horas;
    var intervaloSegundos = null;


    var jugar = function () {
        var list = document.querySelectorAll('img');
        list.forEach(function (imagen) {
            imagen.addEventListener('click', function (sender) {
                sender.stopPropagation();
                if (estado == 2) {
                    return;
                }
                if (imagen.style.filter == 'none') {
                    return;
                }
                if (imagen.style.filter == 'opacity(25%)') {
                    return;
                }
             

                imagen.style.filter = 'none';
                if (imagenAnterior === null) {
                    imagenAnterior = Object.assign(imagen);
                    estado = 1;
                    totalClics++;
                    refrescarClics(totalClics);
                }
              
                else {
                    totalClics++;
                    refrescarClics(totalClics);
                    if (imagenAnterior.src !== imagen.src) {
                        estado = 2;
                        window.setTimeout(function () {
                            imagen.style.filter = 'brightness(0)';
                            imagenAnterior.style.filter = 'brightness(0)';
                            imagenAnterior = null;
                            estado = 0;
                        }, 1000);
                    }
                    else {
                        if (imagen.id !== imagenAnterior.id) {
                            estado = 2;
                            contador++;
                            window.setTimeout(function () {
                                imagenAnterior.style.filter = 'opacity(25%)';
                                imagen.style.filter = 'opacity(25%)';
                                imagenAnterior = null;
                                estado = 0;
                            }, 1000);
                        }
                    }
                }

                if (contador == 10) {
                    var mensaje = "Juego completado en " + horas + " horas" + ", " + minutos + " minutos" + " ," + tiempoSegundos + " segundos";
                    var parrafo = document.createElement("p");
                    var nodo = document.createTextNode(mensaje);
                    parrafo.appendChild(nodo);
                    var seccion = document.getElementsByTagName("section")[0];
                    var posterior = document.getElementsByTagName("p")[0];
                    parrafo.setAttribute("class", "eliminar")
                    seccion.insertBefore(parrafo, posterior);
                    clearInterval(intervaloSegundos);   
                }


            });

        });

    }

    var eliminar = function () {
        var div = document.getElementsByTagName("div")[0];
        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }
    }

    var mostrar = function () {
        var list = document.getElementsByTagName("img");
        for (i = 0; i < list.length; i++) {
            list[i].style.filter = 'none';
        }
    }

    var ocultar = function () {
        var list = document.getElementsByTagName("img");
        for (i = 0; i < list.length; i++) {
            list[i].style.filter = 'brightness(0)';
        }
    }

    var cronometrar = function () {
        horas = 0;
        minutos = 0;
        tiempoSegundos = 0;
        var segundos = document.createTextNode(tiempoSegundos);
        var min = document.createTextNode(minutos);
        var h = document.createTextNode(horas);
        if (document.getElementsByTagName("p")[1].childNodes[1] == null) {
            document.getElementsByTagName("p")[1].appendChild(h);
        }
        else {
            var hViejos = document.getElementsByTagName("p")[1].childNodes[1];
            document.getElementsByTagName("p")[1].replaceChild(h, hViejos);
        }
        if (document.getElementsByTagName("p")[2].childNodes[1] == null) {
            document.getElementsByTagName("p")[2].appendChild(min);
        }
        else {
            var minViejos = document.getElementsByTagName("p")[2].childNodes[1];
            document.getElementsByTagName("p")[2].replaceChild(min, minViejos);
        }

        if (document.getElementsByTagName("p")[3].childNodes[1] == null) {
            document.getElementsByTagName("p")[3].appendChild(segundos);
        }
        else {
            var segundosViejos = document.getElementsByTagName("p")[3].childNodes[1];
            document.getElementsByTagName("p")[3].replaceChild(segundos, segundosViejos);
        }
       
        if (intervaloSegundos != null) {
            clearInterval(intervaloSegundos);
        }
        intervaloSegundos = setInterval(function () {
            if (tiempoSegundos == 60) {
                tiempoSegundos = 0;
                minutos++;
                min = document.createTextNode(minutos);
                if (document.getElementsByTagName("p")[2].childNodes[1] == null) {
                    document.getElementsByTagName("p")[2].appendChild(min);
                }
                else {
                    var minViejos = document.getElementsByTagName("p")[2].childNodes[1];
                    document.getElementsByTagName("p")[2].replaceChild(min, minViejos);
                }
            }
            if (minutos == 60) {
                minutos = 0;
                horas++;
                h = document.createTextNode(horas);
                if (document.getElementsByTagName("p")[1].childNodes[1] == null) {
                    document.getElementsByTagName("p")[1].appendChild(h);
                }
                else {
                    var hViejas = document.getElementsByTagName("p")[1].childNodes[1];
                    document.getElementsByTagName("p")[1].replaceChild(h, hViejas);
                }
            }
            tiempoSegundos++;
            var tiempoActualizado = document.createTextNode(tiempoSegundos);
            var tiempoAnterior = document.getElementsByTagName("p")[3].childNodes[1];
            document.getElementsByTagName("p")[3].replaceChild(tiempoActualizado, tiempoAnterior);
        }, 1000);
    }

    var iniciar = function () {
        var boton = document.getElementsByTagName("input")[0];
        boton.addEventListener("click", function () {
            if (document.getElementsByTagName("p")[0].className == "eliminar") {
                var parrafoViejo = document.getElementsByTagName("p")[0];
                document.getElementsByTagName("section")[0].removeChild(parrafoViejo);
            }
            contador = 0;
            totalClics = 0;
            var textoNuevo = document.createTextNode(totalClics);
            if (document.getElementsByTagName("p")[0].childNodes[1] == null) {
                document.getElementsByTagName("p")[0].appendChild(textoNuevo);
            }
            else {
                var hijoAnterior = document.getElementsByTagName("p")[0].childNodes[1];
                document.getElementsByTagName("p")[0].replaceChild(textoNuevo, hijoAnterior);
            }
            cronometrar();
            imagenAnterior = null;
            estado = 0;
            boton.value = "Reiniciar juego";
            eliminar();
            insertarImagenes();
            agregarId();
            insertaraleatoria();
            mostrar();
            window.setTimeout(function (){
                ocultar();
            }, 4000);
            jugar();
        });
    }
    iniciar();


}());