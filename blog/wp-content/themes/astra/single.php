<?php
/**
 * Custom Single Post Template
 *
 * Layout:
 * 1200px max-width
 * 75% content + comments
 * 25% sidebar
 *
 * @package Astra
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
?>

<style>
/* ================================
   SINGLE POST LAYOUT
================================ */

.single-post-wrapper {
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
	padding: 40px 20px;
	box-sizing: border-box;
}

.single-post-layout {
	display: grid;
	grid-template-columns: 75% 25%;
	gap: 30px;
	align-items: start;
}

/* ================================
   MAIN CONTENT
================================ */

/* =========================================
   SINGLE POST - FULL WIDTH
========================================= */

body.single-post #content,
body.single-post .site-content,
body.single-post .ast-container,
body.single-post #primary {
        width: 100% !important;
    max-width: 100% !important;
    padding: 0px 30px;
	}

body.single-post .ast-container {
    padding-left: 30 !important;
    padding-right: 30 !important;
}

body.single-post #primary {
    margin: 20 !important;
}

/* Your custom content wrapper */
body.single-post .single-post-wrapper {
    width: 100% !important;
    max-width: 100% !important;
    margin: 0 !important;
    padding: 40px 5% !important;
    box-sizing: border-box;
}

/* 75% + 25% */
body.single-post .single-post-layout {
    display: grid;
    grid-template-columns: 75% 25%;
    gap: 30px;
    width: 100%;
}

/* Mobile */
@media (max-width: 768px) {

    body.single-post .single-post-layout {
        grid-template-columns: 1fr;
    }

    body.single-post .single-post-wrapper {
        padding: 30px 20px !important;
    }

}

.single-post-meta {
	margin-bottom: 15px;
	font-size: 14px;
	color: #666;
}

.single-post-category {
	margin-bottom: 10px;
}

.single-post-category a {
	color: #0073aa;
	text-decoration: none;
	font-weight: 600;
}

.single-post-category a:hover {
	text-decoration: underline;
}

.single-post-title {
	margin: 0 0 15px;
	font-size: 40px;
	line-height: 1.2;
	font-weight: 700;
}

.single-post-author {
	margin-bottom: 25px;
	font-size: 14px;
	color: #666;
}

.single-post-author a {
	color: #333;
	font-weight: 600;
	text-decoration: none;
}

.single-post-featured-image {
	margin-bottom: 30px;
}

.single-post-featured-image img {
	display: block;
	width: 100%;
	height: auto;
}

/* Paragraph/content styling */

.single-post-article {
	font-size: 18px;
	line-height: 1.8;
	color: #333;
}

.single-post-article p {
	margin-bottom: 20px;
}

.single-post-article img {
	max-width: 100%;
	height: auto;
}

.single-post-article h2,
.single-post-article h3,
.single-post-article h4 {
	line-height: 1.3;
	margin-top: 30px;
	margin-bottom: 15px;
}

/* ================================
   SIDEBAR
================================ */

.single-post-sidebar {
	min-width: 0;
}

.single-sidebar-widget {
	margin-bottom: 35px;
}

.single-sidebar-widget-title {
	font-size: 20px;
	line-height: 1.3;
	font-weight: 700;
	margin: 0 0 15px;
	padding-bottom: 10px;
	border-bottom: 2px solid #222;
}

/* Search */

.single-post-search form {
	display: flex;
	width: 100%;
}

.single-post-search input[type="search"] {
	width: 100%;
	padding: 10px 12px;
	border: 1px solid #ddd;
	font-size: 15px;
}

.single-post-search button {
	padding: 10px 15px;
	border: 0;
	background: #222;
	color: #fff;
	cursor: pointer;
}

/* Recent Posts */

.single-post-recent-posts ul,
.single-post-categories ul {
	margin: 0;
	padding: 0;
	list-style: none;
}

.single-post-recent-posts li {
	margin-bottom: 12px;
	padding-bottom: 12px;
	border-bottom: 1px solid #eee;
}

.single-post-recent-posts a {
	color: #333;
	text-decoration: none;
	font-size: 15px;
	line-height: 1.5;
}

.single-post-recent-posts a:hover {
	color: #0073aa;
}

/* Categories */

.single-post-categories li {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
	padding-bottom: 10px;
	border-bottom: 1px solid #eee;
}

.single-post-categories a {
	color: #333;
	text-decoration: none;
}

.single-post-categories a:hover {
	color: #0073aa;
}

.single-post-category-count {
	color: #777;
	font-size: 13px;
}

/* ================================
   COMMENTS
================================ */

.single-post-comments {
	margin-top: 50px;
	padding-top: 30px;
	border-top: 1px solid #ddd;
}

/* ================================
   TABLET / MOBILE
================================ */

