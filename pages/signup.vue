<template>
  <div class="min-h-screen flex items-center justify-center">
    <div
      class="max-w-md w-full p-8 bg-card shadow-lg rounded-lg border border-primary"
    >
      <h2 class="text-3xl font-bold text-primary text-center mb-6">Sign Up</h2>
      <form class="space-y-6" @submit.prevent="signup">
        <div>
          <label for="username" class="block text-sm font-medium text-primary"
            >Username</label
          >
          <input
            type="text"
            id="username"
            name="username"
            v-model="formData.username"
            class="w-full px-4 py-3 rounded-lg border border-secondary focus:outline-none focus:ring focus:ring-primary transition duration-200"
            :class="{ 'border-red-500': errors.username }"
            placeholder="Enter your username"
          />
          <p v-if="errors.username" class="text-red-500 text-sm">
            {{ errors.username }}
          </p>
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-primary"
            >Email</label
          >
          <input
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
          <label for="mobile" class="block text-sm font-medium text-primary"
            >Mobile</label
          >
          <input
            type="text"
            id="mobile"
            name="mobile"
            v-model="formData.mobile"
            class="w-full px-4 py-3 rounded-lg border border-secondary focus:outline-none focus:ring focus:ring-primary transition duration-200"
            :class="{ 'border-red-500': errors.mobile }"
            placeholder="Enter your mobile number"
          />
          <p v-if="errors.mobile" class="text-red-500 text-sm">
            {{ errors.mobile }}
          </p>
        </div>
        <div>
          <!-- Password Field -->
          <div class="relative">
            <label
              for="password"
              class="block text-sm font-medium text-primary"
            >
              Password
            </label>
            <input
              :type="passwordVisible ? 'text' : 'password'"
              id="password"
              name="password"
              v-model="formData.password"
              class="w-full px-4 py-3 rounded-lg border border-secondary focus:outline-none focus:ring focus:ring-primary transition duration-200"
              :class="{ 'border-red-500': errors.password }"
              placeholder="Enter your password"
            />
            <!-- Eye Icon -->
            <span
              @click="togglePasswordVisibility"
              class="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-primary"
            >
              <!-- <component
                :is="passwordVisible ? 'FaRegEye' : 'FaRegEyeSlash'"
                class="text-lg"
              /> -->
            </span>
            <p v-if="errors.password" class="text-red-500 text-sm">
              {{ errors.password }}
            </p>
          </div>

          <!-- Confirm Password Field -->
          <div class="relative mt-4">
            <label
              for="confirm-password"
              class="block text-sm font-medium text-primary"
            >
              Confirm Password
            </label>
            <input
              :type="confirmPasswordVisible ? 'text' : 'password'"
              id="confirm-password"
              name="confirm-password"
              v-model="formData.confirmPassword"
              class="w-full px-4 py-3 rounded-lg border border-secondary focus:outline-none focus:ring focus:ring-primary transition duration-200"
              :class="{ 'border-red-500': errors.confirmPassword }"
              placeholder="Confirm your password"
            />
            <!-- Eye Icon -->
            <span
              @click="toggleConfirmPasswordVisibility"
              class="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-primary"
            >
              <component
                :is="confirmPasswordVisible ? 'FaRegEye' : 'FaRegEyeSlash'"
                class="text-lg"
              />
            </span>
            <p v-if="errors.confirmPassword" class="text-red-500 text-sm">
              {{ errors.confirmPassword }}
            </p>
          </div>
        </div>
        
        <button
          type="submit"
          class="w-full bg-slate-950 text-white py-3 rounded-lg transition duration-300 shadow-md"
        >
          Sign Up
        </button>
      </form>
      <p class="mt-4 text-center text-muted-foreground">
        Already have an account?
        <NuxtLink to="/login" class="text-accent hover:underline"
          >Login</NuxtLink
        >
      </p>
    </div>
  </div>
</template>


<script setup>
import { useRouter } from "vue-router";
import axios from "axios";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "vue3-toastify";

const router = useRouter();
const formData = ref({
  username: "",
  email: "",
  mobile: "",
  password: "",
  confirmPassword: "",
});
const errors = ref({});
const passwordVisible = ref(false);
const confirmPasswordVisible = ref(false);

// Toggle visibility for the password field
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

// Toggle visibility for the confirm password field
const toggleConfirmPasswordVisibility = () => {
  confirmPasswordVisible.value = !confirmPasswordVisible.value;
};

const validateForm = () => {
  const newErrors = {};
  console.log(formData.value.mobile.length !== 10);
  if (!formData.value.username) {
    newErrors.username = "Username is required";
  } else if (!formData.value.username.length >= 3) {
    newErrors.username = "Username length must be greater than 3 characters";
  }
  if (!formData.value.email) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.value.email)) {
    newErrors.email = "Email is invalid";
  }
  if (formData.value.mobile.length !== 10) {
    newErrors.mobile = "Enter valid mobile number";
  }
  if (!formData.value.password) {
    newErrors.password = "Password is required";
  }
  if (formData.value.password !== formData.value.confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match";
  }

  errors.value = newErrors;
  return Object.keys(newErrors).length === 0;
};

const signup = async () => {
  if (validateForm()) {
    try {
      await axios.post("/api/signup", formData.value);
      router.push("/login");
    } catch (error) {
      console.error("Error during signup", error);
    }
  } else {
    toast.error("Please fill all the fields correctly");
  }
};
</script>
