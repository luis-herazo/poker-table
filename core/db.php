<?php
/**
 * Database setup for Interactive Poker Table.
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

/**
 * Creates the custom database table on plugin activation.
 * Also inserts a default row of data if the table is empty.
 */
function pokerTable_db() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'poker_table';
    $charset_collate = $wpdb->get_charset_collate();

    // SQL to create the table
    $sql = "CREATE TABLE $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        rake INT NOT NULL DEFAULT 5,
        youngsters_best INT NOT NULL DEFAULT 5,
        youngsters_second INT NOT NULL DEFAULT 3,
        youngsters_tight INT NOT NULL DEFAULT 1,
        businessman_tight INT NOT NULL DEFAULT -1,
        businessman_rich INT NOT NULL DEFAULT -3,
        businessman_crazy INT NOT NULL DEFAULT -5,
        PRIMARY KEY (id)
    ) $charset_collate;";

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);

    // Check if the table is empty
    $row_count = $wpdb->get_var("SELECT COUNT(*) FROM $table_name");

    // If the table is empty, insert a default row
    if ($row_count == 0) {
        $wpdb->insert(
            $table_name,
            [
                'rake' => 5,
                'youngsters_best' => 5,
                'youngsters_second' => 3,
                'youngsters_tight' => 1,
                'businessman_tight' => -1,
                'businessman_rich' => -3,
                'businessman_crazy' => -5,
            ],
            [
                '%d', '%d', '%d', '%d', '%d', '%d', '%d'
            ]
        );
    }
}
