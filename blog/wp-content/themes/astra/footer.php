<?php
/**
 * Custom JOD Business Services Footer
 *
 * @package Astra
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/*
 * IMPORTANT:
 * Close Astra content containers BEFORE custom footer.
 */
astra_content_bottom();
?>
	</div><!-- .ast-container -->
</div><!-- #content -->
<?php
astra_content_after();
?>


<!-- =====================================================
     JOD CUSTOM FOOTER
===================================================== -->

<footer id="jod-footer">

	<div class="jod-footer-main">

		<!-- ================= ABOUT ================= -->

		<div class="jod-footer-about">

			<a href="<?php echo esc_url( home_url( '/' ) ); ?>"
			   class="jod-footer-logo">

				<img
					src="https://jodbs.com/blog/wp-content/uploads/2026/09/white-logo.webp"
					alt="JOD Business Services"
				>

			</a>

			<p>
				A tech-driven digital marketing agency
				helping businesses build sustainable
				visibility across organic, social, and AI-
				powered growth.
			</p>

		</div>


		<!-- ================= SERVICES ================= -->

		<div class="jod-footer-services">

			<h3>SERVICES</h3>

			<div class="jod-services-grid">

				<div class="jod-service-column">

					<a href="#">SEO</a>

					<a href="#">PPC &amp; Google Ads</a>

					<a href="#">Social Media Marketing</a>

					<a href="#">Website Design &amp; Development</a>

					<a href="#">Content Marketing</a>

				</div>

				<div class="jod-service-column">

					<a href="#">Brand Positioning</a>

					<a href="#">Personal Branding</a>

					<a href="#">Video Production</a>

					<a href="#">Influencer Marketing</a>

					<a href="#">AI, Automation &amp; CRM</a>

				</div>

			</div>

		</div>


		<!-- ================= CONTACT ================= -->

		<div class="jod-footer-contact">

			<h3>CONTACT US</h3>

			<p class="jod-contact-address">
				Lakshmi Bhavan, Sundaram Avenue,<br>
				Anna Salai, Chennai,<br>
				Tamil Nadu 600006
			</p>

			<a href="mailto:contact@jodbs.com">
				contact@jodbs.com
			</a>

			<a href="mailto:growth@jodbs.com">
				growth@jodbs.com
			</a>

			<a href="tel:+917395905064">
				+91 73959 05064
			</a>

			<p class="jod-working-hours">
				Mon – Sat, 9:30 AM – 6:30 PM
			</p>

			<div class="jod-social">

				<a href="#" aria-label="LinkedIn">in</a>

				<a href="#" aria-label="Instagram">◎</a>

				<a href="#" aria-label="Facebook">f</a>

			</div>

		</div>

	</div>


	<!-- ================= BOTTOM ================= -->

	<div class="jod-footer-bottom">

		<div class="jod-copyright">
			© <?php echo date( 'Y' ); ?>
			JOD Business Services. All rights reserved.
		</div>

		<div class="jod-footer-legal">

			<a href="/privacy-policy/">
				Privacy Policy
			</a>

			<a href="/terms-conditions/">
				Terms &amp; Conditions
			</a>

		</div>

	</div>

</footer>


<style>

/* =====================================================
   RESET ASTRA WIDTH FOR FOOTER
===================================================== */

#jod-footer {
	width: 100vw !important;
	max-width: none !important;

	margin-left: calc(50% - 50vw) !important;
	margin-right: calc(50% - 50vw) !important;

	background: #10164f;

	color: #ffffff;

	box-sizing: border-box;

	font-family: Arial, Helvetica, sans-serif;

	overflow: hidden;
}


/* =====================================================
   MAIN FOOTER
===================================================== */

.jod-footer-main {

	width: 100%;

	max-width: 1325px;

	margin: 0 auto;

	padding: 72px 30px 55px;

	box-sizing: border-box;

	display: grid;

	grid-template-columns: 1fr 1.7fr 1fr;

	gap: 80px;

	align-items: start;
}


/* =====================================================
   HEADINGS
===================================================== */

.jod-footer-main h3 {

	margin: 0 0 30px;

	color: #ffffff;

	font-size: 18px;

	font-weight: 700;

	line-height: 1.2;

	letter-spacing: 0.3px;
}


/* =====================================================
   LOGO
===================================================== */

.jod-footer-about {

	width: 100%;

	max-width: 380px;
}

.jod-footer-logo {

	display: inline-block;

	margin-bottom: 24px;
}

.jod-footer-logo img {

	display: block;

	width: 190px;

	max-width: 100%;

	height: auto;
}


/* =====================================================
   DESCRIPTION
===================================================== */

.jod-footer-about p {

	margin: 0;

	max-width: 370px;

	color: #999fc4;

	font-size: 17px;

	line-height: 1.65;
}


/* =====================================================
   SERVICES
===================================================== */

