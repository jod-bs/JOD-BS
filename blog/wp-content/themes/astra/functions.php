<?php
/**
 * Astra functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Astra
 * @since 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Define Constants
 */
define( 'ASTRA_THEME_VERSION', '4.13.11' );
define( 'ASTRA_THEME_SETTINGS', 'astra-settings' );
define( 'ASTRA_THEME_DIR', trailingslashit( get_template_directory() ) );
define( 'ASTRA_THEME_URI', trailingslashit( esc_url( get_template_directory_uri() ) ) );
define( 'ASTRA_THEME_ORG_VERSION', file_exists( ASTRA_THEME_DIR . 'inc/w-org-version.php' ) );

/**
 * Minimum Version requirement of the Astra Pro addon.
 */
define( 'ASTRA_EXT_MIN_VER', '4.12.0' );

/**
 * Load in-house compatibility.
 */
if ( ASTRA_THEME_ORG_VERSION ) {
	require_once ASTRA_THEME_DIR . 'inc/w-org-version.php';
}

/**
 * Setup helper functions of Astra.
 */
require_once ASTRA_THEME_DIR . 'inc/core/class-astra-theme-options.php';
require_once ASTRA_THEME_DIR . 'inc/core/class-theme-strings.php';
require_once ASTRA_THEME_DIR . 'inc/core/common-functions.php';
require_once ASTRA_THEME_DIR . 'inc/core/class-astra-icons.php';

define( 'ASTRA_WEBSITE_BASE_URL', 'https://wpastra.com' );

/**
 * Update theme
 */
require_once ASTRA_THEME_DIR . 'inc/theme-update/astra-update-functions.php';
require_once ASTRA_THEME_DIR . 'inc/theme-update/class-astra-theme-background-updater.php';

/**
 * Fonts Files
 */
require_once ASTRA_THEME_DIR . 'inc/customizer/class-astra-font-families.php';

if ( is_admin() ) {
	require_once ASTRA_THEME_DIR . 'inc/customizer/class-astra-fonts-data.php';
}

require_once ASTRA_THEME_DIR . 'inc/lib/webfont/class-astra-webfont-loader.php';
require_once ASTRA_THEME_DIR . 'inc/lib/docs/class-astra-docs-loader.php';
require_once ASTRA_THEME_DIR . 'inc/customizer/class-astra-fonts.php';

require_once ASTRA_THEME_DIR . 'inc/dynamic-css/custom-menu-old-header.php';
require_once ASTRA_THEME_DIR . 'inc/dynamic-css/container-layouts.php';
require_once ASTRA_THEME_DIR . 'inc/dynamic-css/astra-icons.php';
require_once ASTRA_THEME_DIR . 'inc/core/class-astra-walker-page.php';
require_once ASTRA_THEME_DIR . 'inc/core/class-astra-enqueue-scripts.php';
require_once ASTRA_THEME_DIR . 'inc/core/class-gutenberg-editor-css.php';
require_once ASTRA_THEME_DIR . 'inc/core/class-astra-wp-editor-css.php';
require_once ASTRA_THEME_DIR . 'inc/core/class-astra-command-palette.php';
require_once ASTRA_THEME_DIR . 'inc/dynamic-css/block-editor-compatibility.php';
require_once ASTRA_THEME_DIR . 'inc/dynamic-css/inline-on-mobile.php';
require_once ASTRA_THEME_DIR . 'inc/dynamic-css/content-background.php';
require_once ASTRA_THEME_DIR . 'inc/dynamic-css/dark-mode.php';
require_once ASTRA_THEME_DIR . 'inc/class-astra-dynamic-css.php';
require_once ASTRA_THEME_DIR . 'inc/class-astra-global-palette.php';

/**
 * Enable NPS Survey
 */
if (
	! defined( 'ASTRA_SITES_VER' ) ||
	version_compare( ASTRA_SITES_VER, '4.3.7', '<' ) ||
	version_compare( ASTRA_SITES_VER, '4.4.4', '>' )
) {
	require_once ASTRA_THEME_DIR . 'inc/lib/class-astra-nps-notice.php';
	require_once ASTRA_THEME_DIR . 'inc/lib/class-astra-nps-survey.php';
}

