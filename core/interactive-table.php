<?php

function get_table_values(){

}

function poker_table_func(){
    //$datos_js = obtener_datos_de_tabla();

    ob_start(); // Iniciar el almacenamiento en búfer de salida
?>

    <!-- <link rel="stylesheet" href="./css/style.css"/> -->
    <!-- <script src="./js/main.js"></script> -->
    <style>
        <?php include 'css/style.css'; ?>

    </style>
    <script>
	    <?php include 'js/core.js'; ?>
    </script>
    <div class="mainContainer" id="mainContainer">
        <div class="tableContainer" id="tableContainer" >
            <div class="table-title"> Poker is a zero sum game </div>
            <div class="contenedor" id="contenedor">
                <div class="pokerTable">
                    <div Class="rake">
                        <span class="rakeValue" id="rakeValue"> 3 </span>
                    </div>
                    <div class="option-buttons">
                        <a class="option-button" data-option="rake-free">RAKE FREE</a>
                        <a class="option-button selected" data-option="low-rake">LOW RAKE</a>
                        <a class="option-button" data-option="high-rake">HIGH RAKE</a>
                    </div>
                    <div class="circulo c1 you " data-target-cell="player1">
                        You
                        <div class="playerScore you" id="player1"> -3 </div>
                    </div>
                    <div class="circulo clickable c2" data-target-cell="player2">
                        <div class="playerScore " id="player2"> 0 </div>
                    </div>
                    <div class="circulo clickable c3" data-target-cell="player3">
                        <div class="playerScore " id="player3"> 0 </div>
                    </div>
                    <div class="circulo clickable c4" data-target-cell="player4">
                        <div class="playerScore " id="player4"> 0 </div>
                    </div>
                    <div class="circulo clickable c5" data-target-cell="player5">
                        <div class="playerScore " id="player5"> 0 </div>
                    </div>
                    <div class="circulo clickable c6" data-target-cell="player6">
                        <div class="playerScore " id="player6"> 0 </div>
                    </div>
                    <div class="circulo clickable c7" data-target-cell="player7">
                        <div class="playerScore " id="player7"> 0 </div>
                    </div>
                    <div class="circulo clickable c8" data-target-cell="player8">
                        <div class="playerScore " id="player8"> 0 </div>
                    </div>
                    <div class="circulo clickable c9" data-target-cell="player9">
                        <div class="playerScore " id="player9"> 0 </div>
                    </div>
                </div>

            </div>
            <div class="resetButton" id="resetButton">
                <a class="btn-primary" onclick="location.reload()">
                    RESET
                </a>
            </div>
            <div id="playerPopup" class="popup">
                <div class="popupTitle">
                    CHOOSE PLAYER
                </div>
                <div id="popupInfo" class="popupInfo">

                    <div class="options">
                        <button class="option" data-value="-5">
                            <img src="<?php echo plugins_url('./img/BestPlayer.svg', __FILE__); ?>">
                            <div class="playerScore playerScoreActive"> -5 </div>
                            Best Player on the Table
                        </button>
                        <button class="option" data-value="-3">
                            <img src="<?php echo plugins_url('./img/SecondBest.svg', __FILE__); ?>">
                            <div class="playerScore playerScoreActive"> -3 </div>
                            Second Best on the Table
                        </button>
                        <button class="option" data-value="-1">
                            <img src="<?php echo plugins_url('./img/TightPlayer.svg', __FILE__); ?>">
                            <div class="playerScore playerScoreActive"> -1 </div>
                            Tight Player who wins
                        </button>
                        <button class="option" data-value="2">
                            <img src="<?php echo plugins_url('./img/TightPlayerLosses.svg', __FILE__); ?>">
                            <div class="playerScore playerScoreActive"> +2 </div>
                            Tight Player who losses
                        </button>
                        <button class="option" data-value="3">
                            <img src="<?php echo plugins_url('./img/RichBusinessmen.svg', __FILE__); ?>">
                            <div class="playerScore playerScoreActive"> +3 </div>
                            Rich Businessmen
                        </button>
                        <button class="option" data-value="4">
                            <img src="<?php echo plugins_url('./img/CrazyGambler.svg', __FILE__); ?>">
                            <div class="playerScore playerScoreActive"> +4 </div>
                            Crazy Gambler
                        </button>
                        <button class="option" data-value="0">
                            <img src="<?php echo plugins_url('./img/EmptySeat.svg', __FILE__); ?>">
                            <div class="playerScore playerScoreActive"> 0 </div>
                            Empty Seat
                        </button>
                    </div>
                    <div class="categories">
                        <button class="category ">YOUNGSTERS</button>
                        <button class="category ">BUSINESSMEN</button>

                    </div>
                </div>
            </div>
            <div class="projections-box" id="projection-box">
                <div class="projectionText">
                    <div> Projections for <span class="projectionBuyIn" id="buyIn"> 1.000 $</span> buy in </div>
                    <div class="editButton"> <a onclick="showSlider()"> Edit </a> </div>

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
                <div> BUY IN </div>
                <input type="range" min="1" max="100" value="1" class="slider" id="miSlider">
                <p>
                    <span> 1k </span>
                    <span> 100k </span>
                </p>
                <p> <span id="valorSlider"> </span></p>
                <a class="confirmButton" onclick="hideSlider()"> Confirm </a>
            </div>
        </div>
        <div class="sideDesktopContainer opaque" id="sideDesktop">
            <div id="playersInfo" class="playersInfo">

                <div class="options2">
                    <button class="option" data-value="-5">
                        <img src="<?php echo plugins_url('./img/BestPlayer.svg', __FILE__); ?>">
                        <div class="playerScore playerScoreActive"> -5 </div>
                        Best Player on the Table
                    </button>
                    <button class="option" data-value="-3">
                        <img src="<?php echo plugins_url('./img/SecondBest.svg', __FILE__); ?>">
                        <div class="playerScore playerScoreActive"> -3 </div>
                        Second Best on the Table
                    </button>
                    <button class="option" data-value="-1">
                        <img src="<?php echo plugins_url('./img/TightPlayer.svg', __FILE__); ?>">
                        <div class="playerScore playerScoreActive"> -1 </div>
                        Tight Player who wins
                    </button>
                    <button class="option" data-value="2">
                        <img src="<?php echo plugins_url('./img/TightPlayerLosses.svg', __FILE__); ?>">
                        <div class="playerScore playerScoreActive"> +2 </div>
                        Tight Player who losses
                    </button>
                    <button class="option" data-value="3">
                        <img src="<?php echo plugins_url('./img/RichBusinessmen.svg', __FILE__); ?>">
                        <div class="playerScore playerScoreActive"> +3 </div>
                        Rich Businessmen
                    </button>
                    <button class="option" data-value="4">
                        <img src="<?php echo plugins_url('./img/CrazyGambler.svg', __FILE__); ?>">
                        <div class="playerScore playerScoreActive"> +4 </div>
                        Crazy Gambler
                    </button>
                    <button class="option" data-value="0">
                        <img src="<?php echo plugins_url('./img/EmptySeat.svg', __FILE__); ?>">
                        <div class="playerScore playerScoreActive"> 0 </div>
                        Empty Seat
                    </button>
                </div>
                <div class="categories">
                    <button class="category">YOUNGSTERS</button>
                    <button class="category">BUSINESSMEN</button>

                </div>
            </div>
        </div>
    </div>
<?php
    return ob_get_clean();
}

add_shortcode( 'poker-table', 'poker_table_func' );
?>
