/* botones del rake */
const rakeOptions = {
    'rake-free': 0,
    'low-rake': 3,
    'high-rake': 5
}; 

const imgOptions = {
    // '-5': "./img/BestPlayer.svg", 
    // '-3': "./img/SecondBest.svg",
    // '-1': "./img/TightPlayer.svg",
    // '2': "./img/TightPlayerLosses.svg",
    // '3': "./img/RichBusinessmen.svg",
    // '4': "./img/CrazyGambler.svg",
    // '0': "./img/EmptySeat-opaque.svg",

    '5': "<?php echo plugins_url('../img/BestPlayer.svg', __FILE__); ?>",
    '3': "<?php echo plugins_url('../img/SecondBest.svg', __FILE__); ?>",
    '1': "<?php echo plugins_url('../img/TightPlayer.svg', __FILE__); ?>",
    '-1': "<?php echo plugins_url('../img/TightPlayerLosses.svg', __FILE__); ?>",
    '-3': "<?php echo plugins_url('../img/RichBusinessmen.svg', __FILE__); ?>",
    '-5': "<?php echo plugins_url('../img/CrazyGambler.svg', __FILE__); ?>",
    '0': "<?php echo plugins_url('../img/EmptySeat-opaque.svg', __FILE__); ?>",

};

// Esperar a que el DOM esté completamente cargado para utilizar opciones del Rake
document.addEventListener('DOMContentLoaded', function() {
    const optionButtons = document.querySelectorAll('.option-button');
    const rakeValue = document.getElementById('rakeValue');
    updateTableValues();
    optionButtons.forEach(button => {
        button.addEventListener('click', () => {
            optionButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');

            // Obtener el valor numérico correspondiente a la opción seleccionada
            const opcion = button.dataset.option;
            const valor = rakeOptions[opcion];

            // Actualizar el valor del rake
            rakeValue.textContent = valor;
            updateTableValues();

        });
    });

});

