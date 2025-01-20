<template>
  <div class="min-h-screen flex flex-col">
    <NavBar />
    <main class="flex-grow">
      <!-- <div class="max-w-7xl"> -->
        <slot />
      <!-- </div> -->
    </main>
    <Footer />
  </div>
</template>

<script setup>
import NavBar from "~/components/NavBar.vue";
import Footer from "~/components/Footer.vue";
</script>
