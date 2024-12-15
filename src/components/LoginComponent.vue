<template>
    <div class="h-screen w-full flex justify-center items-center flex-col">
        <div class="h-fit w-1/5 bg-white p-6 rounded-lg shadow-lg border">
            <div class="text-center mb-2 text-2xl font-bold text-green-600">
                Login
            </div>
            <form @submit.prevent="userLogin" class="space-y-4">
                <!-- Username Input -->
                <div>
                    <label
                        for="username"
                        class="block text-gray-700 font-medium"
                    >
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        v-model="data.userName"
                        placeholder="Enter your username"
                        class="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                </div>

                <!-- Password Input -->
                <div>
                    <label
                        for="password"
                        class="block text-gray-700 font-medium"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        v-model="data.passWord"
                        placeholder="Enter your password"
                        class="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                </div>

                <!-- Submit Button -->
                <v-btn
                    @click="userLogin"
                    variant="tonal"
                    color="green"
                    width="100%"
                >
                    Submit
                </v-btn>

                <!-- Register Button -->
                <div class="w-full flex justify-between items-center py-2">
                    <v-btn
                        variant="outlined"
                        color="green"
                        @click="$router.push('/')"
                    >
                        Home
                    </v-btn>
                    <v-btn
                        variant="outlined"
                        color="green"
                        @click="$router.push('/register')"
                    >
                        Register
                    </v-btn>
                </div>

                <!-- Error Message -->
                <div v-if="data.loginError" class="mt-4 text-red-600 text-sm">
                    {{ data.loginError }}
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import axios from "../utils/axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

// Reactive state
const data = reactive({
    userName: "",
    passWord: "",
});

// Login function
const userLogin = async () => {
    try {
        const res = await axios.post(`/user/login`, {
            username: data.userName,
            password: data.passWord,
        });
        console.log(res);
        toast.success("Login successful!");
        localStorage.setItem("QuizAuth", res.data.token);
        localStorage.setItem("QuizUser", JSON.stringify(res.data.user));
        setTimeout(() => {
            this.$router.push("/");
        }, 1000);
    } catch (error) {
        console.error(error);
        const errorMessage = error.response?.data?.error || "Login failed!";
        toast.error(errorMessage);
    }
};
</script>
