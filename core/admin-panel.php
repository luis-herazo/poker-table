
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" ></script>
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">

<!doctype html>
<html lang="en">
  <main role="main" class="inner cover">
    <br/>
    <h1 class="cover-heading">Interactive Poker Table </h1>
    <p class="lead">Success vs loss prediction tool according to starting context. Use the shortcodes described to insert the table. </p>

    <h4>Plugin info</h4>
    <p> Version 1.0.0 </p>
    <p> 6 different player profiles with a score assigned by default for each one. </p>
    <br>
    <br>
      <h4 class="mb-3">Shortcodes</h4>
      <div class="table-responsive">
            <table class="table table-striped table-sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Code</th>
                  <th>Descripción</th>
                  <th>-</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>[poker-table]</td>
                  <td>Interactive poker table</td>
                  <td></td>
                </tr>
                
              </tbody>
            </table>
      </div>

      <hr/>
     

  </main>
</html>

<?php
  add_action( 'save_default_data', 'save_default_data_table' );
  function save_default_data_table(){
      // Verificar si la solicitud proviene del formulario del plugin
    if (!isset($_POST['action']) || $_POST['action'] !== 'save_default_data_table') {
      wp_die('Acceso no autorizado');
    }

    // Verificar permisos
    if (!current_user_can('manage_options')) {
      wp_die('No tienes permisos para realizar esta acción');
    }

    $tabla_name = 'poker_table';
    // Verificar si la tabla de datos existe en la base de datos
    global $wpdb;
    $tabla_datos = $wpdb->prefix . 'mi_plugin_datos'; // Nombre de la tabla personalizada
    $existe_tabla = $wpdb->get_var("SHOW TABLES LIKE '$tabla_name'");


    if ($existe_tabla) {
      // Mostrar datos guardados en la base de datos
      $resultados = $wpdb->get_results("SELECT * FROM $tabla_name");

      if ($resultados) {
          echo '<h3>Datos guardados</h3>';
          echo '<ul>';
          foreach ($resultados as $resultado) {
              echo '<li>' . $resultado->dato1 . ' - ' . $resultado->dato2 . '</li>';
              // Repite para los demás campos del formulario
          }
          echo '</ul>';
      }
  }

  }

?>


