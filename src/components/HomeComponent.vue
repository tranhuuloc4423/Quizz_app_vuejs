<template>
    <div class="text-center h-screen flex pt-10 justify-center bg-gray-100">
        <div class="w-full max-w-screen-xl mx-4 md:px-0 lg:px-0 xl:px-0">
            <!-- header -->
            <div class="flex items-center justify-between mb-6">
                <!-- Logo -->
                <div class="flex items-center gap-4">
                    <!-- logo here -->
                    <h3 class="ml-3 text-2xl font-bold text-black">
                        Quizz<span class="text-green-800">World</span>
                    </h3>
                    <v-btn
                        v-if="auth"
                        @click="$router.push('/create-quiz')"
                        variant="outlined"
                        color="green"
                        >New Quiz</v-btn
                    >
                </div>

                <!-- Login Button -->
                <div class="flex items-center gap-2">
                    <div class="text-xl font-semibold" v-if="auth">
                        <span class="">Welcome back</span>
                        {{ user?.username }} !
                    </div>
                    <v-btn @click="handleAuth" variant="outlined" color="green">
                        {{ auth ? "Logout" : "Login" }}
                    </v-btn>
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
                        v-if="loading"
                        class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    >
                        <v-skeleton-loader
                            v-for="n in 8"
                            :key="n"
                            class="mx-auto border"
                            min-width="300px"
                            type="image, article, actions"
                        ></v-skeleton-loader>
                    </div>
                    <div
                        class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    >
                        <div v-for="(quiz, index) in quizzes" :key="index">
                            <QuizBoxComponent
                                :quiz="quiz"
                                @remove-quiz="removeQuiz(quiz._id)"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- dialog -->
    <div>
        <v-dialog v-model="dialog" max-width="400" persistent>
            <v-card text="Do you want to logout !" title="Logout">
                <template v-slot:actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        @click="dialog = false"
                        variant="outlined"
                        color="red"
                    >
                        Cancel
                    </v-btn>

                    <v-btn
                        @click="
                            () => {
                                dialog = false;
                                handleLogout();
                            }
                        "
                        variant="outlined"
                        color="green"
                    >
                        confirm
                    </v-btn>
                </template>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import axios from "../utils/axios";
import QuizBoxComponent from "./QuizBoxComponent.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
    components: { QuizBoxComponent },
    data() {
        return {
            auth: localStorage.getItem("QuizAuth"),
            user: JSON.parse(localStorage.getItem("QuizUser")),
            quizzes: [],
            dialog: false,
            loading: false,
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
            toast.success("Logout successful!");
        },
        async removeQuiz(id) {
            try {
                const res = await axios.delete(`/quiz/${id}`);
                console.log(res);
                this.getQuizes();
                toast.success("Remove Quiz successful!");
            } catch (error) {
                const errorMessage = error.response?.data?.error;
                console.log(error);
                toast.success(errorMessage);
            }
        },
        async getQuizes() {
            try {
                this.loading = true;
                const res = await axios.get(`/quiz/author/${this.user._id}`);
                this.quizzes = res.data;
                this.loading = false;
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
