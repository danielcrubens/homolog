<template>
  <div class="space-y-4 py-6 px-2.5 overflow-x-hidden">
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <h1 class="text-2xl font-bold py-4 text-neutral-600">
        Dados Básicos
      </h1>

      <div>
        <label for="name">
          <User />
          Nome Completo
        </label>
        <input v-model="formData.name" type="text" id="name" placeholder="Seu nome completo"
          :class="{ 'border-red-500': errors.name }" />
        <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
      </div>

      <div>
        <label for="email">
          <Mail />E-mail
        </label>
        <input v-model="formData.email" id="email" placeholder="Seu melhor e-mail"
          :class="{ 'border-red-500': errors.email }" />
        <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
      </div>

      <div>
        <label>
          <Tag />
          Setor de Atuação
        </label>
        <select v-model="formData.sector" name="HeadlineAct" id="HeadlineAct"
          :class="{ 'border-red-500': errors.sector }">
          <option value="">Selecione o setor</option>
          <option value="Tecnologia">Tecnologia</option>
          <option value="Servicos">Serviços</option>
          <option value="Varejo">Varejo</option>
          <option value="Industria">Indústria</option>
          <option value="Outro">Outro</option>
        </select>
        <p v-if="errors.sector" class="mt-1 text-sm text-red-600">{{ errors.sector }}</p>
      </div>

      <div>
        <label>
          <MessageSquare />
          Descreva os seus principais desafios
        </label>
        <textarea v-model="formData.message" id="message" cols="3" rows="3" 
          placeholder="Quais são os principais desafios que sua empresa enfrenta atualmente? (Opcional)"></textarea>
      </div>

      <div class="md:space-x-16 space-x-6 flex py-8">
        <Button variant="secondary" type="button" @click="emit('previous')">
          <MoveLeft :size="25" />
          Voltar
        </Button>
        <Button type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? 'Enviando...' : 'Próximo' }}
          <MoveRight :size="25" />
        </Button>
      </div>
    </form>
  </div>
</template>

<style>
input,
select,
textarea {
  @apply font-medium mt-1.5 mb-7 lg:mt-1.5 lg:mb-5 block w-full rounded-md border-zinc-300 border-[1px] p-2.5 shadow-sm focus:outline-none text-gray-500 focus:border-zinc-400 focus:ring-1 focus:shadow-md focus:ring-zinc-400;
}

label {
  @apply text-sm font-medium text-gray-700 flex items-center justify-normal gap-1.5;
}
</style>

<script setup lang="ts">
import { User, Mail, Tag, MoveRight, MoveLeft, MessageSquare } from 'lucide-vue-next';
import Button from '@/components/Buttons/Button.vue';
import { z } from 'zod';
import { ref, reactive, watch } from 'vue';

const formSchema = z.object({
  name: z.string()
    .min(1, 'Nome é obrigatório')
    .min(3, 'O nome deve ter pelo menos 3 caracteres')
    .max(100, 'O nome deve ter no máximo 100 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'O nome deve conter apenas letras'),
  email: z.string()
    .min(1, 'E-mail é obrigatório')
    .email('Digite um e-mail válido'),
  sector: z.string()
    .min(1, 'Setor é obrigatório')
    .refine((val) => ['Tecnologia', 'Servicos', 'Varejo', 'Industria', 'Outro'].includes(val), {
      message: 'Setor inválido'
    }),
    message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema> & { message?: string };

const emit = defineEmits(['submit', 'previous']);
const formData = ref<FormData>({
  name: '',
  email: '',
  sector: '',
  message: ''
});
const isSubmitting = ref(false);
const errors = reactive<Record<keyof FormData, string>>({
  name: '',
  email: '',
  sector: '',
  message: ''
});

// Validar campo específico e retornar se é válido
const validateField = (field: keyof FormData): boolean => {
  if (field === 'message') return true; // Campo opcional, sempre válido
  try {
    formSchema.shape[field].parse(formData.value[field]);
    errors[field] = '';
    return true;
  } catch (error) {
    if (error instanceof z.ZodError) {
      errors[field] = error.errors[0].message;
    }
    return false;
  }
};

// Validar todos os campos no submit
const validateAllFields = () => {
  let isValid = true;
  Object.keys(formData.value).forEach((field) => {
    if (!validateField(field as keyof FormData)) {
      isValid = false;
    }
  });
  return isValid;
};

watch(() => formData.value.name, (newValue) => {
  if (newValue) validateField('name');
});

watch(() => formData.value.email, (newValue) => {
  if (newValue) validateField('email');
});

watch(() => formData.value.sector, (newValue) => {
  if (newValue) validateField('sector');
});

const handleSubmit = async () => {
  if (!validateAllFields()) {
    return;
  }

  try {
    const validatedData = formSchema.parse(formData.value);
    isSubmitting.value = true;
    emit('submit', validatedData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0] as keyof FormData] = err.message;
        }
      });
    }
  } finally {
    isSubmitting.value = false;
  }
};
</script>
