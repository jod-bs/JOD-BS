<?php
/**
 * The header for Astra Theme.
 *
 * @package Astra
 * @since 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

?><!DOCTYPE html>

<?php astra_html_before(); ?>

<html <?php language_attributes(); ?>>

<head>

<?php astra_head_top(); ?>

<meta charset="<?php bloginfo( 'charset' ); ?>">

<meta name="viewport" content="width=device-width, initial-scale=1">

<?php if ( ! has_site_icon() ) : ?>
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="192x192" href="/images/favicon-192x192.png">
<link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png">
<?php endif; ?>

<?php
if ( apply_filters( 'astra_header_profile_gmpg_link', true ) ) {
	?>
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<?php
}
?>

<?php wp_head(); ?>

<?php astra_head_bottom(); ?>

</head>


<body
	<?php astra_schema_body(); ?>
	<?php body_class(); ?>
>

<?php astra_body_top(); ?>

<?php wp_body_open(); ?>


<a
	class="skip-link screen-reader-text"
	href="#content"
>
	<?php
	echo esc_html(
		astra_default_strings(
			'string-header-skip-link',
			false
		)
	);
	?>
</a>


<div
	<?php
	echo wp_kses_post(
		astra_attr(
			'site',
			array(
				'id'    => 'page',
				'class' => 'hfeed site',
			)
		)
	);
	?>


	<?php
	/**
	 * =====================================================
	 * ASTRA HEADER
	 *
	 * Logo + Menu will come from Astra.
	 * =====================================================
	 */

	astra_header_before();

	astra_header();

	astra_header_after();


	astra_content_before();
	?>


	<div id="content" class="site-content">

		<div class="ast-container">

			<?php astra_content_top(); ?>