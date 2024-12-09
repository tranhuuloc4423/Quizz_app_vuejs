<template>
    <div class="h-screen w-full flex justify-center items-center">
        <div class="h-fit w-1/5 bg-white p-6 rounded-lg shadow-lg border">
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
                <button
                    type="button"
                    @click="userRegister"
                    class="w-full py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
                >
                    Register
                </button>

                <div class="w-full flex justify-between items-center py-2">
                    <div
                        @click="$router.push('/')"
                        class="cursor-pointer border border-green-600 text-green-600 px-2 py-1 text-lg rounded hover:text-green-600"
                    >
                        Home
                    </div>
                    <div
                        @click="$router.push('/login')"
                        class="cursor-pointer border border-green-600 text-green-600 px-2 py-1 text-lg rounded hover:text-green-600"
                    >
                        Login
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
import axios from "../utils/axios";
import CustomToast from "./CustomToast.vue";
const data = {
    userName: "",
    passWord: "",
    confirm: "",
    loginError: "",
    toast: { show: false, message: "", state: "", duration: 5000 },
};

const showToast = (message, state = "success", duration = 5000) => {
    data.toast = { show: true, message, state, duration };
    setTimeout(() => {
        data.toast.show = false;
    }, duration);
};

// Register function
const userRegister = async () => {
    try {
        if (data.passWord !== data.confirm) {
            showToast("Passwords do not match!", "warning");
            return;
        }
        await axios.post(`/user/register`, {
            username: data.userName,
            password: data.passWord,
        });
        showToast("Register successful!", "success");
        setTimeout(() => {
            location.href = "/login";
        }, 3000);
    } catch (error) {
        console.log(error);
        showToast(error.response?.data?.error, "warning");
    }
};
</script>
