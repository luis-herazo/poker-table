<?php
/**
 * Plugin Name: Interactive Poker Table
 * Plugin URI: https://www.hertzios.com
 * Description: Interactive poker table
 * Version: 1.0.4
 * Author: Luis Herazo
 * Author URI: https://www.hertzios.com
 * License: GPLv2 or later
 * Text Domain: Hertzios
 * FAQs: https://www.hertzios.com
 */


function PT_admin_menu()
{
    add_menu_page(
        'PokerTable', /*Page Title*/
        'Poker Table', /*Menu Title*/
        'manage_options', /*Capability*/
        'poker-table', /*Menu Slug*/
        'CargarInfoDashboard', /*Function*/
        'dashicons-table-row-after', /*Icon URL*/
        '10' /*Position*/
    );
}

function CargarInfoDashboard()
{
    include 'core/admin-panel.php';
}

add_action( 'admin_menu', 'PT_admin_menu');


include 'core/interactive-table.php';
include 'core/db.php';

/**
 * Enqueue Bootstrap for the admin panel.
 */
function pt_admin_enqueue_scripts($hook) {
    // Only load on our plugin's admin page
    if ('toplevel_page_poker-table' != $hook) {
        return;
    }
    wp_enqueue_style('pt-bootstrap-css', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
    wp_enqueue_script('pt-bootstrap-js', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js', [], null, true);
}
add_action('admin_enqueue_scripts', 'pt_admin_enqueue_scripts');

register_activation_hook(__FILE__, 'pokerTable_db');

