<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// Load parent environment configuration if available
if (file_exists(dirname(__DIR__) . '/smtp-config.php')) {
    require_once dirname(__DIR__) . '/smtp-config.php';
}

// ** Database settings - loaded from environment variables with safe fallbacks ** //
$dbName = function_exists('jod_env') ? (jod_env('DB_NAME') ?: 'jodbs') : 'jodbs';
$dbUser = function_exists('jod_env') ? (jod_env('DB_USER') ?: 'jodbs') : 'jodbs';
$dbPassword = function_exists('jod_env') ? (jod_env('DB_PASSWORD') ?: '78]9+J&wh^Qjv)n&') : '78]9+J&wh^Qjv)n&';
$dbHost = function_exists('jod_env') ? (jod_env('DB_HOST') ?: 'localhost') : 'localhost';

/** The name of the database for WordPress */
define( 'DB_NAME', $dbName );

/** Database username */
define( 'DB_USER', $dbUser );

/** Database password */
define( 'DB_PASSWORD', $dbPassword );

/** Database hostname */
define( 'DB_HOST', $dbHost );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '4K8x!9mQ@pL2#vR7$zT5%wY1^uI3&oP0*sD6(fG8)hJ4_kL7+zX9-cM1=bN3~qW5' );
define( 'SECURE_AUTH_KEY',  '9vP3#kL7@zX9$rT5%wY1^uI3&oM0*sD6(fG8)hJ4_4K8x!mQ2-cM1=bN3~qW5+vR8' );
define( 'LOGGED_IN_KEY',    'xM1=bN3~qW5+vR84K8x!9mQ@pL2#kL7$zT5%wY1^uI3&oP0*sD6(fG8)hJ4_zX9-c' );
define( 'NONCE_KEY',        'hJ4_zX9-cM1=bN3~qW5+vR84K8x!9mQ@pL2#kL7$zT5%wY1^uI3&oP0*sD6(fG8)' );
define( 'AUTH_SALT',        'uI3&oP0*sD6(fG8)hJ4_zX9-cM1=bN3~qW5+vR84K8x!9mQ@pL2#kL7$zT5%wY1^' );
define( 'SECURE_AUTH_SALT', 'sD6(fG8)hJ4_zX9-cM1=bN3~qW5+vR84K8x!9mQ@pL2#kL7$zT5%wY1^uI3&oP0*' );
define( 'LOGGED_IN_SALT',   'bN3~qW5+vR84K8x!9mQ@pL2#kL7$zT5%wY1^uI3&oP0*sD6(fG8)hJ4_zX9-cM1=' );
define( 'NONCE_SALT',       '9mQ@pL2#kL7$zT5%wY1^uI3&oP0*sD6(fG8)hJ4_zX9-cM1=bN3~qW5+vR84K8x!' );
/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
