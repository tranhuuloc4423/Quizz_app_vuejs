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
                <button
                    @click="userLogin"
                    class="w-full py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
                >
                    Submit
                </button>

                <!-- Register Button -->
                <div class="w-full flex justify-between items-center py-2">
                    <div
                        @click="$router.push('/')"
                        class="cursor-pointer border border-green-600 text-green-600 px-2 py-1 text-lg rounded hover:text-green-600"
                    >
                        Home
                    </div>
                    <div
                        @click="$router.push('/register')"
                        class="cursor-pointer border border-green-600 text-green-600 px-2 py-1 text-lg rounded hover:text-green-600"
                    >
                        Register
                    </div>
                </div>

                <!-- Error Message -->
                <div v-if="data.loginError" class="mt-4 text-red-600 text-sm">
                    {{ data.loginError }}
                </div>
            </form>
        </div>
    </div>

    <CustomToast v-if="data.toast.show" v-bind="data.toast" />
</template>

<script setup>
import { reactive } from "vue";
import axios from "../utils/axios";
import CustomToast from "./CustomToast.vue";

// Reactive state
const data = reactive({
    userName: "",
    passWord: "",
    loginError: "",
    toast: { show: false, message: "", state: "", duration: 5000 },
});

// Show toast function
const showToast = (message, state = "success", duration = 5000) => {
    data.toast = { show: true, message, state, duration };
    setTimeout(() => {
        data.toast.show = false;
    }, duration);
};

// Login function
const userLogin = async () => {
    try {
        const res = await axios.post(`/user/login`, {
            username: data.userName,
            password: data.passWord,
        });
        console.log(res);
        localStorage.setItem("QuizAuth", res.data.token);
        localStorage.setItem("QuizUser", JSON.stringify(res.data.user));
        showToast("Login successful!", "success");
        location.href = "/";
    } catch (error) {
        console.error(error);
        const errorMessage = error.response?.data?.error || "Login failed!";
        showToast(errorMessage, "error");
    }
};
</script>
