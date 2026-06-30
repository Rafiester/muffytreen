<script setup lang="ts">
import { ref } from 'vue';

type Theme = 'minimalist' | 'minimalist-dark' | 'retro' | 'electric';

defineProps<{
  currentTheme: Theme;
}>();

const emit = defineEmits<{
  (e: 'themeChange', theme: Theme): void;
}>();

const isOpen = ref(false);

const toggleOpen = () => {
  isOpen.value = !isOpen.value;
};

const selectTheme = (t: Theme) => {
  emit('themeChange', t);
  isOpen.value = false;
};
</script>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<template>
  <!-- Fixed floating container in bottom-right -->
  <div class="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">
    
    <!-- Expandable theme panel (slides up from FAB) -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-4 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-4 scale-95"
    >
      <div 
        v-if="isOpen"
        :class="[
          'flex flex-col gap-1.5 p-2.5 min-w-[160px] transition-all duration-300',
          currentTheme === 'retro'
            ? 'bg-white border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
            : currentTheme === 'electric'
              ? 'bg-zinc-950 border border-emerald-500 shadow-[0_0_15px_rgba(40,255,133,0.15)] rounded-2xl'
              : 'bg-[var(--bg-card)]/95 border border-[var(--border-card)] shadow-2xl shadow-black/10 rounded-2xl backdrop-blur-xl'
        ]"
      >
        <!-- Panel label -->
        <span 
          :class="[
            'text-[10px] font-bold uppercase tracking-widest px-2 pt-1 pb-0.5 select-none',
            currentTheme === 'retro'
              ? 'font-mono text-black'
              : currentTheme === 'electric'
                ? 'text-emerald-400 opacity-80'
                : 'text-[var(--text-body)] opacity-50'
          ]"
        >
          Theme
        </span>

        <!-- Minimalist Light -->
        <button
          @click="selectTheme('minimalist')"
          aria-label="Switch to Minimal Light"
          :class="[
            'flex items-center gap-2.5 px-3 py-2 text-xs font-semibold select-none transition-all duration-200 w-full text-left',
            currentTheme === 'minimalist'
              ? (currentTheme === 'retro'
                  ? 'bg-[#ec4899] text-white border-2 border-black font-bold'
                  : 'bg-[var(--text-title)] text-[var(--bg-card)] rounded-xl')
              : (currentTheme === 'retro'
                  ? 'hover:bg-yellow-200 text-black border-2 border-transparent font-medium'
                  : 'hover:bg-[var(--bg-card-hover)] text-[var(--text-body)] hover:text-[var(--text-title)] rounded-xl')
          ]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 flex-shrink-0">
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
          </svg>
          <span :class="currentTheme === 'retro' ? 'font-bold font-mono' : 'font-sans'">Light</span>
        </button>

        <!-- Minimalist Dark -->
        <button
          @click="selectTheme('minimalist-dark')"
          aria-label="Switch to Minimal Dark"
          :class="[
            'flex items-center gap-2.5 px-3 py-2 text-xs font-semibold select-none transition-all duration-200 w-full text-left',
            currentTheme === 'minimalist-dark'
              ? (currentTheme === 'retro'
                  ? 'bg-[#ec4899] text-white border-2 border-black font-bold'
                  : 'bg-[var(--text-title)] text-[var(--bg-card)] rounded-xl')
              : (currentTheme === 'retro'
                  ? 'hover:bg-yellow-200 text-black border-2 border-transparent font-medium'
                  : 'hover:bg-[var(--bg-card-hover)] text-[var(--text-body)] hover:text-[var(--text-title)] rounded-xl')
          ]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 flex-shrink-0">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
          </svg>
          <span :class="currentTheme === 'retro' ? 'font-bold font-mono' : 'font-sans'">Dark</span>
        </button>

        <!-- Retro -->
        <button
          @click="selectTheme('retro')"
          aria-label="Switch to 90s Retro"
          :class="[
            'flex items-center gap-2.5 px-3 py-2 text-xs font-semibold select-none transition-all duration-200 w-full text-left',
            currentTheme === 'retro'
              ? 'bg-[#ec4899] text-white border-2 border-black font-bold'
              : (currentTheme === 'retro'
                  ? 'hover:bg-yellow-200 text-black border-2 border-transparent font-medium'
                  : 'hover:bg-[var(--bg-card-hover)] text-[var(--text-body)] hover:text-[var(--text-title)] rounded-xl')
          ]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 flex-shrink-0">
            <rect width="20" height="12" x="2" y="6" rx="2"/>
            <path d="M6 12h.01M10 12h.01M14 12h4"/>
          </svg>
          <span :class="currentTheme === 'retro' ? 'font-bold font-mono' : 'font-sans'">Retro</span>
        </button>

        <!-- Electric -->
        <button
          @click="selectTheme('electric')"
          aria-label="Switch to Electric Theme"
          :class="[
            'flex items-center gap-2.5 px-3 py-2 text-xs font-semibold select-none transition-all duration-200 w-full text-left',
            currentTheme === 'electric'
              ? 'bg-emerald-500 text-black rounded-xl font-bold shadow-[0_0_10px_rgba(16,185,129,0.3)]'
              : 'hover:bg-emerald-500/10 text-[var(--text-body)] hover:text-emerald-400 rounded-xl'
          ]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 flex-shrink-0">
            <path d="m13 2-2 10h9L9 22l2-10H3L13 2z"/>
          </svg>
          <span class="font-sans">Electric</span>
        </button>
      </div>
    </Transition>

    <!-- FAB Button (paintbrush icon) -->
    <button
      @click="toggleOpen"
      aria-label="Toggle theme switcher"
      :class="[
        'w-12 h-12 flex items-center justify-center transition-all duration-300 group',
        currentTheme === 'retro'
          ? 'bg-[#ec4899] border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px]'
          : 'bg-[var(--text-title)] rounded-full shadow-lg shadow-black/20 hover:shadow-xl hover:scale-110'
      ]"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="20" height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
        :class="[
          'transition-transform duration-300',
          currentTheme === 'retro' ? 'text-white' : 'text-[var(--bg-card)]',
          isOpen ? 'rotate-[-30deg]' : 'rotate-0'
        ]"
      >
        <path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z"/>
        <path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7"/>
        <path d="M14.5 17.5 4.5 15"/>
      </svg>
    </button>
  </div>

  <!-- Click-outside overlay to close panel -->
  <Teleport to="body">
    <div 
      v-if="isOpen" 
      class="fixed inset-0 z-[9998]" 
      @click="isOpen = false"
    />
  </Teleport>
</template>