// Circulos / Players y Salida del popup
document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('contenedor');

    // document.getElementById('projection-box').style.display = 'flex';
    var tableContainer = document.getElementById('tableContainer');
    const circulos = document.querySelectorAll('.circulo.clickable');
    const popup = document.getElementById('playerPopup');
    const playerButtons = document.querySelectorAll('.option');

    // Elementos Dragables
    const draggable = document.querySelectorAll('.draggable');
    const sideDesktopContainer = document.getElementById('sideDesktop');
    // const papelera = document.getElementById('papeleraIcono');
    // const papeleraContainer = document.getElementById('papelera');


    // Elementos no dropables
    const playerScoreList = document.querySelectorAll('.playerScore');
    playerScoreList.forEach(playerScore => {
        playerScore.addEventListener('dragover', (e) => {
            e.preventDefault(); 
            e.dataTransfer.dropEffect = 'none';
        });
    })

    // Cuando se hace click en un circulos de la mesa, tambien los eventos dropables
    circulos.forEach(circulo => {

        // evento click
        circulo.addEventListener('click', () => {

            const isMiniDesktop = window.matchMedia("(min-width: 1366px)").matches;
            const isDesktop = window.matchMedia("(min-width: 1700px)").matches;


            if (document.getElementById('emptySeatButton').classList.contains('enabled')) {
                // Borrar el jugador asociado a este círculo
                const imagen = circulo.querySelector('img');
                if (imagen) {
                  imagen.remove();
                }
                const idCelda = circulo.dataset.targetCell;
                const elementoCelda = document.getElementById(idCelda);
                if (elementoCelda) {
                  elementoCelda.textContent = 0;
                }
                circulo.querySelector('.playerScore').classList.remove('playerScoreActive');
                updateTableValues();
                emptySeat();
                return;
            }


            // Quitar la clase 'active' de todos los círculos
            circulos.forEach(circle => {
                circle.classList.remove('active');
                const estiloComputado = window.getComputedStyle(circle);
                const imagenFondo = estiloComputado.getPropertyValue('background-image');
                if (imagenFondo.includes('EmptySeat-opaque.svg')) {
                    
                    circle.querySelector('.playerScore').classList.remove('playerScoreActive');
                }
                
            });

            // Agregar la clase 'active' al círculo clickeado
            circulo.classList.add('active');
            circulo.querySelector('.playerScore').classList.add('playerScoreActive');

            if (isMiniDesktop) {

                playerButtons.forEach( pb => {
                    pb.classList.remove('opaque');
                })

                tableContainer.classList.add('opaque');
                // sideDesktopContainer.classList.remove('opaque');
            }else{
                // Mostrar el popup y agregar la clase 'active'
                popup.style.display = 'block';
                setTimeout(() => {
                    popup.classList.add('active');
                }, 10);
            }

            updateTableValues();

        });

        // Mouse Over
        circulo.addEventListener('mouseover', () =>{

            circulo.classList.add('hover');
            circulo.querySelector('.playerScore').classList.add('playerScoreHover');

        })

        // Mouse Out
        circulo.addEventListener('mouseout', () =>{
            circulo.classList.remove('hover')
            circulo.querySelector('.playerScore').classList.remove('playerScoreHover');
        })

        // Drag
        circulo.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.target.classList.add('dragover');
        });

        // Drag leave
        circulo.addEventListener('dragleave', (e) => {
            
            circulo.classList.remove('dragover');
            
        });

        // Drag Start, para almacenar el estado inicial del circulo
        circulo.addEventListener('dragstart', (e) => {
            // console.log(e.target.parentElement.id);
            e.dataTransfer.setData('text/previousSeat', e.target.parentElement.id);
        });

        // Drop elem
        circulo.addEventListener('drop', (e) => {
            e.preventDefault();
    
            const circuloDestino = e.target.classList.contains('circulo') ? e.target : e.target.closest('.circulo');

            // Verificar si ya hay una imagen dentro del círculo
            const imagenExistente = circuloDestino.querySelector('img');
            if (imagenExistente) {
                imagenExistente.remove();
            }

            // Obtener la imagen arrastrada
            const newImage = e.dataTransfer.getData('text/html');
            const tempContainer = document.createElement('div');
            tempContainer.innerHTML = newImage;

            const draggedImage = tempContainer.querySelector('img');

            var playerValue = 0;
            
            if (draggedImage) {
                playerValue = draggedImage.dataset.value;
            }else{
                playerValue = e.dataTransfer.getData('text/plain');
            }

            // Crear una nueva imagen con la misma src y data-value de la imagen arrastrada
            const imgUrl = imgOptions[playerValue];

            const newImageElement = document.createElement("img");
            newImageElement.src = imgUrl
            newImageElement.dataset.value = playerValue;

            circuloDestino.appendChild(newImageElement);
            circuloDestino.querySelector('.playerScore').classList.add('playerScoreActive');

            setPlayerScoreValue(circuloDestino, playerValue);

            const circuloOrigenId = e.dataTransfer.getData('text/previousSeat');
            const circuloOrigen = document.getElementById(circuloOrigenId);

            if(circuloOrigen !== null){
                // Eliminar la imagen del círculo de origen
                if (circuloDestino !== circuloOrigen) {
                    const imagenOrigen = circuloOrigen.querySelector('img');
                    if (imagenOrigen) {
                        imagenOrigen.remove();

                        const idCeldaOrigen = circuloOrigen.dataset.targetCell;
                        const celDaOrigen = document.getElementById(idCeldaOrigen);
                        if (celDaOrigen) {
                            
                            const emptySeatUrl = imgOptions[0];

                            // circuloOrigen.style.backgroundImage = `url(${emptySeatUrl})`;
                            celDaOrigen.textContent = 0;
                        }
                        circuloOrigen.querySelector('.playerScore').classList.remove('playerScoreActive');

                    }
                }
                circuloOrigen.classList.remove('dragover');
            }

            circuloDestino.classList.remove('dragover');
            tableContainer.classList.remove('opaque');
            

            setTimeout(()=>{
                playerButtons.forEach(pb =>{
                    pb.classList.add('opaque');
                })
                
                updateTableValues();
            }, 700)
            
            
        });

        circulo.addEventListener('dragend', (e) => {
            // Verificar si el drop no ocurrió en un círculo válido
            const circuloActivo = e.target.classList.contains('circulo') ? e.target : e.target.closest('.circulo');
            circuloActivo.classList.remove('dragover');
            console.log("Circulo - dragend")
            
            updateTableValues();

        });

    });

    
    // cuando se hace click(selecciona) en un jugador
    playerButtons.forEach(button => {

        button.addEventListener('click', () => {
            const valorBoton = parseInt(button.dataset.value, 10);
            const circuloActivo = document.querySelector('.circulo.active');
            // const isPhablet = window.matchMedia("(min-width: 769px)").matches;
            // const isTablet = window.matchMedia("(min-width: 1024px)").matches;
            const isMiniDesktop = window.matchMedia("(min-width: 1366px)").matches;
            const isDesktop = window.matchMedia("(min-width: 1700px)").matches;
            if (circuloActivo) {

                setPlayerScoreValue(circuloActivo, valorBoton);

                // Verificar si ya hay una imagen dentro del círculo
                const imagenExistente = circuloActivo.querySelector('img');
                if (imagenExistente) {
                    imagenExistente.remove();
                }

                // Actualizar la imagen del círculo activo
                const imagen = imgOptions[valorBoton];

                // circuloActivo.style.backgroundImage = `url(${imagen})`;
                const newImage = document.createElement('img');
                newImage.src = imagen;
                newImage.dataset.value = valorBoton;
                circuloActivo.appendChild(newImage);

                
                if(imagen.includes('EmptySeat-opaque.svg') ){
                    circuloActivo.querySelector('.playerScore').classList.remove('playerScoreActive');
                }else{
                    circuloActivo.querySelector('.playerScore').classList.add('playerScoreActive');
                }

                updateTableValues(); // Actualizar los valores de la tabla

                if (isMiniDesktop) {
                    tableContainer.classList.remove('opaque');
                    // playerButtons.forEach(pb =>{
                    //     pb.classList.add('opaque');
                    // })
                }else{
                    // Ocultar el popup DESPUÉS de actualizar la tabla
                    popup.classList.remove('active');
                    setTimeout(() => {
                        popup.style.display = 'none';
                    }, 300);

                }

                setTimeout(()=>{
                    circuloActivo.classList.remove('active');
                }, 800)
                contenedor.classList.remove('blur');
            }
        });

        button.addEventListener('dragstart', (e) => {
           
            e.dataTransfer.setData('text/plain', e.target.dataset.value);
           
        })

        button.addEventListener('dragend', (e) =>{
            // papelera.style.display = 'none';
        })
    });

    // Oculta el popup de jugadores cuando se hace clik fuera del popup
    tableContainer.addEventListener('click', (event)=>{
        
        if (event.target === tableContainer || event.target === contenedor) {
            popup.classList.remove('active');
            setTimeout(() => {
                popup.style.display = 'none';
            }, 300);
        }
  
    })

});

