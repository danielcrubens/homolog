<template>
  <div class="mx-auto mt-8 md:mt-3 bg-white rounded-lg shadow-2xl">
    <ProgressBar :current-step="currentStep" />

    <WelcomeStep v-if="currentStep === 1" @next="nextStep" />

    <RegistrationStep v-if="currentStep === 2" @submit="handleRegistration" @previous="previousStep" />

    <ServicesStep v-if="currentStep === 3"
      :user-data="{ name: formData.name, email: formData.email, sector: formData.sector }" @next="handleCompletion"
      @previous="previousStep" @completed="handleServicesCompleted" />
  </div>
</template>

<script setup lang="ts">
import type { FormData, ServiceCompletionData } from '~/types'

const currentStep = ref(1)
const formData = ref<FormData>({
  name: '',
  email: '',
  sector: '',
  services: [],
  message: '',
})

const { addDocument } = useFirestoreActions()

const nextStep = () => {
  currentStep.value++
}

const previousStep = () => {
  currentStep.value--
}

const handleRegistration = async (data: { name: string; email: string; sector: string; message: string }) => {
  try {
    const firestoreResult = await addDocument('usuarios', {
      nome: data.name,
      email: data.email,
      setor: data.sector, 
      menssagem: data.message || null
    })

    if (!firestoreResult.success) {
      throw new Error(firestoreResult.error || 'Erro ao salvar no Firestore')
    }
    console.log('Documento criado com ID:', firestoreResult.id)
    console.log('Enviando email para:', data.email)

    const emailResult = await useFetch('/api/send', {
      method: 'POST',
      body: {
        email: data.email,
        name: data.name,
      }
    })
    console.log('Resultado do envio de email:', emailResult)


    formData.value = { ...formData.value, ...data }
    nextStep()
  } catch (error) {
    console.error('Erro no registro:', error)
  }
}

const handleServicesCompleted = (data: ServiceCompletionData) => {
  formData.value.services = data.services
  console.log('Serviços salvos com sucesso:', {
    documentId: data.documentId,
    services: data.services
  })
  handleCompletion()
}

const handleCompletion = () => {
  // Reset do formulário
  formData.value = {
    name: '',
    email: '',
    sector: '', // Incluído reset do setor
    services: [],
    message: '',
  }

  // Voltar para o primeiro passo
  currentStep.value = 1

  // Aqui você pode adicionar outras ações de conclusão
  // como redirecionar para uma página de sucesso
  console.log('Formulário completado com sucesso!')
}
</script>