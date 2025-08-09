/* botones del rake */
const rakeOptions = {
    'rake-free': 0,
    'low-rake': 3,
    'high-rake': 5
}; 

const imgOptions = {
    // '5': "core/img/BestPlayer.svg",
    // '3': "core/img/SecondBest.svg",
    // '1': "core/img/TightPlayer.svg",
    // '-1': "core/img/TightPlayerLosses.svg",
    // '-3': "core/img/RichBusinessmen.svg",
    // '-5': "core/img/CrazyGambler.svg",
    // '0': "core/img/EmptySeat-opaque.svg",
    '5': "<?php echo plugins_url('img/BestPlayer.svg', __FILE__); ?>",
    '3': "<?php echo plugins_url('img/SecondBest.svg', __FILE__); ?>",
    '1': "<?php echo plugins_url('img/TightPlayer.svg', __FILE__); ?>",
    '-1': "<?php echo plugins_url('img/TightPlayerLosses.svg', __FILE__); ?>",
    '-3': "<?php echo plugins_url('img/RichBusinessmen.svg', __FILE__); ?>",
    '-5': "<?php echo plugins_url('img/CrazyGambler.svg', __FILE__); ?>",
    '0': "<?php echo plugins_url('img/EmptySeat-opaque.svg', __FILE__); ?>",
};