/**
 * Custom template tags for this theme.
 */
require_once ASTRA_THEME_DIR . 'inc/core/class-astra-attr.php';
require_once ASTRA_THEME_DIR . 'inc/template-tags.php';

require_once ASTRA_THEME_DIR . 'inc/widgets.php';
require_once ASTRA_THEME_DIR . 'inc/core/theme-hooks.php';
require_once ASTRA_THEME_DIR . 'inc/admin-functions.php';
require_once ASTRA_THEME_DIR . 'inc/class-astra-memory-limit-notice.php';
require_once ASTRA_THEME_DIR . 'inc/core/sidebar-manager.php';

/**
 * Markup Functions
 */
require_once ASTRA_THEME_DIR . 'inc/markup-extras.php';
require_once ASTRA_THEME_DIR . 'inc/extras.php';
require_once ASTRA_THEME_DIR . 'inc/blog/blog-config.php';
require_once ASTRA_THEME_DIR . 'inc/blog/blog.php';
require_once ASTRA_THEME_DIR . 'inc/blog/single-blog.php';

/**
 * Markup Files
 */
require_once ASTRA_THEME_DIR . 'inc/template-parts.php';
require_once ASTRA_THEME_DIR . 'inc/class-astra-loop.php';
require_once ASTRA_THEME_DIR . 'inc/class-astra-mobile-header.php';

/**
 * Functions and definitions.
 */
require_once ASTRA_THEME_DIR . 'inc/class-astra-after-setup-theme.php';

/**
 * Required files.
 */
require_once ASTRA_THEME_DIR . 'inc/core/class-astra-admin-helper.php';

require_once ASTRA_THEME_DIR . 'inc/schema/class-astra-schema.php';

/**
 * Setup API
 */
require_once ASTRA_THEME_DIR . 'admin/includes/class-astra-learn.php';
require_once ASTRA_THEME_DIR . 'admin/includes/class-astra-api-init.php';

if ( is_admin() ) {

	/**
	 * Admin Menu Settings
	 */
	require_once ASTRA_THEME_DIR . 'inc/core/class-astra-admin-settings.php';
	require_once ASTRA_THEME_DIR . 'admin/class-astra-admin-loader.php';
	require_once ASTRA_THEME_DIR . 'inc/lib/astra-notices/class-bsf-admin-notices.php';
}

/**
 * BSF Analytics.
 */
require_once ASTRA_THEME_DIR . 'admin/class-astra-bsf-analytics.php';

/**
 * Metabox additions.
 */
require_once ASTRA_THEME_DIR . 'inc/metabox/class-astra-meta-boxes.php';
require_once ASTRA_THEME_DIR . 'inc/metabox/class-astra-meta-box-operations.php';
require_once ASTRA_THEME_DIR . 'inc/metabox/class-astra-elementor-editor-settings.php';

/**
 * Customizer additions.
 */
require_once ASTRA_THEME_DIR . 'inc/customizer/class-astra-customizer.php';

/**
 * Astra Modules.
 */
require_once ASTRA_THEME_DIR . 'inc/modules/posts-structures/class-astra-post-structures.php';
require_once ASTRA_THEME_DIR . 'inc/modules/related-posts/class-astra-related-posts.php';

/**
 * Compatibility
 */
require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-gutenberg.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-jetpack.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/woocommerce/class-astra-woocommerce.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/edd/class-astra-edd.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/lifterlms/class-astra-lifterlms.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/learndash/class-astra-learndash.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-beaver-builder.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-bb-ultimate-addon.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-contact-form-7.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-visual-composer.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-site-origin.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-gravity-forms.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-bne-flyout.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-ubermeu.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-divi-builder.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-amp.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-yoast-seo.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/surecart/class-astra-surecart.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-starter-content.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-buddypress.php';
require_once ASTRA_THEME_DIR . 'inc/addons/transparent-header/class-astra-ext-transparent-header.php';
require_once ASTRA_THEME_DIR . 'inc/addons/breadcrumbs/class-astra-breadcrumbs.php';
require_once ASTRA_THEME_DIR . 'inc/addons/scroll-to-top/class-astra-scroll-to-top.php';
require_once ASTRA_THEME_DIR . 'inc/addons/heading-colors/class-astra-heading-colors.php';
require_once ASTRA_THEME_DIR . 'inc/builder/class-astra-builder-loader.php';

