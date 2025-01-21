<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white rounded-lg shadow-md p-6 w-96">
        <!-- Modal Header -->
        <div class="mb-4">
          <h2 class="text-lg font-semibold text-gray-800">
            <slot name="header"></slot>
          </h2>
        </div>
        <!-- Modal Body -->
        <div class="mb-4">
          <slot name="body"></slot>
        </div>
        <!-- Modal Footer -->
        <div class="flex justify-end gap-3">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    onClose: {
      type: Function,
      required: true,
    },
  });
  </script>
  