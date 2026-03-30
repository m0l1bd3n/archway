<script setup lang="ts">
import { ref } from 'vue';
import Interface from '@components/UI/Interface.vue';

const username = ref('');
const status = ref('Введите имя и нажмите Войти');

const tryLogin = () => {
  const trimmed = username.value.trim();
  if (!trimmed) {
    status.value = 'Введите имя пользователя';
    return;
  }

  mp.trigger('auth:submit', trimmed);
  status.value = 'Запрос отправлен на клиент...';
};
</script>

<template>
  <Interface class="flex justify-center items-center">
    <div class="max-w-md w-full bg-[#101010] p-6 rounded-lg text-white shadow-lg">
      <h1 class="text-2xl font-semibold mb-4">Авторизация через CEF</h1>
      <label class="block mb-2 text-sm text-slate-300">Логин</label>
      <input
        v-model="username"
        class="w-full p-3 rounded bg-[#1f1f1f] border border-[#333] text-white"
        placeholder="Введите имя"
      />
      <button
        @click="tryLogin"
        class="mt-4 w-full py-3 rounded bg-sky-600 hover:bg-sky-500 transition"
      >
        Войти
      </button>
      <p class="mt-4 text-sm text-slate-300">{{ status }}</p>
    </div>
  </Interface>
</template>

<style scoped>
input:focus {
  outline: none;
  border-color: #60a5fa;
}
button {
  cursor: pointer;
}
</style>