//Slider Buy IN
document.addEventListener('DOMContentLoaded', () => {

    const slider = document.getElementById('miSlider');
    const valorSlider = document.getElementById('valorSlider');
    const thumbValue = document.getElementById('thumbValue');
    const colorNaranja = '#DB8127';

    // Mostrar valor inicial con formato
    valorSlider.textContent = ('$' + slider.value + 'K');

    slider.oninput = function() {
        // Actualizar el valor mostrado
        valorSlider.textContent = ('$' + this.value + 'K');
        // Aplicar el color naranja al slider
        slider.style.background = `linear-gradient(to right, ${colorNaranja} ${this.value}%, #ccc ${this.value}%)`;

    };

});

//Actualizar valores de la tabla
function updateTableValues(){

    const rake = parseInt(document.getElementById('rakeValue').textContent); // Valor Actuaal del Rake
    const slider = document.getElementById('miSlider'); // Valor Actual del slider

    // Valor actual de cada jugador de la mesa
    const player1 = document.getElementById('player1');
    const player2 = parseInt(document.getElementById('player2').textContent);
    const player3 = parseInt(document.getElementById('player3').textContent);
    const player4 = parseInt(document.getElementById('player4').textContent);
    const player5 = parseInt(document.getElementById('player5').textContent);
    const player6 = parseInt(document.getElementById('player6').textContent);
    const player7 = parseInt(document.getElementById('player7').textContent);
    const player8 = parseInt(document.getElementById('player8').textContent);
    const player9 = parseInt(document.getElementById('player9').textContent);

    var projectionAmount1 = document.getElementById('projectionAmount1');
    var projectionAmount2 = document.getElementById('projectionAmount2');
    var projectionAmount3 = document.getElementById('projectionAmount3');
   
    var currentValue = parseInt( player1.textContent);

    // Y = - (R + Ptotal)
    var playersValues =  player2 + player3 + player4 + player5 + player6 + player7 + player8 + player9;

    var newValue = - (rake + playersValues);

    // var newValue = player2 + player3 + player4 + player5 + player6 + player7 + player8 + player9 - rake;

    if (currentValue != newValue) {
        const increment = newValue > currentValue ? 1 : -1; // Incremento o decremento
        const duration = 1000; // Duración total de la animación (en milisegundos)
        const steps = Math.abs(newValue - currentValue); // Número de pasos
        const stepTime = duration / steps; // Tiempo por paso

        

        const interval = setInterval(() => {
            currentValue += increment;
            if(currentValue > 0){
                player1.textContent = "+" + currentValue;
            }else{
                player1.textContent = currentValue;
            }
            
            player1.classList.add('orange');
            // Aplicar animación de cambio de dígito
            player1.querySelectorAll('.digit').forEach(digit => {
            digit.style.transform = 'translateY(-100%)';
            setTimeout(() => {
                digit.style.transform = 'translateY(0)';
            }, 250); // Retraso para que la transición sea visible
            });
        
            if (currentValue === newValue) {

                clearInterval(interval);
                setTimeout(()=>{
                    player1.classList.remove('orange');
                },500);
            }
        }, stepTime);
    }
     // Actualiza Valores del projection Box
     setAndFormatValue(projectionAmount1, slider, newValue, 1000);
     setAndFormatValue(projectionAmount2, slider, newValue, 10000);
     setAndFormatValue(projectionAmount3, slider, newValue, 100000);
    
}

