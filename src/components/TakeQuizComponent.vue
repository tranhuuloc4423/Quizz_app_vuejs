<template>
    <div
        class="quiz-component bg-gray-100 min-h-screen flex flex-col items-center p-6"
    >
        <h1 class="font-bold text-2xl mb-10">Quiz : {{ title }}</h1>

        <div class="w-[250px] flex flex-col" v-if="!isNamed">
            <v-text-field
                label="Enter your name"
                variant="outlined"
                v-model="name"
            ></v-text-field>
            <v-btn text="submit" @click="submitName"></v-btn>
        </div>

        <LoadingOverlay :loading="loadingResult" />

        <div v-if="!loadingResult" class="w-full">
            <!-- main content -->
            <div class="w-full" v-if="isNamed && !isFinished">
                <!-- Question Title -->
                <h1
                    class="text-4xl font-semibold text-[#191D63] mb-6 text-center"
                >
                    {{ questions[currentQuestion].questionText }}
                </h1>

                <!-- Answer Options -->
                <div class="flex flex-col gap-4 max-w-2xl mx-auto">
                    <button
                        v-for="(option, index) in questions[currentQuestion]
                            .answers"
                        :key="index"
                        @click="selectAnswer(option._id)"
                        class="py-4 px-6 rounded text-left text-2xl"
                        :class="{
                            'bg-green-200 transition-colors':
                                selectedAnswer === option._id,
                            'bg-white transition-colors':
                                selectedAnswer !== option._id,
                        }"
                    >
                        {{ option.answerText }}
                    </button>
                </div>

                <!-- Progress Bar and Navigation -->
                <div
                    class="w-full flex items-center justify-center bg-white fixed bottom-0 left-0 p-4"
                >
                    <div
                        class="w-2/3 flex flex-col gap-4 justify-between items-center"
                    >
                        <div
                            class="relative bg-gray-300 h-6 rounded-full w-1/2"
                        >
                            <div
                                class="absolute top-0 left-0 h-full px-4 bg-green-500 rounded-full"
                                :style="{ width: progress + '%' }"
                            ></div>
                            <span
                                class="absolute top-[-6px] right-[-66px] h-full px-4 text-2xl font-bold"
                                >{{ currentQuestion + 1 }}/{{
                                    questions.length
                                }}</span
                            >
                        </div>

                        <div class="flex-2 flex items-center gap-2">
                            <button
                                v-if="currentQuestion > 0"
                                @click="goToPrevious"
                                class="text-2xl py-4 px-8 w-[200px] bg-green-600 text-white rounded shadow hover:bg-green-700"
                            >
                                Back
                            </button>
                            <button
                                v-if="!isLastQuestion"
                                @click="goToNext"
                                class="text-2xl py-4 px-8 w-[200px] bg-green-600 text-white rounded shadow hover:bg-green-700"
                                :disabled="selectedAnswer === null"
                            >
                                Continue
                            </button>
                            <button
                                v-if="isLastQuestion"
                                @click="saveQuiz"
                                class="text-2xl py-4 px-8 w-[200px] bg-blue-600 text-white rounded shadow hover:bg-blue-700"
                                :disabled="selectedAnswer === null"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Result content -->
            <div v-if="isNamed && isFinished" class="w-full">
                <div class="flex flex-col gap-4 items-center w-[400px] mx-auto">
                    <div>
                        <font-awesome-icon
                            icon="trophy"
                            style="color: #ffd43b"
                            size="8x"
                        />
                    </div>
                    <div class="text-4xl font-bold text-uppercase">
                        Congratulations!
                    </div>
                    <div class="text-2xl">Your score</div>
                    <div class="font-bold text-2xl">
                        <span
                            :class="
                                result?.correctRate < 50
                                    ? 'text-red-600'
                                    : 'text-green-600'
                            "
                            >{{
                                Math.round(
                                    (result?.correctRate / 100) *
                                        questions.length
                                )
                            }}</span
                        >
                        / {{ questions.length }}
                    </div>
                    <v-btn
                        text="View Result"
                        @click="showResult = true"
                    ></v-btn>
                </div>
            </div>

            <!-- Result preview -->
            <div class="max-w-2xl mx-auto mt-4" v-if="showResult">
                <div class="text-center text-2xl font-bold">Preview Quiz</div>
                <div class="text-center text-2xl font-bold">
                    Name: {{ name }}
                </div>
                <!-- <div
                    v-for="(question, qindex) in result.answers"
                    :key="qindex"
                    class="border border-gray-300 p-4 rounded mb-4"
                >
                    <div>{{ question.question.questionText }}</div>
                    <div
                        v-for="(answer, index) in question.allAnswers"
                        :key="index"
                        class="bg-[rgba(0,0,0,0.4)]"
                        :class="{
                            'bg-green-400':
                                answer._id === question.answer._id &&
                                answer.isCorrect,
                            'bg-red-400': answer._id === question.answer._id,
                        }"
                    >
                        {{ answer.answerText }}
                    </div>
                </div> -->
                <div
                    v-for="(question, qindex) in result.answers"
                    :key="qindex"
                    class="border border-gray-300 p-4 rounded mb-4"
                >
                    <!-- Hiển thị câu hỏi -->
                    <div class="text-2xl text-center font-semibold mb-2">
                        {{ question.question.questionText }}
                    </div>

                    <!-- Hiển thị các đáp án -->
                    <div
                        v-for="(answer, index) in question.allAnswers"
                        :key="index"
                        class="p-2 rounded mb-2 text-xl relative border"
                        :class="{
                            'bg-green-400 ':
                                answer.isCorrect &&
                                answer._id === question.answer._id, // Đáp án đúng được chọn
                            'bg-red-400':
                                answer._id === question.answer._id &&
                                !answer.isCorrect, // Đáp án sai được chọn
                            'bg-green-400':
                                answer.isCorrect &&
                                answer._id !== question.answer._id, // Đáp án đúng không được chọn
                            '':
                                !answer.isCorrect &&
                                answer._id !== question.answer._id, // Các ô bình thường
                        }"
                    >
                        {{ answer.answerText }}

                        <div
                            v-if="
                                answer.isCorrect &&
                                answer._id === question.answer._id
                            "
                            class="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.1)] text-sm font-bold"
                        >
                            Your Correct Answer
                        </div>

                        <div
                            v-else-if="answer._id === question.answer._id"
                            class="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.1)] text-sm font-bold"
                        >
                            Your Answer
                        </div>

                        <div
                            v-else-if="answer.isCorrect"
                            class="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.1)] text-sm font-bold"
                        >
                            Correct Answer
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "../utils/axios";
import LoadingOverlay from "./LoadingOverlay.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default {
    name: "TakeQuizComponent",
    components: { LoadingOverlay },
    data() {
        return {
            title: "",
            questions: [{}],
            answers: [],
            currentQuestion: 0,
            currentQuestionId: null,
            selectedAnswer: null,
            token: localStorage.getItem("QuizAuth"),
            participant: null,
            quiz: null,
            name: "",
            isNamed: false,
            isFinished: false,
            result: null,
            loadingResult: false,
            showResult: false,
        };
    },
    computed: {
        progress() {
            return ((this.currentQuestion + 1) / this.questions.length) * 100;
        },
        isLastQuestion() {
            return this.currentQuestion === this.questions.length - 1;
        },
    },

    methods: {
        async getQuestions() {
            console.log(this.$route.params.id);
            try {
                const res = await axios.get(
                    `/question/quiz/${this.$route.params.id}`
                );
                this.questions = res.data;
                console.log(res.data);
                this.quiz = res.data[0].quiz;
                this.title = this.quiz.title;
                this.currentQuestionId = res.data[0]._id;
            } catch (error) {
                console.log(error);
            }
        },
        async submitName() {
            try {
                if (this.name.trim() === "") {
                    return;
                }
                const res = await axios.post("/participant/create", {
                    name: this.name,
                });
                console.log(res.data);
                this.isNamed = true;
                this.participant = res.data.participant;
                this.name = this.participant.name;
            } catch (error) {
                console.log(error);
                this.isNamed = false;
            }
        },
        selectAnswer(index) {
            this.selectedAnswer = index;
        },
        goToNext() {
            this.currentQuestionId = this.questions[this.currentQuestion]._id;
            this.answers[this.currentQuestion] = {
                question: this.currentQuestionId,
                answer: this.selectedAnswer,
            };
            if (this.currentQuestion < this.questions.length - 1) {
                this.currentQuestion++;
                this.selectedAnswer = null;
            } else {
                this.saveQuiz();
            }
        },
        goToPrevious() {
            this.currentQuestionId = this.questions[this.currentQuestion]._id;
            if (this.currentQuestion > 0) {
                this.currentQuestion--;
                this.selectedAnswer = this.answers[this.currentQuestion].answer;
            }
        },
        async saveQuiz() {
            try {
                this.loadingResult = true;
                this.currentQuestionId =
                    this.questions[this.currentQuestion]._id;
                this.answers[this.currentQuestion] = {
                    question: this.currentQuestionId,
                    answer: this.selectedAnswer,
                };
                const data = {
                    participantId: this.participant._id,
                    quizId: this.quiz._id,
                    answers: this.answers,
                };
                console.log(data);
                const res = await axios.post(`/participant/participate`, data);
                console.log(res.data);
                this.isFinished = true;
                toast.success("Finish Quiz successful!");
                const result = await this.getQuizResults();
                console.log(result);
                this.loadingResult = false;
            } catch (error) {
                this.loadingResult = false;
                this.isFinished = true;
                console.log(error);
                toast.error(error.response?.data?.error);
            }
        },

        async getQuizResults() {
            try {
                const res = await axios.get(
                    `/participant/${this.participant._id}/${this.quiz._id}`
                );
                console.log(res.data);
                this.result = res.data.quizResult;
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted() {
        this.getQuestions();
    },
};
</script>
