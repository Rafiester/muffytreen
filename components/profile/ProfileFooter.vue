<script setup lang="ts">
defineProps<{
  name: string;
  isRetro: boolean;
}>();

const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="text-center mt-auto px-4 z-10 relative">
    <p 
      :class="[
        'text-[11px] uppercase tracking-widest opacity-60',
        isRetro ? 'font-mono text-black font-bold' : 'font-sans text-[var(--text-body)]'
      ]"
    >
      &copy; {{ currentYear }} RAFIESTER &bull; PERSONAL SPACE
    </p>
  </footer>
</template>
