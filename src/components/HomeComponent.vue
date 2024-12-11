<template>
    <div class="text-center h-screen flex pt-10 justify-center bg-gray-100">
        <div class="w-full max-w-screen-xl">
            <!-- header -->
            <div class="flex items-center justify-between mb-6">
                <!-- Logo -->
                <div class="flex items-center">
                    <!-- logo here -->
                    <h3 class="ml-3 text-2xl font-bold text-black">
                        Quizz<span class="text-green-800">World</span>
                    </h3>
                </div>

                <!-- Login Button -->
                <div class="flex items-center gap-2">
                    <div class="text-xl font-semibold" v-if="auth">
                        <span class="">Welcome back</span>
                        {{ user?.username }} !
                    </div>
                    <button
                        @click="handleAuth"
                        class="px-4 py-2 border border-green-600 text-green-600 rounded hover:bg-green-50"
                    >
                        {{ auth ? "Logout" : "Login" }}
                    </button>
                </div>
            </div>

            <!-- Main Content -->
            <div class="">
                <div v-if="!auth">
                    <h1 class="text-5xl font-extrabold text-black mb-4">
                        Learn 10x <span class="text-green-800">Faster!</span>
                    </h1>
                    <p class="text-lg text-gray-600 mb-6">
                        Unlock Your Potential with Personalized Quizzes
                    </p>

                    <!-- Get Started Button -->
                    <button
                        @click="handleGetStarted"
                        class="px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded shadow-lg hover:bg-green-700 transition-all"
                    >
                        Get Started Now!
                    </button>
                </div>

                <div v-if="auth">
                    <div
                        class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    >
                        <div v-for="(quiz, index) in quizzes" :key="index">
                            <QuizBoxComponent :quiz="quiz" />
                        </div>

                        <!-- phần box thêm quiz -->
                        <div
                            @click="$router.push('/create-quiz')"
                            class="cursor-pointer flex flex-col items-center justify-between border border-[#c5c5c5] rounded-lg shadow-lg p-6"
                        >
                            <div></div>
                            <font-awesome-icon
                                icon="plus"
                                size="4x"
                                color="#c5c5c5"
                            />
                            <div class="text-2xl font-semibold text-[#c5c5c5]">
                                Add a new Quiz
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- dialog -->
    <div>
        <v-dialog v-model="dialog" max-width="400" persistent>
            <v-card text="Bạn có chắc chắn muốn đăng xuất !" title="Đăng xuất">
                <template v-slot:actions>
                    <v-spacer></v-spacer>
                    <div
                        @click="dialog = false"
                        class="cursor-pointer border border-red-600 text-red-600 px-2 py-1 text-lg rounded hover:bg-red-200"
                    >
                        Huỷ
                    </div>

                    <div
                        @click="
                            () => {
                                dialog = false;
                                handleLogout();
                            }
                        "
                        class="cursor-pointer border border-green-600 text-green-600 px-2 py-1 text-lg rounded hover:bg-green-200"
                    >
                        Xác nhận
                    </div>
                </template>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import axios from "../utils/axios";
import QuizBoxComponent from "./QuizBoxComponent.vue";

export default {
    components: { QuizBoxComponent },
    data() {
        return {
            auth: localStorage.getItem("QuizAuth"),
            user: JSON.parse(localStorage.getItem("QuizUser")),
            quizzes: [
                // {
                //     _id: 0,
                //     title: "React Quiz",
                //     questions: 10,
                //     correctRate: 0,
                //     incorrectRate: 0,
                //     participants: 0,
                // },
                // {
                //     _id: 1,
                //     title: "Vue Quiz",
                //     questions: 6,
                //     correctRate: 0,
                //     incorrectRate: 0,
                //     participants: 0,
                // },
            ],
            dialog: false,
        };
    },
    methods: {
        handleGetStarted() {
            if (this.auth) {
                location.href = "/create-quiz";
            } else {
                location.href = "/login";
            }
        },
        handleAuth() {
            if (this.auth) {
                this.dialog = true;
            } else {
                location.href = "/login";
            }
        },
        handleLogout() {
            localStorage.removeItem("QuizAuth");
            location.href = "/";
        },
        async getQuizes() {
            try {
                const res = await axios.get("/quiz");
                this.quizzes = res.data;
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted() {
        this.getQuizes();
    },
};
</script>

<style scoped>
.quiz-container {
    background-color: #f9fafb;
    min-height: 100vh;
}
</style>