@media (max-width: 768px) {

	.single-post-wrapper {
		padding: 30px 15px;
	}

	.single-post-layout {
		grid-template-columns: 1fr;
		gap: 40px;
	}

	.single-post-title {
		font-size: 32px;
	}

	.single-post-article {
		font-size: 17px;
	}

	.single-post-sidebar {
		width: 100%;
	}

}

@media (max-width: 480px) {

	.single-post-title {
		font-size: 28px;
	}

	.single-post-wrapper {
		padding-top: 20px;
		padding-bottom: 20px;
	}

}
</style>

<div class="single-post-wrapper">

	<div class="single-post-layout">

		<!-- =================================
		     LEFT COLUMN - 75%
		================================= -->

		<main class="single-post-content">

			<?php
			if ( have_posts() ) :

				while ( have_posts() ) :
					the_post();
					?>

					<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

						<!-- Category -->
						<div class="single-post-category">

							<?php
							$categories = get_the_category();

							if ( ! empty( $categories ) ) {
								foreach ( $categories as $category ) {
									?>
									<a href="<?php echo esc_url( get_category_link( $category->term_id ) ); ?>">
										<?php echo esc_html( $category->name ); ?>
									</a>
									<?php
								}
							}
							?>

						</div>

						<!-- Heading -->
						<h1 class="single-post-title">
							<?php the_title(); ?>
						</h1>

						<!-- Author -->
						<div class="single-post-author">

							By
							<a href="<?php echo esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ); ?>">
								<?php the_author(); ?>
							</a>

							&nbsp; | &nbsp;

							<?php echo esc_html( get_the_date() ); ?>

						</div>

						<!-- Featured Image -->
						<?php if ( has_post_thumbnail() ) : ?>

							<div class="single-post-featured-image">

								<?php
								the_post_thumbnail(
									'full',
									array(
										'alt' => esc_attr( get_the_title() ),
									)
								);
								?>

							</div>

						<?php endif; ?>

						<!-- Post Content -->
						<div class="single-post-article">

							<?php
							the_content();

							wp_link_pages(
								array(
									'before' => '<div class="page-links">',
									'after'  => '</div>',
								)
							);
							?>

						</div>

					</article>

					<!-- Comments -->
					<div class="single-post-comments">

						<?php
						if ( comments_open() || get_comments_number() ) {
							comments_template();
						}
						?>

					</div>

					<?php

				endwhile;

			endif;
			?>

		</main>


		<!-- =================================
		     RIGHT COLUMN - 25%
		================================= -->

		<aside class="single-post-sidebar">

			<!-- SEARCH POST -->
			<div class="single-sidebar-widget single-post-search">

				<h2 class="single-sidebar-widget-title">
					Search Posts
				</h2>

				<form role="search" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>">

					<input
						type="search"
						name="s"
						placeholder="Search posts..."
						value="<?php echo get_search_query(); ?>"
					>

					<button type="submit">
						Search
					</button>

				</form>

			</div>


			<!-- RECENT POSTS -->
			<div class="single-sidebar-widget single-post-recent-posts">

				<h2 class="single-sidebar-widget-title">
					Recent Posts
				</h2>

				<ul>

					<?php
					$recent_posts = new WP_Query(
						array(
							'post_type'           => 'post',
							'posts_per_page'      => 5,
							'post_status'         => 'publish',
							'ignore_sticky_posts' => true,
						)
					);

					if ( $recent_posts->have_posts() ) :

						while ( $recent_posts->have_posts() ) :
							$recent_posts->the_post();
							?>

							<li>
								<a href="<?php the_permalink(); ?>">
									<?php the_title(); ?>
								</a>
							</li>

							<?php
						endwhile;

						wp_reset_postdata();

					else :
						?>

						<li>No recent posts found.</li>

					<?php endif; ?>

				</ul>

			</div>


			<!-- CATEGORIES WITH POST COUNT -->
			<div class="single-sidebar-widget single-post-categories">

				<h2 class="single-sidebar-widget-title">
					Categories
				</h2>

				<ul>

					<?php
					$categories = get_categories(
						array(
							'hide_empty' => true,
							'orderby'    => 'name',
							'order'      => 'ASC',
						)
					);

					if ( ! empty( $categories ) ) :

						foreach ( $categories as $category ) :
							?>

							<li>

								<a href="<?php echo esc_url( get_category_link( $category->term_id ) ); ?>">
									<?php echo esc_html( $category->name ); ?>
								</a>

								<span class="single-post-category-count">
									<?php echo esc_html( $category->count ); ?>
								</span>

							</li>

							<?php
						endforeach;

					else :
						?>

						<li>No categories found.</li>

					<?php endif; ?>

				</ul>

			</div>

		</aside>

	</div>

</div>

<?php get_footer(); ?>
```
