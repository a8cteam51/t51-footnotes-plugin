<?php
/**
 * Plugin Name: Team51 Footnotes
 * Plugin URI:  https://github.com/a8cteam51/team51-footnotes
 * Description: Footnotes for posts.
 * Author:      WordPress.com Special Projects Team
 * Author URI:  https://wpspecialprojects.wordpress.com
 * Domain Path: /languages
 * Version:     0.0.1
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

// This plugin, like WordPress, requires PHP 5.6 and higher.
if ( version_compare( PHP_VERSION, '5.6', '<' ) ) {
	add_action( 'admin_notices', 't51_footnotes_admin_notice' );
	/**
	 * Display an admin notice if PHP is not 5.6.
	 */
	function t51_footnotes_admin_notice() {
		echo '<div class=\"error\"><p>';
		echo __( "The Team 51 Footnotes plugin requires PHP 5.6 to function properly. Please upgrade PHP or deactivate the plugin.", 't51-footnotes' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		echo '</p></div>';
	}

	return;
}

require_once __DIR__ . '/includes/common.php';