/**
 * Elementor Compatibility
 */
if ( version_compare( PHP_VERSION, '5.4', '>=' ) ) {

	require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-elementor.php';
	require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-elementor-pro.php';
	require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-web-stories.php';
}

/**
 * Beaver Themer compatibility
 */
if ( version_compare( PHP_VERSION, '5.3', '>=' ) ) {

	require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-beaver-themer.php';
}

require_once ASTRA_THEME_DIR . 'inc/core/markup/class-astra-markup.php';

/**
 * Abilities API integration.
 */
require_once ASTRA_THEME_DIR . 'inc/abilities/bootstrap.php';

/**
 * Load deprecated functions
 */
require_once ASTRA_THEME_DIR . 'inc/core/deprecated/deprecated-filters.php';
require_once ASTRA_THEME_DIR . 'inc/core/deprecated/deprecated-hooks.php';
require_once ASTRA_THEME_DIR . 'inc/core/deprecated/deprecated-functions.php';


/**
 * =========================================================
 * JOD BUSINESS SERVICES - CUSTOM LOGO
 * =========================================================
 *
 * This replaces:
 * JOD Business Services
 *
 * with:
 * Logo Image
 *
 * Logo is clickable and goes to Home Page.
 * =========================================================
 */

// add_filter( 'astra_site_title', 'jod_business_custom_logo' );

// function jod_business_custom_logo( $site_title ) {

// 	$logo_url = 'https://jodbs.com/blog/wp-content/uploads/2026/09/black-logo-1.webp';

// 	return '<img
// 		src="' . esc_url( $logo_url ) . '"
// 		alt="JOD Business Services"
// 		class="jod-header-logo"
// 		style="width:150px; height:auto; max-width:250px;"
// 	>';
// }

/**
 * JOD BUSINESS SERVICES - CUSTOM LOGO
 */
add_filter( 'astra_site_title', 'jod_business_custom_logo' );

function jod_business_custom_logo( $site_title ) {
	$logo_url = 'https://jodbs.com/blog/wp-content/uploads/2026/09/black-logo-1.webp';
	return '<img
		src="' . esc_url( $logo_url ) . '"
		alt="JOD Business Services"
		class="jod-header-logo"
		style="width:150px; height:auto; max-width:250px;"
	>';
}

/**
 * Fix mobile hamburger menu.
 *
 * Live HTML was outputting a broken <header=""> without id="masthead" / class="site-header".
 * Astra's frontend.js only toggles menus under "#masthead > #ast-mobile-header", so the
 * hamburger click did nothing. Rebuild header attributes safely (no wp_kses_post on attrs).
 */
remove_action( 'astra_header', 'astra_header_markup' );
add_action( 'astra_header', 'jod_astra_header_markup' );

function jod_astra_header_markup() {
	do_action( 'astra_header_markup_before' );

	$attributes = apply_filters(
		'astra_attr_header',
		array(
			'id'    => 'masthead',
			'class' => implode( ' ', astra_get_header_classes() ),
		),
		'header',
		array()
	);

	// Always keep the selectors Astra's mobile menu JS depends on.
	$attributes['id'] = 'masthead';
	if ( empty( $attributes['class'] ) ) {
		$attributes['class'] = 'site-header';
	} elseif ( false === strpos( $attributes['class'], 'site-header' ) ) {
		$attributes['class'] = 'site-header ' . $attributes['class'];
	}

	echo '<header';
	foreach ( $attributes as $key => $value ) {
		if ( true === $value ) {
			echo ' ' . esc_attr( $key );
			continue;
		}
		if ( '' === $value || null === $value || false === $value ) {
			continue;
		}
		echo ' ' . esc_attr( $key ) . '="' . esc_attr( $value ) . '"';
	}
	echo '>';

	astra_masthead_top();
	astra_masthead();
	astra_masthead_bottom();

	do_action( 'astra_sticky_header_markup' );
	do_action( 'astra_bottom_header_after_markup' );

	echo '</header><!-- #masthead -->';

	do_action( 'astra_header_markup_after' );
}

