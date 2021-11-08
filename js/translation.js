(function () {

    // Funcion para crear un texto conformado por spans
    function createText(texto) {
        let textoSplit = texto.split("");
        let res = "";

        textoSplit.map(letra => {
            res += `<span class="letraCambiante">${letra}</span>`
        });

        return res;

    }

    // Funcion para traducir texto del lenguaje actual a un nuevo lenguaje dado como argumento
    function cambiarTexto(letterArray, newText) {

        let i = 0;
        let intervalNewText = setInterval(() => changeToRandom(letterArray, i++), letterChangeSpeed);

        function changeToRandom(letterArray, i) {

            if (i === letterArray.length - 1) {
                clearInterval(intervalNewText);
                // Llamamos al metodo para crear la traduccion dependediendo de la longitud del texto actual
                letterArray.length > newText.length ? changeToShorter(letterArray, newText) : changeToLonger(letterArray, newText);
            }

            // Si no le pongo eso se rompe el diseño de la pagina no se porque xd
            if (letterArray[i].innerHTML != " ") {
                letterArray[i].innerHTML = getRandom();
            }
        }
    }

    // Metodo para cambiar el texto random a un texto mas largo
    function changeToLonger(letterArray, newText) {

        let i = 0;

        let intervalNewText = setInterval(() => changeText(), letterChangeSpeed);

        function changeText() {

            if (i < letterArray.length) {
                letterArray[i].innerHTML = newText[i];
            } else {
                // Si ya terminamos el arreglo random, simplemente añadimos nuevos span
                letterArray.push(`<span class="letraCambiante">${newText[i]}</span>`);
                aboutMe_paragraph.innerHTML += `<span class="letraCambiante">${newText[i]}</span>`;
                if (i === newText.length-1) {
                    clearInterval(intervalNewText);
                }
            }

            i++;
        }
    }

    //Metodo para cambiar el texto random a un texto mas corto
    function changeToShorter(letterArray, newText){

        let i = 0;
        let intervalNewText = setInterval(() => changeText(i++), letterChangeSpeed);

        function changeText(i){

            if(i < newText.length){
                letterArray[i].innerHTML = newText[i];
            }
            else{
                letterArray[i].classList.add("removeMe");
                letterArray[i].innerHTML = "";
                if(i == letterArray.length-1){
                    clearInterval(intervalNewText);
                    let toRemove = [...document.querySelectorAll(".removeMe")];
                    console.log(toRemove);
                    toRemove.map( el => aboutMe_paragraph.removeChild(el));
                }
            }
        }
    }

    //Obtenemos un elemento random del arreglo random
    function getRandom() {

        return randomArray[Math.floor(Math.random() * randomArray.length)];
    }


    const español = {
        title: "Conoceme mas!",
        text: "Soy un estudiante de Ciencias de la Computacion de la UNAM, apasionado por la programacion, el deporte y los videojuegos, entre mis intereses actuales esta el desarrollo front-end, back-end y el desarrollo movil."
    }

    const ingles = {
        title: "Learn more about me!",
        text: "I'm a Computer Science student at UNAM, MX. Passionate for programming, sports and videogames. My current interests are, front-end, back-end and mobile development."
    }

    // Creamos el array con simbolos aleatorios
    const randomSymbols = "abcdefghijklmnopqrstuvwxyz12345679!·$%&/()=?¿";
    const randomArray = randomSymbols.split("");
    // La velocidad a la que cambiaran las letras en ms
    const letterChangeSpeed = 30;

    // Creamos el titulo directamente
    let aboutMe_title = document.querySelector(".aboutMe_title");
    aboutMe_title.innerHTML = español.title;

    // Para el contenido del parrafo, creamos una coleccion de spans
    let aboutMe_paragraph = document.querySelector(".aboutMe_paragraph");
    aboutMe_paragraph.innerHTML = createText(español.text);

    // Obtenemos los botones que usaremos para traducir el texto
    const btnEspañol = document.getElementById("btnEspañol");
    const btnIngles = document.getElementById("btnIngles");

    // Creamos las funciones para traducir el texto
    btnEspañol.addEventListener("click", () => {

        // Obtenemos un arreglo con cada span de clase letra cambiante
        let letterArray = [...document.querySelectorAll(".letraCambiante")];
        aboutMe_title.innerHTML = español.title;
        cambiarTexto(letterArray, español.text);
    });

    btnIngles.addEventListener("click", () => {
        let letterArray = [...document.querySelectorAll(".letraCambiante")];
        aboutMe_title.innerHTML = ingles.title;
        cambiarTexto(letterArray, ingles.text);
    });


})()