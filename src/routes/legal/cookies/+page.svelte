<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
</script>

<svelte:head>
	<title>Cookie Policy — Semberija.app</title>
</svelte:head>

<div class="legal-top reveal-card" use:reveal>
	<div class="container">
		<p class="breadcrumb"><a href="/">Semberija.app</a> / Cookie Policy</p>
		<h1>Cookie Policy</h1>
		<p class="updated">Last updated: April, 2026</p>
	</div>
</div>

<div class="legal-body reveal-card" use:reveal>
	<div class="container">
		<article class="legal-content">

			<p class="lead">Semberija.app uses cookies to improve user experience and ensure proper platform functionality. Cookies are small text files stored on a user's device.</p>

			<h2>What Are Cookies</h2>
			<p>Cookies are small text files that are stored on your device when you visit a website. They allow the website to remember your actions and preferences over a period of time, so you do not have to re-enter information every time you visit the site.</p>

			<h2>How We Use Cookies</h2>
			<p>Cookies may be used for:</p>
			<ul>
				<li>Website functionality</li>
				<li>Analytics and performance monitoring</li>
				<li>User preferences</li>
				<li>Security and authentication</li>
			</ul>

			<h2>Types of Cookies</h2>
			<h3>Essential Cookies</h3>
			<p>These cookies are necessary for the platform to function properly. They cannot be disabled as they are required for basic platform operation.</p>
			<h3>Analytics Cookies</h3>
			<p>These cookies help us understand how visitors interact with the platform, allowing us to improve functionality and user experience.</p>
			<h3>Preference Cookies</h3>
			<p>These cookies remember your preferences, such as language selection, to provide a more personalized experience.</p>

			<h2>Managing Cookies</h2>
			<p>Users may disable cookies in their browser settings. Some features of the platform may not function properly if cookies are disabled.</p>
			<p>Instructions for managing cookies can typically be found in your browser's settings or help documentation.</p>

			<h2>Contact</h2>
			<p>For questions about our use of cookies, please contact:</p>
			<p><a href="mailto:info@zoemilano.com">info@zoemilano.com</a></p>

		</article>

		<nav class="legal-nav">
			<h4>Legal Documents</h4>
			<a href="/legal/privacy">Privacy Policy</a>
			<a href="/legal/terms">Terms &amp; Conditions</a>
			<a href="/legal/cookies" class="active">Cookie Policy</a>
			<a href="/legal/gdpr">GDPR Compliance</a>
			<a href="/legal/disclaimer">Disclaimer</a>
		</nav>
	</div>
</div>