/**
 * Keep the mobile dropdown menu above blog cards / page content.
 */
add_action( 'wp_head', 'jod_mobile_menu_stacking_css', 99 );

function jod_mobile_menu_stacking_css() {
	?>
	<style id="jod-mobile-menu-stacking">
		#masthead.site-header,
		#ast-mobile-header,
		.ast-mobile-header-wrap,
		.ast-header-break-point #ast-mobile-header .ast-main-header-wrap,
		.ast-header-break-point #ast-mobile-header .main-header-bar-wrap {
			position: relative;
			z-index: 10000;
			overflow: visible;
		}

		.ast-header-break-point #ast-mobile-header .ast-mobile-header-content,
		.ast-header-break-point #ast-mobile-header .main-header-bar-navigation.toggle-on,
		.ast-header-break-point.ast-main-header-nav-open #ast-mobile-header .ast-mobile-header-content {
			position: relative;
			z-index: 10001;
			overflow: visible;
			background: #ffffff;
			box-shadow: 0 12px 28px rgba(15, 23, 42, 0.12);
		}

		.ast-header-break-point #ast-mobile-header .ast-mobile-header-content .main-header-bar-navigation,
		.ast-header-break-point #ast-mobile-header .ast-mobile-header-content .main-navigation,
		.ast-header-break-point #ast-mobile-header .ast-mobile-header-content .main-header-menu {
			position: relative;
			z-index: 10002;
			background: #ffffff;
		}

		/* Prevent blog cards / content from covering the open mobile menu */
		.ast-header-break-point #content,
		.ast-header-break-point #content.site-content,
		.ast-header-break-point #primary,
		.ast-header-break-point .site-main,
		.ast-header-break-point article,
		.ast-header-break-point .ast-article-post {
			position: relative;
			z-index: 1;
		}

		body.ast-main-header-nav-open.ast-header-break-point #content {
			pointer-events: none;
		}

		body.ast-main-header-nav-open.ast-header-break-point #ast-mobile-header,
		body.ast-main-header-nav-open.ast-header-break-point #ast-mobile-header a.menu-link,
		body.ast-main-header-nav-open.ast-header-break-point #ast-mobile-header .ast-menu-toggle,
		body.ast-main-header-nav-open.ast-header-break-point #ast-mobile-header .main-header-menu-toggle {
			pointer-events: auto;
		}

		.ast-header-break-point #ast-mobile-header .sub-menu {
			background: #ffffff;
		}
	</style>
	<?php
}

/**
 * Reliable mobile menu: open/close, submenu expand, and real page navigation.
 * Needed because broken <header> markup breaks Astra's built-in handlers.
 */
add_action( 'wp_footer', 'jod_mobile_menu_toggle_fallback', 99 );

