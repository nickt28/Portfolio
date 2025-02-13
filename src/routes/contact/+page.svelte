<script lang="ts">
  import { title } from '@data/contact';
  import { onMount, onDestroy } from 'svelte';
  import { fly } from 'svelte/transition';
  import { enhance } from '$app/forms';
  
  import CommonPage from '$lib/components/CommonPage.svelte';
  import Icon from '$lib/components/Icon.svelte';

  let disableSubmit = true;
  let form: HTMLFormElement = {} as HTMLFormElement;
  let showNotification = false;

  let timeout: ReturnType<typeof setTimeout>;
  const handleEnhance = () => {
    return ({ result }: { result: any }) => {
      if (result.type === 'success') {
        form.reset();
        showNotification = true;
        disableSubmit = true;
        timeout = setTimeout(() => { showNotification = false; disableSubmit = false; }, 5000);
      }
    };
  };

  onMount(() => {
    setTimeout(() => disableSubmit = false, 3500);
  });

  onDestroy(() => {
    clearTimeout(timeout);
  });
</script>

<CommonPage {title}>
  <div class="flex flex-col m-auto w-full max-w-md">
    <h1 class="text-3xl font-medium mb-2">Send me a message</h1>
    <p class="mb-4">I will get back to you as soon as possible.</p>
    <form use:enhance={handleEnhance} bind:this={form} method="POST" class="flex flex-col items-center w-full max-w-md">
      <input type="email" name="email" maxlength="50" autocomplete="email" placeholder="Email address" class="shadow-sm border border-solid focus:border-blue-400 text-sm rounded-md focus:ring-primary-500 block w-full p-2.5 mb-4 focus:outline-none" required>
      <input type="text" name="subject" maxlength="50" placeholder="Subject" class="shadow-sm border border-solid focus:border-blue-400 text-sm rounded-md focus:ring-primary-500 block w-full p-2.5 mb-4 focus:outline-none" required>
      <textarea name="message" maxlength="3000" placeholder="What's on your mind?" rows="6" class="block p-2.5 w-full text-sm border border-solid focus:border-blue-400 rounded-md shadow-sm mb-4 focus:outline-none" required></textarea>
      <button disabled={disableSubmit} type="submit" class="disabled:opacity-90 disabled:cursor-not-allowed cursor-pointer w-full flex items-center justify-center py-3 px-8 text-md font-medium text-center rounded-xl border border-solid transition-all active:scale-95 duration-200">
        <Icon icon="Send" addClass="w-4 h-4 mr-2" />
        Send Message
      </button>
    </form>
  </div>
  
  {#if showNotification}
  <div in:fly="{{ y: 50, duration: 300 }}" out:fly="{{ y: 50, duration: 300 }}" class="fixed z-50 left-0 right-0 bottom-10 flex justify-center">
    <button on:click={() => showNotification = false} class="cursor-pointer border border-solid px-6 py-3 rounded-lg max-w-md mx-4 flex items-center gap-2">
      <Icon icon="PatchCheckFill" addClass="text-blue-600 h-5 w-5 mr-1 flex-shrink-0" />
      <p class="md:text-lg">Your message has been sent.</p>
    </button>
  </div>
  {/if}
</CommonPage>