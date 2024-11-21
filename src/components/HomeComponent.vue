<template>
    <div class="text-center min-h-screen flex pt-10 justify-center bg-gray-100">
        <div class="w-full max-w-screen-xl">
            <!-- Logo and App Name -->
            <div class="flex items-center justify-between mb-6">
                <!-- Logo -->
                <div class="flex items-center">
                    <!-- logo here -->
                    <h3 class="ml-3 text-2xl font-bold text-black">
                        Quizz<span class="text-green-800">World</span>
                    </h3>
                </div>

                <!-- Login Button -->
                <button
                    @click="$router.push('/login')"
                    class="px-4 py-2 border border-green-600 text-green-600 rounded hover:bg-green-50"
                >
                    Login
                </button>
            </div>

            <!-- Main Content -->
            <h1 class="text-5xl font-extrabold text-black mb-4">
                Learn 10x <span class="text-green-800">Faster!</span>
            </h1>
            <p class="text-lg text-gray-600 mb-6">
                Unlock Your Potential with Personalized Quizzes
            </p>

            <!-- Get Started Button -->
            <button
                @click="$router.push('/create-quiz')"
                class="px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded shadow-lg hover:bg-green-700 transition-all"
            >
                Get Started Now!
            </button>
        </div>
    </div>
</template>

<script setup></script>
