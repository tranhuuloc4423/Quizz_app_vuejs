<template>
    <div class="w-full h-full">
        <div class="mx-auto p-4 max-w-5xl">
            <h2 class="text-center font-bold text-2xl mb-6">Quiz Builder</h2>

            <!-- <CustomToast v-if="toast.show" v-bind="toast" /> -->

            <!-- Swap Mode Button -->
            <div class="flex justify-center mb-6">
                <button
                    class="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
                    @click="swapMode"
                >
                    {{
                        isBulkMode
                            ? "Switch to Single Question Mode"
                            : "Switch to Bulk Mode"
                    }}
                </button>
            </div>

            <div class="mb-5 border border-gray-300 rounded-lg p-4">
                <div class="flex items-center mb-3">
                    <span class="text-green-600 text-xl">
                        <i class="mdi mdi-card-text-outline"></i>
                    </span>
                    <h3 class="ml-3 text-lg font-semibold">Quiz Name:</h3>
                </div>
                <input
                    type="text"
                    v-model="quiz.name"
                    class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                    placeholder="Enter quiz name"
                />
            </div>

            <!-- Bulk Add Questions -->
            <div
                v-if="isBulkMode"
                class="mb-5 border border-gray-300 rounded-lg p-4"
            >
                <h3 class="text-lg font-semibold mb-3">Bulk Add Questions</h3>
                <textarea
                    contenteditable="true"
                    v-model="bulkQuestions"
                    placeholder="Enter questions in bulk format"
                    rows="6"
                    class="w-full h-[300px] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                ></textarea>
                <button
                    class="mt-2 w-full py-2 bg-gray-600 text-white font-semibold rounded hover:bg-gray-700"
                    @click="insertSampleFormat"
                >
                    Insert Sample Format
                </button>
            </div>

            <!-- Single Question Input Mode -->
            <div v-else class="border border-gray-300 rounded-lg p-4">
                <div class="flex items-center mb-3">
                    <span class="text-green-600 text-xl">
                        <i class="mdi mdi-format-list-bulleted"></i>
                    </span>
                    <h3 class="ml-3 text-lg font-semibold">Quiz Questions:</h3>
                </div>
                <div class="space-y-4">
                    <div
                        v-for="(question, index) in quiz.questions"
                        :key="question.id"
                        class="mb-4"
                    >
                        <QuestionBuilderComponent
                            :question="question"
                            :index="index"
                            @update-question="updateQuestion"
                            @remove-question="removeQuestion"
                        />
                    </div>
                    <!-- Add Question Button -->
                    <button
                        class="w-full py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
                        @click="addQuestion"
                    >
                        Add Question
                    </button>
                </div>
            </div>

            <!-- Save Button -->
            <div class="flex justify-between">
                <button
                    class="w-fit px-4 py-3 mt-5 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
                    @click="$router.push('/')"
                >
                    Back
                </button>
                <button
                    class="w-fit px-4 py-3 mt-5 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
                    @click="saveQuiz"
                >
                    Save
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "../utils/axios";
import QuestionBuilderComponent from "./QuestionBuilderComponent.vue";
// import CustomToast from "./CustomToast.vue";

export default {
    components: {
        // CustomToast,
        QuestionBuilderComponent,
    },
    data() {
        return {
            isBulkMode: true,
            token: localStorage.getItem("QuizAuth"),
            user: JSON.parse(localStorage.getItem("QuizUser")),
            quiz: {
                name: "",
                questions: [
                    // {
                    //     id: Date.now(),
                    //     text: "",
                    //     choices: [{ text: "", correct: false }],
                    // },
                ],
            },
            bulkQuestions: "",
            toast: { show: false, message: "", state: "", duration: 5000 },
        };
    },
    methods: {
        swapMode() {
            this.isBulkMode = !this.isBulkMode;
        },
        showToast(message, state = "success") {
            this.toast = { show: true, message, state, duration: 5000 };
            setTimeout(() => {
                this.toast.show = false;
            }, this.toast.duration);
        },
        addQuestion() {
            this.quiz.questions.push({
                id: Date.now(), // ID duy nhất
                text: "",
                choices: [{ text: "", correct: false }],
            });
        },
        updateQuestion(index, updatedQuestion) {
            this.quiz.questions[index] = updatedQuestion;
        },
        removeQuestion(id) {
            const index = this.quiz.questions.findIndex((q) => q.id === id);
            if (index !== -1) {
                this.quiz.questions.splice(index, 1);
            }
        },
        addBulkQuestions() {
            const newQuestions = this.parseBulkQuestions();
            this.quiz.questions.push(...newQuestions);
            this.bulkQuestions = "";
        },
        parseBulkQuestions() {
            const lines = this.bulkQuestions.split("\n");
            let currentQuestion = null;
            const parsedQuestions = [];

            lines.forEach((line) => {
                if (line.startsWith("q:")) {
                    if (currentQuestion) {
                        parsedQuestions.push(currentQuestion);
                    }
                    currentQuestion = {
                        text: line.replace("q:", "").trim(),
                        choices: [],
                    };
                } else if (line.startsWith("correct:")) {
                    if (currentQuestion) {
                        const correctAnswer = line
                            .replace("correct:", "")
                            .trim();
                        currentQuestion.choices.forEach((choice) => {
                            if (choice.text === correctAnswer) {
                                choice.correct = true;
                            }
                        });
                    }
                } else if (line.trim() !== "" && currentQuestion) {
                    currentQuestion.choices.push({
                        text: line.trim(),
                        correct: false,
                    });
                }
            });

            if (currentQuestion) {
                parsedQuestions.push(currentQuestion);
            }

            return parsedQuestions;
        },
        saveQuiz() {
            if (this.isBulkMode && this.bulkQuestions.trim()) {
                this.addBulkQuestions();
            }
            const checkAnswers = this.quiz.questions.some((q) =>
                q.choices.every((c) => c.correct === false)
            );
            const checkTitle = this.quiz.name.trim() === "";
            if (checkTitle) {
                this.showToast("Please enter a title!", "warning");
                return;
            }
            if (checkAnswers) {
                this.showToast("Please check all answers!", "warning");
                return;
            }
            console.log("Saved Quiz:", this.quiz);
            this.saveToDb();
        },
        formatQuestionToDb() {
            return this.quiz.questions.map((question) => {
                return {
                    questionText: question.text,
                    answers: question.choices.map((choice) => {
                        return {
                            answerText: choice.text,
                            isCorrect: choice.correct,
                        };
                    }),
                };
            });
        },
        async saveToDb() {
            try {
                await axios.post(
                    "/quiz/create-quiz",
                    {
                        title: this.quiz.name,
                        createdBy: this.user._id,
                        questions: this.formatQuestionToDb(),
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${this.token}`,
                        },
                    }
                );
                console.log({
                    title: this.quiz.name,
                    createdBy: this.user._id,
                    questions: this.formatQuestionToDb(),
                });
                location.href = "/";
            } catch (error) {
                console.log(error);
            }
        },
        insertSampleFormat() {
            this.bulkQuestions = `q: What is React?\nanswer1\nanswer2\nanswer3\nanswer4\ncorrect: answer2\nq: What is Vue?\nanswer1\nanswer2\nanswer3\nanswer4\ncorrect: answer1`;
        },
    },
};
</script>
