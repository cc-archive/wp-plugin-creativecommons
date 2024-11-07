<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @package CC_WordPress_Plugin
 * @subpackage CC
 * @since   v2024.11.1
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * Assets enqueued:
 * 1. blocks.style.build.css - Frontend + Backend.
 * 2. blocks.build.js - Backend.
 * 3. blocks.editor.build.css - Backend.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 */
function cc_block_register_assets() { // phpcs:ignore
	// Register block styles for both frontend + backend.
	wp_register_style(
		'cc-block-style', // Updated Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
		array(), // No dependencies for frontend styles.
		null // Version: File modification time can be added if needed.
	);

	// Register block editor script for backend.
	wp_register_script(
		'cc-block-editor-js', // Updated Handle.
		plugins_url( 'dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Dependencies.
		null, // Version: filemtime if needed.
		true // Enqueue the script in the footer.
	);

	// WP Localized globals. Use dynamic PHP stuff in JavaScript via `ccGlobal` object.
	wp_localize_script(
		'cc-block-editor-js',
		'ccGlobal', // Array containing dynamic data for a JS Global.
		[
			'pluginDirPath' => plugin_dir_path( __DIR__ ),
			'pluginDirUrl'  => plugin_dir_url( __DIR__ ),
		]
	);

	// Register block editor styles for backend.
	wp_register_style(
		'cc-block-editor-css', // Updated Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
		null // Version: File modification time can be added if needed.
	);

	// Register the block with the new namespace.
	register_block_type(
		'cc/cc-by-sa', array( // Updated block name.
			'style'         => 'cc-block-style',
			'editor_script' => 'cc-block-editor-js',
			'editor_style'  => 'cc-block-editor-css',
		)
	);
}

// Hook: Block assets.
add_action( 'init', 'cc_block_register_assets' );

// Register Footer License CSS
function cc_footer_license() {
	wp_enqueue_style('cc-footer-license', plugins_url('./css/cc-footer-license.css', dirname(__FILE__)));
}
add_action('wp_enqueue_scripts', 'cc_footer_license');