function jod_mobile_menu_toggle_fallback() {
	?>
	<script>
	(function () {
		function getMobileHeader() {
			return document.getElementById('ast-mobile-header');
		}

		function isSafeUrl(href) {
			if (!href) return false;
			try {
				var url = new URL(href, window.location.href);
				return url.protocol === 'http:' || url.protocol === 'https:';
			} catch (e) {
				return false;
			}
		}

		function isEmptyHash(href) {
			if (!href) return true;
			var trimmed = String(href).trim();
			return trimmed === '' || trimmed === '#' || trimmed === '/#' || /#$/.test(trimmed);
		}

		function setMenuOpen(open) {
			var mobileHeader = getMobileHeader();
			if (!mobileHeader) return;
			var btn = mobileHeader.querySelector('.main-header-menu-toggle');
			var content = mobileHeader.querySelector('.ast-mobile-header-content');
			var nav = mobileHeader.querySelector('.main-header-bar-navigation');

			if (btn) {
				btn.classList.toggle('toggled', open);
				btn.setAttribute('aria-expanded', open ? 'true' : 'false');
			}
			document.body.classList.toggle('ast-main-header-nav-open', open);
			if (content) content.style.display = open ? 'block' : '';
			if (nav) {
				nav.classList.toggle('toggle-on', open);
				nav.style.display = open ? 'block' : '';
			}
		}

		function collapseSiblingSubmenus(item) {
			var parentList = item.parentElement;
			if (!parentList) return;
			parentList.querySelectorAll(':scope > .menu-item-has-children').forEach(function (sibling) {
				if (sibling === item) return;
				sibling.classList.remove('ast-submenu-expanded');
				var sub = sibling.querySelector(':scope > .sub-menu, :scope > .children');
				if (sub) sub.style.display = 'none';
				var toggle = sibling.querySelector(':scope > .ast-menu-toggle, :scope > .menu-link');
				if (toggle) toggle.setAttribute('aria-expanded', 'false');
			});
		}

		function toggleSubmenu(item) {
			var sub = item.querySelector(':scope > .sub-menu, :scope > .children');
			if (!sub) return;
			var open = !item.classList.contains('ast-submenu-expanded');
			collapseSiblingSubmenus(item);
			item.classList.toggle('ast-submenu-expanded', open);
			sub.style.display = open ? 'block' : 'none';
			item.querySelectorAll(':scope > .ast-menu-toggle, :scope > .menu-link').forEach(function (el) {
				el.setAttribute('aria-expanded', open ? 'true' : 'false');
			});
		}

		// Repair missing masthead id/class so Astra selectors can still match.
		document.addEventListener('DOMContentLoaded', function () {
			var mobile = getMobileHeader();
			var desktop = document.getElementById('ast-desktop-header');
			var wrapper = document.getElementById('masthead');

			if (!wrapper && (mobile || desktop)) {
				wrapper = document.createElement('header');
				wrapper.id = 'masthead';
				wrapper.className = 'site-header';
				var page = document.getElementById('page');
				var first = desktop || mobile;
				if (page && first && first.parentNode === page) {
					page.insertBefore(wrapper, first);
					if (desktop) wrapper.appendChild(desktop);
					if (mobile) wrapper.appendChild(mobile);
				}
			} else if (wrapper) {
				if (!wrapper.id) wrapper.id = 'masthead';
				if (!wrapper.classList.contains('site-header')) wrapper.classList.add('site-header');
			}
		});

		document.addEventListener('click', function (event) {
			var mobileHeader = getMobileHeader();
			if (!mobileHeader) return;

			var toggleBtn = event.target.closest('.main-header-menu-toggle');
			if (toggleBtn && mobileHeader.contains(toggleBtn)) {
				event.preventDefault();
				event.stopImmediatePropagation();
				setMenuOpen(!toggleBtn.classList.contains('toggled'));
				return;
			}

			var menuLink = event.target.closest('#ast-mobile-header a.menu-link');
			var submenuToggle = event.target.closest('#ast-mobile-header .ast-menu-toggle');
			if (!menuLink && !submenuToggle) return;
			if (!mobileHeader.contains(menuLink || submenuToggle)) return;

			var item = (menuLink || submenuToggle).closest('.menu-item');
			if (!item) return;

			// Submenu arrow / parent expand control.
			if (submenuToggle || (menuLink && item.classList.contains('menu-item-has-children') && isEmptyHash(menuLink.getAttribute('href')))) {
				event.preventDefault();
				event.stopImmediatePropagation();
				toggleSubmenu(item);
				return;
			}

			// Real destination links: navigate securely.
			if (menuLink) {
				var href = menuLink.getAttribute('href');
				if (!isSafeUrl(href) || isEmptyHash(href)) {
					event.preventDefault();
					return;
				}
				event.preventDefault();
				event.stopImmediatePropagation();
				window.location.assign(new URL(href, window.location.href).href);
			}
		}, true);
	})();
	</script>
	<?php
}