<script>
	import { data, title } from '@data/resume';

	import Chip from '$lib/components/Chip/Chip.svelte';
	import Card from '$lib/components/Card/Card.svelte';
	import CommonPage from '$lib/components/CommonPage.svelte';
</script>

<CommonPage {title}>
	<div class="resume">
		{#if data}
			<a href={data} download>
				<Chip size={'1.25em'}>Download</Chip>
			</a>
		{:else}
			<Card>
				<div class="flex-1 col gap-2 items-stretch">
					<div class="text-[1.3em]">Contact Me</div>
					<div class="text-[var(--accent-text)] text-[0.9em] font-200 mb-2">
						I'm open to discussing new opportunities. Feel free to reach out if you'd like to connect!
					</div>
					<a href="/contact">
						<Chip size={'1.25em'}>Contact Me</Chip>
					</a>
				</div>
			</Card>
		{/if}
	</div>
</CommonPage>

<style lang="scss">
	.resume {
		display: flex;
		justify-content: center;
		margin-top: 20px;

		& > a {
			color: inherit;
		}
	}
</style>
