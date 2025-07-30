# Interactive Poker Table - WordPress Plugin

## Descripción

Este es un plugin de WordPress que implementa una mesa de póker interactiva. Su propósito principal es simular y proyectar cuánto ganaría o perdería un jugador de póker en una mesa con diferentes arquetipos de jugadores. Permite a los usuarios configurar la mesa, asignar tipos de jugadores a los asientos y ver proyecciones de ganancias a lo largo del tiempo basadas en la composición de la mesa y el rake.

## Características Principales

*   **Mesa de Póker Interactiva:** Una interfaz visual que representa una mesa de póker de 9 asientos.
*   **Simulación de Ganancias:** Calcula las ganancias/pérdidas esperadas del jugador principal ("You") en función de los oponentes.
*   **Arquetipos de Jugadores:** Varios tipos de jugadores predefinidos con diferentes valores de ganancias/pérdidas esperadas (ej. "Best Player", "Crazy Gambler", "Rich Businessmen").
*   **Configuración de Rake:** Permite ajustar el rake de la mesa entre "Rake Free", "Low Rake" y "High Rake".
*   **Proyecciones a Futuro:** Muestra proyecciones de ganancias para 1 día, 1 mes y 1 año, ajustables según un "buy-in" inicial.
*   **Interfaz Drag-and-Drop:** Permite arrastrar y soltar arquetipos de jugadores en los asientos de la mesa.

## Instalación y Uso

1.  Sube la carpeta `InteractivePokerTable` al directorio `/wp-content/plugins/` de tu instalación de WordPress.
2.  Activa el plugin desde el menú 'Plugins' en el panel de administración de WordPress.
3.  Para mostrar la mesa de póker, añade el siguiente shortcode a cualquier página o entrada:
    ```
    [poker-table]
    ```

## Hoja de Ruta (Futuras Mejoras)

- [ ] Refactorizar el código para cargar los archivos CSS y JavaScript utilizando `wp_enqueue_style` y `wp_enqueue_script`.
- [ ] Utilizar `wp_localize_script` para pasar datos de PHP (como las rutas de las imágenes) a JavaScript de forma segura y eficiente.

- [ ] Mejorar la seguridad validando y escapando todas las entradas y salidas de datos.
