<template>
  <ETailwind>
    <EHtml>
      <EHead />
      <EBody class="h-auto py-12">
        <EContainer class="max-w-2xl mx-auto">
          <ESection class="rounded-lg overflow-hidden shadow-sm">
            <ESection class="text-center m-0">
              <EText class="text-lg text-gray-800 mb-0">
                Olá, <span class="font-bold capitalize">{{ name }}</span>! Mapeamento realizado com sucesso.
              </EText>
              <EText class="text-lg text-gray-800 m-0 text-center">
                Em breve entraremos em contato com soluções que atendam às suas necessidades 😉
              </EText>
              <!-- <EImg src="https://i.postimg.cc/J7kXrJyW/bg.png" alt="Logo" class="w-40 mx-auto h-auto py-6" /> -->
            </ESection>
          </ESection>
          <ESection class=" text-center">
            <EText class="text-sm text-gray-500">
              © {{ currentYear }}
              <ELink href="https://danielcrubens.dev/">danielcrubens</ELink>
            </EText>
          </ESection>
        </EContainer>
      </EBody>
    </EHtml>
  </ETailwind>
</template>

<script setup lang="ts">
//import { ETailwind, EHtml, EHead, EBody, EContainer, EText, EImg, ESection, ELink } from 'vue-email'
import { ref } from 'vue';


defineProps({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
})

const currentYear = ref(new Date().getFullYear())
</script>
