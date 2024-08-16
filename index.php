<?php
/**
 * Plugin Name: Interactive Poker Table
 * Plugin URI: https://www.hertzios.com
 * Description: Interactive poker table
 * Version: 1.0.2
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
