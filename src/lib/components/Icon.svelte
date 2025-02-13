<script context="module" lang="ts">
  import { IconsComplex } from '$lib/utils';

  export const iconKeys = Object.keys(IconsComplex);

  export function getIconAsSvg(icon: string, fillColor: string = 'currentColor'): string {
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="${fillColor}">`
    IconsComplex[icon].forEach(path => {
      svg += `<path d="${path}" />`
    });
    svg += `</svg>`
    return svg;
  }
</script>

<script lang="ts">
  export let icon: string;
  export let fill: string = 'currentColor';
  export let height: string = '16';
  export let width: string = '16';
  export let addClass: string = '';

  let iconData: string[] = ['M0 0H16V16H0Z'];

  if (IconsComplex[icon]) {
    iconData = IconsComplex[icon];
  }
</script>

<svg class="{addClass}" width="{width}" height="{height}" viewBox="0 0 16 16" fill={fill}>
  {#each iconData as path}
    <path d={path} />
  {/each}
</svg>