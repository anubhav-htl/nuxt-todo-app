<template>
  <div class="min-h-screen flex items-center justify-center">
    <div
      class="max-w-7xl w-full p-8 bg-white shadow-lg rounded-lg border border-primary"
    >
      <h2 class="text-3xl font-bold text-primary text-center mb-6">
        Welcome Back!
      </h2>
      <form class="space-y-6" @submit.prevent="handleFormSubmit">
        <div>
          <label for="email" class="block text-sm font-medium text-primary"
            >Email</label
          >
          <input
            type="text"
            id="email"
            name="email"
            v-model="formData.email"
            class="w-full px-4 py-3 rounded-lg border border-secondary focus:outline-none focus:ring focus:ring-primary transition duration-200"
            :class="{ 'border-red-500': errors.email }"
            placeholder="Enter your email"
          />
          <p v-if="errors.email" class="text-red-500 text-sm">
            {{ errors.email }}
          </p>
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-primary"
            >Password</label
          >
          <input
            v-model="formData.password"
            type="password"
            id="password"
            name="password"
            class="w-full px-4 py-3 rounded-lg border border-secondary focus:outline-none focus:ring focus:ring-primary transition duration-200"
            :class="{ 'border-red-500': errors.password }"
            placeholder="Enter your password"
          />
          <p v-if="errors.password" class="text-red-500 text-sm">
            {{ errors.password }}
          </p>
        </div>
        <button
          type="submit"
          class="w-full bg-slate-950 text-white py-3 rounded-lg transition duration-300 shadow-md"
        >
          Login
        </button>
      </form>
      <p class="mt-4 text-center text-muted-foreground">
        Don't have an account?
        <NuxtLink to="/signup" class="text-accent hover:underline">Sign up</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { toast } from "vue3-toastify";

// Reactive form state with error tracking
const formData = ref({
  email: "",
  password: "",
});

const errors = ref({});

const router = useRouter();

// Validate form fields similar to React validation approach
const validateForm = () => {
  const newErrors = {};

  // Email validation
  if (!formData.value.email) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.value.email)) {
    newErrors.email = "Email is invalid";
  }

  // Password validation
  if (!formData.value.password) {
    newErrors.password = "Password is required";
  }

  errors.value = newErrors;
  return Object.keys(newErrors).length === 0;
};

// Handle form submission
const handleFormSubmit = async (e) => {
  e.preventDefault();

  // Only submit if the form is valid
  if (validateForm()) {
    try {
      const response = await axios.post("/api/login", formData.value);
      if (response.status === 200) {
        toast.success("User successfully logged in");
        router.push("/todo");
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please try again.");
    }
  }
};
</script>

<style scoped>
/* You can add custom styles here */
</style>
