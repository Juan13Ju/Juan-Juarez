(function(){

    //Obtenemos un elemento random del arreglo random
    function getRandom(){

        return random[Math.floor(Math.random() * random.length)];
    }

    // Crea un arreglo con la cadena dada y genera spans letra por letra
    function createText(str){

        let splitText = str.split("");

        let res = "";

        splitText.forEach( letter => {
            
            res += `<span class="letraCambiante">${letter}</span>`
        });

        return res;
    }

    // Cambiamos el texto acutal por un texto random letra por letra
    function cambiarTexto(currentSpans){

        let i = 0;

        let intervalRandom = setInterval(() => changeToRandom(i++, currentSpans) , letterChangeSpeed);

        function changeToRandom(i, currentSpans){

            if(i == currentSpans.length - 1){
                clearInterval(intervalRandom);
                currentSpans.length > ingles ? changeToShorter(currentSpans) : changeToLonger(currentSpans);
            }

            currentSpans[i].innerHTML = getRandom();
        }
    }

    function changeToLonger(currentSpans){

        let i = 0;

        let intervalNewText = setInterval(() => {changeText(currentSpans)}, letterChangeSpeed);

        function changeText(current){

            if(i < current.length){
                current[i].innerHTML = ingles.charAt(i);
            }else{
                current.push(`<span class="letraCambiante">${ingles.charAt(i)}</span>`)
                contenedorTexto.innerHTML += `<span class="letraCambiante">${ingles.charAt(i)}</span>`;
            }

            if(i == ingles.length){
                clearInterval(intervalNewText);
            }

            i++;
        }
    }

    function changeToShorter(current){
        
    }

    const español = "Como estas"
    const ingles = "Puto el que lo lea"
    const randomSymbols = "abcdefghijklmnopqrstuvvxyz123456789!?$%&/()"
    const random = randomSymbols.split("");

    let contenedorTexto = document.querySelector(".textoCambiable");
    contenedorTexto.innerHTML = createText(español);

    const btnCambar = document.querySelector(".btnCambiar");

    let letterChangeSpeed = 125;

    btnCambar.addEventListener("click", () => {
        // Obtenemos el arreglo con todos los elementos con clase letra cambiante
        // El objetivo es cambiar el texto dentro de ellos uno por uno
        let current = [...document.querySelectorAll(".letraCambiante")];
        cambiarTexto(current);
    })
})()