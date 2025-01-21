<template>
  <nav class="bg-gray-800 text-white p-4 flex justify-between items-center">
    <h1 class="text-lg font-bold">
      <NuxtLink to="/"> Nuxt To-Do App</NuxtLink>
    </h1>
    <div>
      <NuxtLink to="/todo" class="mr-4 hover:underline">Todo</NuxtLink>
      <NuxtLink to="/login" class="mr-4 hover:underline">Login</NuxtLink>
      <NuxtLink to="/signup" class="hover:underline">Signup</NuxtLink>
    </div>
  </nav>
</template>