document.addEventListener('DOMContentLoaded', function() {

    // Rake Buttons Logic
    const optionButtons = document.querySelectorAll('.option-button');
    const rakeValue = document.getElementById('rakeValue');
    if (rakeValue) {
        updateTableValues();
    }
    optionButtons.forEach(button => {
        button.addEventListener('click', () => {
            optionButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');

            const opcion = button.dataset.option;
            const valor = rakeOptions[opcion];

            if (rakeValue) {
                rakeValue.textContent = valor;
            }
            updateTableValues();
        });
    });

    // Circles / Players Logic
    const contenedor = document.getElementById('contenedor');
    const tableContainer = document.getElementById('tableContainer');
    const circulos = document.querySelectorAll('.circulo.clickable');
    const popup = document.getElementById('playerPopup');
    const playerButtons = document.querySelectorAll('.option');
    const draggable = document.querySelectorAll('.draggable');
    const sideDesktopContainer = document.getElementById('sideDesktop');
    const playerScoreList = document.querySelectorAll('.playerScore');

    playerScoreList.forEach(playerScore => {
        playerScore.addEventListener('dragover', (e) => {
            e.preventDefault(); 
            e.dataTransfer.dropEffect = 'none';
        });
    });

    circulos.forEach(circulo => {
        circulo.addEventListener('click', () => {
            const isMiniDesktop = window.matchMedia("(min-width: 1366px)").matches;
            const isSomeActive = [];

            if (document.getElementById('emptySeatButton').classList.contains('enabled')) {
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

                circulos.forEach(c => {

                    var sv = getSeatValue(c)
                    const element = c.querySelector('.playerScoreActive');
                    if (sv != 0) {
                        isSomeActive.push(element);
                    }   
                });
                if (isSomeActive.length == 0) {
                       emptySeat();
                }
                return;
            }

            circulos.forEach(c => {
                c.classList.remove('active')
                c.querySelector('.playerScore').classList.remove('playerScoreActive');
            });

            circulo.classList.add('active');
            circulo.querySelector('.playerScore').classList.add('playerScoreActive');


            var seatValue = getSeatValue(circulo)

            if(seatValue != 0){
                emptySeat();
            }

            if (isMiniDesktop) {
                if(tableContainer) tableContainer.classList.add('opaque');
            } else {
                if (popup) {
                    popup.style.display = 'block';
                    setTimeout(() => popup.classList.add('active'), 10);
                }
            }
            updateTableValues();
        });

        circulo.addEventListener('mouseover', () => {
            circulo.classList.add('hover');
            circulo.querySelector('.playerScore').classList.add('playerScoreHover');
        });

        circulo.addEventListener('mouseout', () => {
            circulo.classList.remove('hover');
            circulo.querySelector('.playerScore').classList.remove('playerScoreHover');
        });

        circulo.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.target.classList.add('dragover');
        });

        circulo.addEventListener('dragleave', () => {
            circulo.classList.remove('dragover');
        });

        circulo.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/previousSeat', e.target.parentElement.id);
        });

        circulo.addEventListener('drop', (e) => {
            e.preventDefault();
            const circuloDestino = e.target.classList.contains('circulo') ? e.target : e.target.closest('.circulo');
            if (!circuloDestino) return;

            const imagenExistente = circuloDestino.querySelector('img');
            if (imagenExistente) {
                imagenExistente.remove();
            }

            const newImageHTML = e.dataTransfer.getData('text/html');
            const tempContainer = document.createElement('div');
            tempContainer.innerHTML = newImageHTML;
            const draggedImage = tempContainer.querySelector('img');
            let playerValue = e.dataTransfer.getData('text/plain');

            if (draggedImage) {
                playerValue = draggedImage.dataset.value;
            }

            const imgUrl = imgOptions[playerValue];
            if (imgUrl) {
                const newImageElement = document.createElement("img");
                newImageElement.src = imgUrl;
                newImageElement.dataset.value = playerValue;
                circuloDestino.appendChild(newImageElement);
            }
            
            circuloDestino.querySelector('.playerScore').classList.add('playerScoreActive');
            setPlayerScoreValue(circuloDestino, playerValue);

            const circuloOrigenId = e.dataTransfer.getData('text/previousSeat');
            const circuloOrigen = document.getElementById(circuloOrigenId);

            if (circuloOrigen && circuloDestino !== circuloOrigen) {
                const imagenOrigen = circuloOrigen.querySelector('img');
                if (imagenOrigen) {
                    imagenOrigen.remove();
                    const idCeldaOrigen = circuloOrigen.dataset.targetCell;
                    const celdaOrigen = document.getElementById(idCeldaOrigen);
                    if (celdaOrigen) {
                        celdaOrigen.textContent = 0;
                    }
                    circuloOrigen.querySelector('.playerScore').classList.remove('playerScoreActive');
                }
            }

            circuloDestino.classList.remove('dragover');
            if(tableContainer) tableContainer.classList.remove('opaque');
            updateTableValues();
        });

        circulo.addEventListener('dragend', (e) => {
            const circuloActivo = e.target.classList.contains('circulo') ? e.target : e.target.closest('.circulo');
            if(circuloActivo) circuloActivo.classList.remove('dragover');
            updateTableValues();
        });
    });

    playerButtons.forEach(button => {
        button.addEventListener('click', () => {
            const valorBoton = parseInt(button.dataset.value, 10);
            const circuloActivo = document.querySelector('.circulo.active');
            const isMiniDesktop = window.matchMedia("(min-width: 1366px)").matches;

            if (circuloActivo) {
                setPlayerScoreValue(circuloActivo, valorBoton);
                const imagenExistente = circuloActivo.querySelector('img');
                if (imagenExistente) {
                    imagenExistente.remove();
                }

                const imagenUrl = imgOptions[valorBoton];
                if (imagenUrl) {
                    const newImage = document.createElement('img');
                    newImage.src = imagenUrl;
                    newImage.dataset.value = valorBoton;
                    circuloActivo.appendChild(newImage);
                }

                if (imagenUrl && imagenUrl.includes('EmptySeat-opaque.svg')) {
                    circuloActivo.querySelector('.playerScore').classList.remove('playerScoreActive');
                } else {
                    circuloActivo.querySelector('.playerScore').classList.add('playerScoreActive');
                }

                updateTableValues();

                if (isMiniDesktop) {
                    if(tableContainer) tableContainer.classList.remove('opaque');
                } else {
                    if (popup) {
                        popup.classList.remove('active');
                        setTimeout(() => { popup.style.display = 'none'; }, 300);
                    }
                }

                setTimeout(() => circuloActivo.classList.remove('active'), 800);
                if(contenedor) contenedor.classList.remove('blur');
            }
        });

        button.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.dataset.value);
        });
    });

    if (tableContainer) {
        tableContainer.addEventListener('click', (event) => {
            if (event.target === tableContainer || event.target === contenedor) {
                if (popup) {
                    popup.classList.remove('active');
                    setTimeout(() => { popup.style.display = 'none'; }, 300);
                }
            }
        });
    }

    // Slider Buy-In Logic
    const slider = document.getElementById('miSlider');
    const valorSlider = document.getElementById('valorSlider');
    if (slider && valorSlider) {
        const colorNaranja = '#DB8127';
        valorSlider.textContent = ('$' + slider.value + 'K');
        slider.oninput = function() {
            valorSlider.textContent = ('$' + this.value + 'K');
            this.style.background = `linear-gradient(to right, ${colorNaranja} ${this.value}%, #ccc ${this.value}%)`;
        };
    }
});

