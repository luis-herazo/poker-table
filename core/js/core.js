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

    '-5': "<?php echo plugins_url('../img/BestPlayer.svg', __FILE__); ?>",
    '-3': "<?php echo plugins_url('../img/SecondBest.svg', __FILE__); ?>",
    '-1': "<?php echo plugins_url('../img/TightPlayer.svg', __FILE__); ?>",
    '2': "<?php echo plugins_url('../img/TightPlayerLosses.svg', __FILE__); ?>",
    '3': "<?php echo plugins_url('../img/RichBusinessmen.svg', __FILE__); ?>",
    '4': "<?php echo plugins_url('../img/CrazyGambler.svg', __FILE__); ?>",
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
    var tableContainer = document.getElementById('tableContainer');
    const circulos = document.querySelectorAll('.circulo.clickable');
    const popup = document.getElementById('playerPopup');
    // Seleccionar botones del popup (corregido)
    const playerButtons = document.querySelectorAll('.option');
    const sideDesktopContainer = document.getElementById('sideDesktop');

    circulos.forEach(circulo => {
        circulo.addEventListener('click', () => {

            const isMiniDesktop = window.matchMedia("(min-width: 1440px)").matches;
            const isDesktop = window.matchMedia("(min-width: 1700px)").matches;
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
                tableContainer.classList.add('opaque');
                sideDesktopContainer.classList.remove('opaque');
            }else{
                // Mostrar el popup y agregar la clase 'active'
                popup.style.display = 'block';
                setTimeout(() => {
                    popup.classList.add('active');
                }, 10);
            }

            //updateTableValues();

        });

        circulo.addEventListener('mouseover', () =>{

            circulo.classList.add('hover');
            circulo.querySelector('.playerScore').classList.add('playerScoreHover');

        })

        circulo.addEventListener('mouseout', () =>{
            circulo.classList.remove('hover')
            circulo.querySelector('.playerScore').classList.remove('playerScoreHover');
        })
    });

    playerButtons.forEach(button => {
        button.addEventListener('click', () => {
            const valorBoton = parseInt(button.dataset.value, 10);
            const circuloActivo = document.querySelector('.circulo.active');
            // const isPhablet = window.matchMedia("(min-width: 769px)").matches;
            // const isTablet = window.matchMedia("(min-width: 1024px)").matches;
            const isMiniDesktop = window.matchMedia("(min-width: 1440px)").matches;
            const isDesktop = window.matchMedia("(min-width: 1700px)").matches;
            if (circuloActivo) {
                const idCelda = circuloActivo.dataset.targetCell;
                const elementoCelda = document.getElementById(idCelda);


                if (elementoCelda) {
                    elementoCelda.textContent = valorBoton;

                }

                // Actualizar la imagen del círculo activo
                const imagen = imgOptions[valorBoton];
                circuloActivo.style.backgroundImage = `url(${imagen})`;

                
                if(imagen.includes('EmptySeat-opaque.svg') ){
                    circuloActivo.querySelector('.playerScore').classList.remove('playerScoreActive');
                }else{
                    circuloActivo.querySelector('.playerScore').classList.add('playerScoreActive');
                }

                updateTableValues(); // Actualizar los valores de la tabla

                if (isMiniDesktop) {
                    tableContainer.classList.remove('opaque');
                    sideDesktopContainer.classList.add('opaque');
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
    });

    

    tableContainer.addEventListener('click', (event)=>{
        
        if (event.target === tableContainer || event.target === contenedor) {
            popup.classList.remove('active');
            setTimeout(() => {
                popup.style.display = 'none';
            }, 300);
        }
  
    })

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
    var newValue = player2 + player3 + player4 + player5 + player6 + player7 + player8 + player9 - rake;

    if (currentValue != newValue) {
        const increment = newValue > currentValue ? 1 : -1; // Incremento o decremento
        const duration = 1000; // Duración total de la animación (en milisegundos)
        const steps = Math.abs(newValue - currentValue); // Número de pasos
        const stepTime = duration / steps; // Tiempo por paso

        

        const interval = setInterval(() => {
            currentValue += increment;
            player1.textContent = currentValue;
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

    
    // var currentValue = parseInt(element.textContent.replace(" $", "").replace(",", ""));

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
            element.innerHTML =  (currentValue).toLocaleString('en-US').replace( /(\d)(?=(\d{3})+(?!\d))/g,(match, num) => num + ',' ) + " $";
            
        } else {
            element.innerHTML =  (currentValue).toLocaleString('en-US').replace( /(\d)(?=(\d{3})+(?!\d))/g,(match, num) => num + ',' ) + " $";
            
        }
    
    }, intervalTime);

}

//Slider Buy IN
document.addEventListener('DOMContentLoaded', () => {

    const slider = document.getElementById('miSlider');
    const valorSlider = document.getElementById('valorSlider');
    const thumbValue = document.getElementById('thumbValue');
    const colorNaranja = '#DB8127';

    // Mostrar valor inicial con formato
    valorSlider.textContent = '$' + slider.value + 'K';

    slider.oninput = function() {
        // Actualizar el valor mostrado
        valorSlider.textContent = '$' + this.value + 'K';

        // Aplicar el color naranja al slider
        slider.style.background = `linear-gradient(to right, ${colorNaranja} ${this.value}%, #ccc ${this.value}%)`;

    };

});

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
    buyIn.textContent = (parseInt(slider.value) * 1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' $';
    
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
