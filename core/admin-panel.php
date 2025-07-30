<?php
/**
 * Admin Panel View - Bootstrap Edition
 */

// Ensure the file is not accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

// --- Form Submission Logic ---
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Verify nonce for security
    if (isset($_POST['poker_table_nonce']) && wp_verify_nonce($_POST['poker_table_nonce'], 'poker_table_update')) {
        global $wpdb;
        $table_name = $wpdb->prefix . 'poker_table';

        // Sanitize and prepare data
        $data = [
            'youngsters_best'   => intval($_POST['youngsters_best']),
            'youngsters_second' => intval($_POST['youngsters_second']),
            'youngsters_tight'  => intval($_POST['youngsters_tight']),
            'businessman_tight' => intval($_POST['businessman_tight']),
            'businessman_rich'  => intval($_POST['businessman_rich']),
            'businessman_crazy' => intval($_POST['businessman_crazy']),
        ];

        // Update the first row (assuming only one row of settings)
        $wpdb->update($table_name, $data, ['id' => 1]);

        // Show a success message
        echo '<div class="alert alert-success mt-3"><strong>Success!</strong> Settings have been saved.</div>';
    }
}

// --- Data Retrieval ---
global $wpdb;
$table_name = $wpdb->prefix . 'poker_table';
$settings = $wpdb->get_row("SELECT * FROM $table_name WHERE id = 1", ARRAY_A);

// Fallback if settings are not found
if (!$settings) {
    $settings = [
        'youngsters_best' => 5, 'youngsters_second' => 3, 'youngsters_tight' => 1,
        'businessman_tight' => -1, 'businessman_rich' => -3, 'businessman_crazy' => -5
    ];
}

?>

<div class="wrap container-fluid my-4">

    <h1 class="mb-4">Interactive Poker Table Settings</h1>

    <div class="card">
        <div class="card-header">
            <h2 class="mb-0">Player Profile Scores</h2>
        </div>
        <div class="card-body">
            <p>These values represent the expected win/loss rate for each player archetype. The player's final score is calculated based on these values.</p>
            
            <form method="POST" action="">
                <?php wp_nonce_field('poker_table_update', 'poker_table_nonce'); ?>
                
                <h5 class="mt-3">Youngsters</h5>
                <div class="row">
                    <div class="col-md-4 mb-3">
                        <label for="youngsters_best" class="form-label">Best Player</label>
                        <input type="number" class="form-control" id="youngsters_best" name="youngsters_best" value="<?php echo esc_attr($settings['youngsters_best']); ?>">
                    </div>
                    <div class="col-md-4 mb-3">
                        <label for="youngsters_second" class="form-label">Second Best</label>
                        <input type="number" class="form-control" id="youngsters_second" name="youngsters_second" value="<?php echo esc_attr($settings['youngsters_second']); ?>">
                    </div>
                    <div class="col-md-4 mb-3">
                        <label for="youngsters_tight" class="form-label">Tight Player (Wins)</label>
                        <input type="number" class="form-control" id="youngsters_tight" name="youngsters_tight" value="<?php echo esc_attr($settings['youngsters_tight']); ?>">
                    </div>
                </div>

                <h5 class="mt-4">Businessmen</h5>
                <div class="row">
                    <div class="col-md-4 mb-3">
                        <label for="businessman_tight" class="form-label">Tight Player (Loses)</label>
                        <input type="number" class="form-control" id="businessman_tight" name="businessman_tight" value="<?php echo esc_attr($settings['businessman_tight']); ?>">
                    </div>
                    <div class="col-md-4 mb-3">
                        <label for="businessman_rich" class="form-label">Rich Businessman</label>
                        <input type="number" class="form-control" id="businessman_rich" name="businessman_rich" value="<?php echo esc_attr($settings['businessman_rich']); ?>">
                    </div>
                    <div class="col-md-4 mb-3">
                        <label for="businessman_crazy" class="form-label">Crazy Gambler</label>
                        <input type="number" class="form-control" id="businessman_crazy" name="businessman_crazy" value="<?php echo esc_attr($settings['businessman_crazy']); ?>">
                    </div>
                </div>

                <hr class="my-4">

                <button type="submit" class="btn btn-primary">Save Settings</button>
            </form>
        </div>
    </div>

    <div class="card mt-4">
        <div class="card-header">
            <h2 class="mb-0">Shortcode</h2>
        </div>
        <div class="card-body">
            <p>To display the interactive poker table, insert the following shortcode into any page or post:</p>
            <code>[poker-table]</code>
        </div>
    </div>

</div>