//Actualizar valores de la tabla
function updateTableValues(){
    const rakeEl = document.getElementById('rakeValue');
    const sliderEl = document.getElementById('miSlider');
    const player1El = document.getElementById('player1');

    if (!rakeEl || !sliderEl || !player1El) return; // Exit if essential elements are missing

    const rake = parseInt(rakeEl.textContent) || 0;
    const sliderValue = sliderEl.value;
    
    let playersValues = 0;
    for (let i = 2; i <= 9; i++) {
        const playerEl = document.getElementById('player' + i);
        if (playerEl) {
            playersValues += parseInt(playerEl.textContent) || 0;
        }
    }

    let currentValue = parseInt(player1El.textContent) || 0;
    const newValue = - (rake + playersValues);

    if (currentValue !== newValue) {
        player1El.textContent = (newValue > 0 ? "+" : "") + newValue;
    }

    const projectionAmount1 = document.getElementById('projectionAmount1');
    const projectionAmount2 = document.getElementById('projectionAmount2');
    const projectionAmount3 = document.getElementById('projectionAmount3');

    if(projectionAmount1) setAndFormatValue(projectionAmount1, sliderValue, newValue, 1000);
    if(projectionAmount2) setAndFormatValue(projectionAmount2, sliderValue, newValue, 10000);
    if(projectionAmount3) setAndFormatValue(projectionAmount3, sliderValue, newValue, 100000);
}

function setAndFormatValue(element, sliderValue, player1Value, multiplier){
    const newValue = sliderValue * player1Value * multiplier;
    let displayValue = newValue.toLocaleString('en-US');
    
    if (newValue > 0) {
        element.innerHTML = `+${displayValue} $`;
    } else {
        element.innerHTML = `${displayValue} $`;
    }
}

// Mostrar Slider
function showSlider(){
    const sliderContainer = document.getElementById('slider-container');
    const projectionBox = document.getElementById('projection-box');
    if (!sliderContainer || !projectionBox) return;

    projectionBox.classList.remove('slideInUp');
    projectionBox.classList.add('slideOutDown');
    sliderContainer.classList.remove('slideOutDown');
    sliderContainer.classList.add('slideInUp');
    
    document.getElementById('contenedor')?.classList.add('blur');
    document.getElementById('resetButton')?.classList.add('blur');
}

// Ocultar Slider
function hideSlider(){
    const sliderContainer = document.getElementById('slider-container');
    const projectionBox = document.getElementById('projection-box');
    const slider = document.getElementById('miSlider');
    const buyIn = document.getElementById('buyIn');

    if (!sliderContainer || !projectionBox || !slider || !buyIn) return;

    buyIn.textContent = (parseInt(slider.value) * 1000).toLocaleString('en-US') + ' $';
    
    sliderContainer.classList.remove('slideInUp');
    sliderContainer.classList.add('slideOutDown');
    projectionBox.classList.remove('slideOutDown');
    projectionBox.classList.add('slideInUp');

    document.getElementById('contenedor')?.classList.remove('blur');
    document.getElementById('resetButton')?.classList.remove('blur');

    setTimeout(updateTableValues, 500);
}

function getSeatValue(circulo){
    const idCelda = circulo.dataset.targetCell;
    const elementoCelda = document.getElementById(idCelda);

    return elementoCelda.textContent
}

function setPlayerScoreValue(circulo, valor){
    const idCelda = circulo.dataset.targetCell;
    const elementoCelda = document.getElementById(idCelda);
    if (elementoCelda) {
        elementoCelda.textContent = (valor > 0 ? "+" : "") + valor;
    }
}

function emptySeat() {
    const emptySeatButton = document.getElementById('emptySeatButton');
    if (!emptySeatButton) return;

    emptySeatButton.disabled = !emptySeatButton.disabled;
    if (emptySeatButton.disabled) {
        emptySeatButton.classList.add('enabled');
    } else {
        emptySeatButton.classList.remove('enabled');
    }
}

