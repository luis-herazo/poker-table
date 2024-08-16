<?php

function get_table_values(){

}
 
function poker_table_func(){
    //$datos_js = obtener_datos_de_tabla();

    ob_start(); // Iniciar el almacenamiento en búfer de salida
?>

    <!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" ></script>
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"> -->
    <style>
        <?php include 'css/style.css'; ?>

    </style>
    <script>
	    <?php include 'js/core.js'; ?>
    </script>
    
    <div class="mainContainer" id="mainContainer" >
        <div class="pk-table-title"> Poker is a zero sum game </div>
        <div class="tableContainer" id="tableContainer" >
            
            <div class="contenedor" id="contenedor">
                <div class="pokerTable">
                    <div Class="rake">
                        <span class="rakeValue" id="rakeValue"> 0 </span>
                    </div>
                    <div class="option-buttons">
                        <a class="option-button selected" data-option="rake-free">RAKE FREE</a>
                        <span class="pk-option-separator" > | </span>
                        <a class="option-button" data-option="low-rake">LOW RAKE </a>
                        <span class="pk-option-separator" > | </span>
                        <a class="option-button" data-option="high-rake">HIGH RAKE</a>
                    </div>
                    <div class="circulo c1 you " data-target-cell="player1">
                        You
                        <div class="playerScore you" id="player1"> 0 </div>
                    </div>
                    <div id="c2" class="circulo clickable c2 dropzone" data-target-cell="player2">
                        <div class="playerScore " id="player2"> <span> 0 </span> </div>
                    </div>
                    <div id="c3" class="circulo clickable c3 dropzone" data-target-cell="player3">
                        <div class="playerScore " id="player3"> <span> 0 </span> </div>
                    </div>
                    <div id="c4" class="circulo clickable c4 dropzone" data-target-cell="player4">
                        <div class="playerScore " id="player4"> <span> 0 </span> </div>
                    </div>
                    <div id="c5" class="circulo clickable c5 dropzone" data-target-cell="player5">
                        <div class="playerScore " id="player5"> <span> 0 </span> </div>
                    </div>
                    <div id="c6" class="circulo clickable c6 dropzone" data-target-cell="player6">
                        <div class="playerScore " id="player6"> <span> 0 </span> </div>
                    </div>
                    <div id="c7" class="circulo clickable c7 dropzone" data-target-cell="player7">
                        <div class="playerScore " id="player7"> <span> 0 </span> </div>
                    </div>
                    <div id="c8" class="circulo clickable c8 dropzone" data-target-cell="player8">
                        <div class="playerScore " id="player8"> <span> 0 </span> </div>
                    </div>
                    <div id="c9" class="circulo clickable c9 dropzone" data-target-cell="player9">
                        <div class="playerScore " id="player9"> <span> 0 </span> </div>
                    </div>
                </div>

            </div>
            <div class="resetButton" id="resetButton">
                <!-- <div id="papelera" drop > <img id="papeleraIcono" src="<?php echo plugins_url('./img/Waste.svg', __FILE__);  ?>" alt="Papelera" > </div> -->
                <a class="btn-primary" onclick="location.reload()"> <span> RESET </span>  </a>
                <a id="emptySeatButton" class="btn-primary" onclick="emptySeat()"> <span> Empty Seat </span>  </a>
            </div>
            <div id="playerPopup" class="popup">
                <div class="popupTitle">
                    CHOOSE PLAYER
                </div>
                <div id="popupInfo" class="popupInfo">

                    <div class="options">
                        <button class="option" data-value="5">
                            <img src="<?php echo plugins_url('./img/BestPlayer.svg', __FILE__); ?>">
                            <div class="playerScore playerScoreActive"> <span> +5 </span> </div>
                            Best Player on the Table
                        </button>
                        <button class="option" data-value="3">
                            <img src="<?php echo plugins_url('./img/SecondBest.svg', __FILE__); ?>">
                            <div class="playerScore playerScoreActive"> +3 </div>
                            Second Best on the Table
                        </button>
                        <button class="option" data-value="1">
                            <img src="<?php echo plugins_url('./img/TightPlayer.svg', __FILE__); ?>">
                            <div class="playerScore playerScoreActive"> +1 </div>
                            Tight Player who wins
                        </button>
                        <button class="option" data-value="-1">
                            <img src="<?php echo plugins_url('./img/TightPlayerLosses.svg', __FILE__); ?>">
                            <div class="playerScore playerScoreActive"> -1 </div>
                            Tight Player who loses
                        </button>
                        <button class="option" data-value="-3">
                            <img src="<?php echo plugins_url('./img/RichBusinessmen.svg', __FILE__); ?>">
                            <div class="playerScore playerScoreActive"> -3 </div>
                            Rich Businessmen
                        </button>
                        <button class="option" data-value="-5">
                            <img src="<?php echo plugins_url('./img/CrazyGambler.svg', __FILE__); ?>">
                            <div class="playerScore playerScoreActive"> -5 </div>
                            Crazy Gambler
                        </button>
                        <!-- <button class="option" data-value="0">
                            <img src="<?php echo plugins_url('./img/EmptySeat.svg', __FILE__); ?>">
                            <div class="playerScore playerScoreActive"> 0 </div>
                            Empty Seat
                        </button> -->
                    </div>
                    <div class="categories">
                        <button class="category"> <span> YOUNGSTERS </span> </button>
                        <button class="category"> <span> BUSINESSMEN </span> </button>
                    </div>
                </div>
            </div>
            <div class="projections-box slideInUp" id="projection-box">
                <div class="projectionText">
                    <div> Projections for &nbsp; <span class="projectionBuyIn" id="buyIn"> 1,000 $</span>&nbsp; buy in </div>
                    <div class="editButton"> <a onclick="showSlider()"> <span> Edit </span>  </a> </div>

                </div>

                <div class="projection-dat">
                    <div class="projection-item"> 1 DAY </div>
                    <div class="projection-item"> <span class="session-label"> 1 SESSION </span>  </div>
                    <div class="projection-item" id="projectionAmount1"> -3,000 $</div>

                </div>
                <div class="projection-dat">
                    <div class="projection-item"> 1 MONTH </div>
                    <div class="projection-item"> <span class="session-label"> 10 SESSIONS </span> </div>
                    <div class="projection-item" id="projectionAmount2"> -30,000 $</div>
                </div>
                <div class="projection-dat">
                    <div class="projection-item"> 1 YEAR </div>
                    <div class="projection-item"> <span class="session-label"> 100 SESSIONS </span> </div>
                    <div class="projection-item" id="projectionAmount3"> -300,000 $</div>

                </div>
            </div>
            <div class="slider-container" id="slider-container">

                <label for="miSlider" class="form-label">BUY IN</label>
                <input type="range" min="1" max="100" value="1" class="slider" id="miSlider">
                <p>
                    <span> 1k </span>
                    <span> 100k </span>
                </p>
                <p> <span id="valorSlider"> </span></p>
                <a class="confirmButton" onclick="hideSlider()"> <span> Confirm </span>  </a>
            </div>
        </div>
        <div class="sideDesktopContainer" id="sideDesktop">
            <div id="playersInfo" class="playersInfo">

                <div class="options2">
                    <button class="option draggable" data-value="5" draggable="true">
                        <img src="<?php echo plugins_url('./img/BestPlayer.svg', __FILE__);  ?>" data-value="5">
                        <div class="playerScore playerScoreActive"> <span> +5 </span> </div>
                        Best Player on the Table
                    </button>
                    <button class="option draggable " data-value="3" draggable="true">
                        <img src="<?php echo plugins_url('./img/SecondBest.svg', __FILE__); ?>" data-value="3">
                        <div class="playerScore playerScoreActive"> <span> +3 </span></div>
                        Second Best on the Table
                    </button>
                    <button class="option draggable " data-value="1" draggable="true">
                        <img src="<?php echo plugins_url('./img/TightPlayer.svg', __FILE__); ?>" data-value="1">
                        <div class="playerScore playerScoreActive"> <span> +1 </span> </div>
                        Tight Player who wins
                    </button>
                    <button class="option draggable " data-value="-1" draggable="true">
                        <img src="<?php echo plugins_url('./img/TightPlayerLosses.svg', __FILE__); ?>" data-value="-1">
                        <div class="playerScore playerScoreActive"> <span> -1 </span> </div>
                        Tight Player who loses
                    </button>
                    <button class="option draggable " data-value="-3" draggable="true">
                        <img src="<?php echo plugins_url('./img/RichBusinessmen.svg', __FILE__); ?>" data-value="-3">
                        <div class="playerScore playerScoreActive"> <span> -3 </span> </div>
                        Rich Businessmen
                    </button>
                    <button class="option draggable " data-value="-5" draggable="true">
                        <img src="<?php echo plugins_url('./img/CrazyGambler.svg', __FILE__); ?>" data-value="-5">
                        <div class="playerScore playerScoreActive"> <span> -5 </span> </div>
                        Crazy Gambler
                    </button>
                    <!-- <button class="option draggable " data-value="0" draggable="true">
                        <img src="<?php echo plugins_url('./img/EmptySeat.svg', __FILE__); ?>">
                        <div class="playerScore playerScoreActive"> 0 </div>
                        Empty Seat
                    </button> -->
                </div>
                <div class="categories">
                    <button class="category"> <span> YOUNGSTERS </span> </button>
                    <button class="category"> <span> BUSINESSMEN </span> </button>
                </div>
            </div>
        </div>

    </div>
<?php
    return ob_get_clean();
    // echo '<iframe srcdoc="' . htmlspecialchars(ob_get_clean()) . '"></iframe>'; 
}

add_shortcode( 'poker-table', 'poker_table_func' );
?>
