<template>
    <div class="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-lg">
        <form @submit.prevent="userLogin" class="space-y-4">
            <!-- Username Input -->
            <div>
                <label for="username" class="block text-gray-700 font-medium">
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
                <label for="password" class="block text-gray-700 font-medium">
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
            <div
                @click="$router.push('/register')"
                class="w-full flex justify-center items-center py-2 text-gray-700 font-semibold rounded cursor-pointer"
            >
                <span>Register</span>
            </div>

            <!-- Error Message -->
            <div v-if="data.loginError" class="mt-4 text-red-600 text-sm">
                {{ data.loginError }}
            </div>
        </form>
    </div>
</template>

<script setup>
import axios from "../utils/axios";

const data = {
    userName: "",
    passWord: "",
    loginError: "",
};

// Login function
const userLogin = async () => {
    try {
        const res = await axios.post(`/user/login`, {
            username: data.userName,
            password: data.passWord,
        });
        console.log(res);
        location.href = "/";
    } catch (error) {
        console.log(error);
        // data.loginError = error.response.data.message;
    }
};
</script>
