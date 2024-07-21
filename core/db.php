<?php

register_activation_hook( __FILE__, 'pokerTable_db' );

function pokerTable_db(){

    $tabla_datos = 'poker_table';
    global $wpdb;
    $tabla_datos = $wpdb->prefix . $tabla_datos; // Nombre de la tabla personalizada

    // Verificar si la tabla ya existe
    if ($wpdb->get_var("SHOW TABLES LIKE '$tabla_datos'") != $tabla_datos) {
        // Crear la tabla si no existe
        $charset_collate = $wpdb->get_charset_collate();
        $sql = "CREATE TABLE $tabla_datos (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            rake INT NOT NULL,
            youngsters_best INT NOT NULL,
            youngsters_second INT NOT NULL,
            youngsters_tight INT NOT NULL,
            businessman_tight INT NOT NULL,
            businessman_rich INT NOT NULL,
            businessman_crazy INT NOT NULL,
            
            PRIMARY KEY (id)
        ) $charset_collate;";

        require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        dbDelta($sql);
    }
}

?>