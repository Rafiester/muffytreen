<script setup lang="ts">
import { ref } from 'vue';

interface SocialCard {
  url: string;
  icon: string;
}

interface Socials {
  card1?: SocialCard;
  card2?: SocialCard;
  card3?: SocialCard;
  card4?: SocialCard;
  [key: string]: any;
}

const props = defineProps<{
  socials: Socials;
}>();

const emit = defineEmits<{
  (e: 'change', key: string, value: SocialCard): void;
}>();

const cards = ['card1', 'card2', 'card3', 'card4'];

const handleUrlChange = (cardKey: string, url: string) => {
  const current = props.socials[cardKey] || { url: '', icon: '' };
  emit('change', cardKey, { ...current, url });
};

const triggerFileUpload = (cardKey: string) => {
  const el = document.getElementById(`upload-${cardKey}`) as HTMLInputElement;
  if (el) el.click();
};

const handleIconUpload = (cardKey: string, event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input.files || input.files.length === 0) return;
  
  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    const base64 = e.target?.result as string;
    const current = props.socials[cardKey] || { url: '', icon: '' };
    emit('change', cardKey, { ...current, icon: base64 });
  };
  reader.readAsDataURL(file);
};
</script>

<template>
  <div class="bg-[#1e1d23]/80 border border-white/[0.04] p-6 rounded-2xl backdrop-blur-sm mt-6">
    <h2 class="text-xs font-bold uppercase tracking-[0.12em] !text-white/30 mb-6">
      Icon Cards
    </h2>

    <div class="space-y-6">
      <div v-for="(card, index) in cards" :key="card" class="bg-white/[0.02] border border-white/[0.05] p-4 rounded-xl">
        <label class="block text-xs font-bold uppercase tracking-wider text-white/50 mb-3">Card {{ index + 1 }}</label>
        
        <div class="flex items-start gap-4">
          <!-- Icon Preview & Upload -->
          <div class="flex-shrink-0">
            <input 
              :id="`upload-${card}`" 
              type="file" 
              accept="image/*" 
              class="hidden" 
              @change="(e) => handleIconUpload(card, e)" 
            />
            
            <button 
              @click="triggerFileUpload(card)"
              class="w-12 h-12 bg-white/[0.05] border border-white/[0.1] rounded-lg flex items-center justify-center overflow-hidden hover:bg-white/[0.1] transition-colors relative group"
              title="Upload Custom Icon"
            >
              <img 
                v-if="socials[card]?.icon && (socials[card].icon.startsWith('data:image') || socials[card].icon.startsWith('http'))" 
                :src="socials[card].icon" 
                class="w-8 h-8 object-contain" 
              />
              <div v-else-if="socials[card]?.icon" class="text-xs text-white/50 uppercase">{{ socials[card].icon.substring(0, 3) }}</div>
              <div v-else class="text-white/30">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div class="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              </div>
            </button>
          </div>
          
          <!-- URL Input -->
          <div class="flex-1">
            <input
              type="text"
              :value="socials[card]?.url || ''"
              @input="(e) => handleUrlChange(card, (e.target as HTMLInputElement).value)"
              class="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all"
              placeholder="https://..."
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