.jod-services-grid {

	display: grid;

	grid-template-columns: 1fr 1fr;

	gap: 60px;
}

.jod-service-column {

	display: flex;

	flex-direction: column;

	gap: 20px;
}

.jod-service-column a {

	color: #999fc4;

	font-size: 17px;

	line-height: 1.45;

	text-decoration: none;

	transition: 0.2s ease;
}

.jod-service-column a:hover {

	color: #ffffff;
}


/* =====================================================
   CONTACT
===================================================== */

.jod-footer-contact {

	width: 100%;
}

.jod-contact-address {

	margin: 0 0 22px;

	color: #999fc4;

	font-size: 17px;

	line-height: 1.55;
}

.jod-footer-contact > a {

	display: block;

	margin-bottom: 22px;

	color: #999fc4;

	font-size: 17px;

	line-height: 1.4;

	text-decoration: none;

	white-space: nowrap;
}

.jod-footer-contact > a:hover {

	color: #ffffff;
}

.jod-working-hours {

	margin: 0;

	color: #999fc4;

	font-size: 17px;

	line-height: 1.4;
}


/* =====================================================
   SOCIAL
===================================================== */

.jod-social {

	display: flex;

	gap: 14px;

	margin-top: 27px;
}

.jod-social a {

	width: 45px;

	height: 45px;

	border: 1px solid #30376f;

	border-radius: 50%;

	display: flex;

	align-items: center;

	justify-content: center;

	color: #999fc4;

	font-size: 17px;

	font-weight: 600;

	text-decoration: none;

	transition: 0.2s ease;
}

.jod-social a:hover {

	color: #ffffff;

	border-color: #ffffff;
}


/* =====================================================
   BOTTOM
===================================================== */

.jod-footer-bottom {

	width: 100%;

	max-width: 1325px;

	margin: 0 auto;

	padding: 30px;

	border-top: 1px solid #292f68;

	box-sizing: border-box;

	display: flex;

	align-items: center;

	justify-content: space-between;
}

.jod-copyright {

	color: #898fb6;

	font-size: 15px;
}

.jod-footer-legal {

	display: flex;

	gap: 32px;
}

.jod-footer-legal a {

	color: #898fb6;

	font-size: 15px;

	text-decoration: none;
}

.jod-footer-legal a:hover {

	color: #ffffff;
}


/* =====================================================
   TABLET
===================================================== */

@media (max-width: 1050px) {

	.jod-footer-main {

		grid-template-columns: 1fr 1.5fr;

		gap: 55px;
	}

	.jod-footer-contact {

		grid-column: 2;
	}

}


/* =====================================================
   MOBILE
===================================================== */

@media (max-width: 700px) {

	#jod-footer {

		margin-left: calc(50% - 50vw) !important;

		width: 100vw !important;
	}

	.jod-footer-main {

		grid-template-columns: 1fr;

		padding: 55px 25px 45px;

		gap: 45px;
	}

	.jod-footer-contact {

		grid-column: auto;
	}

	.jod-services-grid {

		grid-template-columns: 1fr;

		gap: 20px;
	}

	.jod-footer-contact > a {

		white-space: normal;
	}

	.jod-footer-bottom {

		padding: 25px;

		flex-direction: column;

		align-items: flex-start;

		gap: 20px;
	}

	.jod-footer-legal {

		flex-wrap: wrap;

		gap: 20px;
	}

}


/* =====================================================
   SMALL MOBILE
===================================================== */

@media (max-width: 450px) {

	.jod-footer-main {

		padding-left: 20px;

		padding-right: 20px;
	}

	.jod-footer-about p,
	.jod-service-column a,
	.jod-contact-address,
	.jod-footer-contact > a,
	.jod-working-hours {

		font-size: 15px;
	}

	.jod-footer-bottom {

		padding-left: 20px;

		padding-right: 20px;
	}

}

</style>


<?php

astra_body_bottom();

wp_footer();

?>

<script>
/* Desktop browsers usually have no mail app registered for mailto:, so open
   Gmail's compose window instead. Touch devices keep the native mailto:. */
document.addEventListener("click", function (e) {
	var link = e.target.closest('a[href^="mailto:"]');
	if (!link || e.defaultPrevented) return;
	if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
	if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;
	var mailto = new URL(link.href);
	var compose = new URLSearchParams({ view: "cm", fs: "1", to: decodeURIComponent(mailto.pathname) });
	var fieldMap = { subject: "su", body: "body", cc: "cc", bcc: "bcc" };
	mailto.searchParams.forEach(function (value, key) {
		var gmailKey = fieldMap[key.toLowerCase()];
		if (gmailKey) compose.set(gmailKey, value);
	});
	e.preventDefault();
	window.open("https://mail.google.com/mail/?" + compose.toString(), "_blank", "noopener");
});
</script>

</body>
</html>