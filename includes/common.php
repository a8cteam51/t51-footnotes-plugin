<?php

namespace T51\Footnotes\Common;

use function Automattic\Jetpack\Extensions\Gif\register_block;

add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\enqueue_block_editor_assets' );
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\footnote_enqueue_frontend_assets' );
add_action( 'wp_enqueue_style', __NAMESPACE__ . '\footnote_enqueue_styles' );
add_filter( 'the_content', __NAMESPACE__ . '\adjust_footnote_counters' );
/**
 * Retrieve the current plugin version.
 *
 * @return string The current plugin version.
 */
function get_version() {
	return '0.1.0';
}

/**
 * Enqueue assets to be used in the block editor.
 */
function enqueue_block_editor_assets() {
	wp_enqueue_script(
		't51-footnotes-js',
		plugins_url( 'build/index.js', dirname( __FILE__ ) ),
		array(
			'wp-annotations',
			'wp-block-editor',
			'wp-rich-text',
		),
		get_version()
	);

	wp_enqueue_style(
		't51-footnotes-editor-style',
		plugins_url( 'css/editor.css', dirname( __FILE__ ) ),
		array(),
		get_version()
	);
}

/**
 * Enqueue assets on the frontend
 */
function footnote_enqueue_frontend_assets() {
	wp_enqueue_script(
		'footnote-js-frontend',
		plugins_url( 'public/footnote-frontend.js', dirname( __FILE__ ) ),
		array(),
		get_version()
	);
	wp_enqueue_style(
		'footnotes-css-frontend',
		plugins_url( 'public/footnote.css', dirname( __FILE__ ) ),
		array(),
		get_version()
	);
}

/**
 * Filter content to have proper count for footnote markers.
 *
 * For these counts to be correct, the order of footnote markers must
 * match the order of footnotes.
 */
function adjust_footnote_counters( $content ) {
	$return_marker = '<mark>↩</mark>';
	$fn_marker     = '<mark>θ</mark>';

	$i = 1;

	while ( strpos( $content, $return_marker ) !== false ) {
		$content = preg_replace( '/<mark>↩<\/mark>/', $i++, $content, 1 );
	}

	$i = 1;

	while ( strpos( $content, $fn_marker ) !== false ) {
		$content = preg_replace( '/<mark>θ<\/mark>/', $i++, $content, 1 );
	}

	return $content;
}

