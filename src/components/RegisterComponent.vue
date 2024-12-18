<template>
    <div class="h-screen flex justify-center items-center px-8">
        <div
            class="h-fit md:w-[400px] lg:w-[400px] xl:w-[400px] w-[300px] bg-white p-6 rounded-lg shadow-lg border"
        >
            <div class="text-center mb-2 text-2xl font-bold text-green-600">
                Register
            </div>
            <form @submit.prevent="userRegister" class="space-y-4">
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

                <!-- Password confirm Input -->
                <div>
                    <label
                        for="password"
                        class="block text-gray-700 font-medium"
                    >
                        Password Confirm
                    </label>
                    <input
                        id="password"
                        type="password"
                        v-model="data.confirm"
                        placeholder="Enter your confirm password"
                        class="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                </div>

                <!-- Submit Button -->
                <v-btn
                    variant="tonal"
                    color="green"
                    type="button"
                    @click="userRegister"
                    width="100%"
                >
                    Register
                </v-btn>

                <div
                    class="w-full flex justify-between items-center gap-2 py-2 flex-col md:flex-row lg:flex-row xl:flex-row"
                >
                    <v-btn
                        variant="outlined"
                        color="green"
                        class="w-full md:w-fit lg:w-fit xl:w-fit"
                        @click="$router.push('/')"
                    >
                        Home
                    </v-btn>
                    <v-btn
                        variant="outlined"
                        color="green"
                        class="w-full md:w-fit lg:w-fit xl:w-fit"
                        @click="$router.push('/login')"
                    >
                        Login
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
import router from "@/router/router";
import axios from "../utils/axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
const data = {
    userName: "",
    passWord: "",
    confirm: "",
    loginError: "",
};

// Register function
const userRegister = async () => {
    try {
        if (data.passWord !== data.confirm) {
            toast.error("Passwords do not match!");
            return;
        }
        await axios.post(`/user/register`, {
            username: data.userName,
            password: data.passWord,
        });
        toast.success("Register successful!");
        setTimeout(() => {
            router.push("/login");
        }, 3000);
    } catch (error) {
        toast.error(error.response?.data?.error);
        console.log(error);
    }
};
</script>