function setAndFormatValue(element, slider, player1Value, multiplier){


    let currentValue = parseInt(element.textContent.replace(/[$, ]/g, "")) || 0;
    const newValue = slider.value * player1Value * multiplier;

    if (currentValue === newValue) {  return;  }

    const difference = Math.abs(newValue - currentValue);
    const duration = 800; // Duración de la animación
    const maxSteps = 50; // Límite máximo de pasos
    const steps = Math.min(maxSteps, Math.ceil(difference / 1000));
    
    const stepValue = (newValue - currentValue) / steps; // Valor a incrementar en cada paso
    const intervalTime = duration / steps;

    const interval = setInterval(() => {
        currentValue += stepValue;

        if (Math.abs(currentValue - newValue) < Math.abs(stepValue)) {
            clearInterval(interval);
            currentValue = newValue; // Asegurar el valor final exacto
            if(currentValue > 0){
                element.innerHTML =  "+" + (currentValue).toLocaleString('en-US').replace( /(\d)(?=(\d{3})+(?!\d))/g,(match, num) => num + ',' ) + " $";
            }else if(currentValue < 0){
                element.innerHTML =  (currentValue).toLocaleString('en-US').replace( /(\d)(?=(\d{3})+(?!\d))/g,(match, num) => num + ',' ) + " $";
            }else{
                element.innerHTML =  currentValue + " $";
            }
            
            
        } else {
            element.innerHTML =  (currentValue).toLocaleString('en-US').replace( /(\d)(?=(\d{3})+(?!\d))/g,(match, num) => num + ',' ) + " $";
            
        }
    
    }, intervalTime);

}

// Mostrar Slider
function showSlider(){

    const sliderContainer = document.getElementById('slider-container');
    const projectionBox = document.getElementById('projection-box');

    projectionBox.classList.remove('slideInUp');
    projectionBox.classList.add('slideOutDown');

    sliderContainer.classList.remove('slideOutDown');
    sliderContainer.classList.add('slideInUp');
    
    document.getElementById('contenedor').classList.add('blur');
    document.getElementById('resetButton').classList.add('blur');

}

// Ocultar Slider
function hideSlider(){
    const sliderContainer = document.getElementById('slider-container');
    
    const slider = document.getElementById('miSlider');
    const buyIn = document.getElementById('buyIn');

    buyIn.textContent = (parseInt(slider.value) * 1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' $';
    
    sliderContainer.classList.remove('slideInUp');
    sliderContainer.classList.add('slideOutDown');

   
    document.getElementById('projection-box').classList.remove('slideOutDown');
    document.getElementById('projection-box').classList.add('slideInUp');

    document.getElementById('contenedor').classList.remove('blur');
    document.getElementById('resetButton').classList.remove('blur');

    setTimeout(()=>{
        
        updateTableValues();
       
    },500);
}

function destroyImage(imagen) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = imagen.width;
    canvas.height = imagen.height;
    ctx.drawImage(imagen, 0, 0);

    const numFragmentos = 20; // Número de fragmentos
    const fragmentos = [];

    for (let i = 0; i < numFragmentos; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const width = Math.random() * 50 + 20;
        const height = Math.random() * 50 + 20;
        fragmentos.push({ x, y, width, height });
    }

    function animar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const fragmento of fragmentos) {
            fragmento.x += Math.random() * 5 - 2.5;
            fragmento.y += Math.random() * 5 - 2.5;
            ctx.drawImage(imagen, fragmento.x, fragmento.y, fragmento.width, fragmento.height);
        }

        requestAnimationFrame(animar);
    }

    imagen.replaceWith(canvas); // Reemplaza la imagen con el canvas
    animar();
}

function permitirDrop(ev) {
    ev.preventDefault();
}
  
function soltar(ev) {
    ev.preventDefault();
}

function setPlayerScoreValue(circulo, valor){

    const idCelda = circulo.dataset.targetCell;
    const elementoCelda = document.getElementById(idCelda);

    if (elementoCelda) {

        if(valor > 0){
            elementoCelda.textContent = "+" + valor;
        }
        else{
            elementoCelda.textContent = valor;
        }
        
    }
}



function emptySeat() {

    const emptySeatButton = document.getElementById('emptySeatButton');

    emptySeatButton.disabled = !emptySeatButton.disabled;
    if (emptySeatButton.disabled) {
        emptySeatButton.classList.add('enabled');
    } else {
        emptySeatButton.classList.remove('enabled');
    }
  }