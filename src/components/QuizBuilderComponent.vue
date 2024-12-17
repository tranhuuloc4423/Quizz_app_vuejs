<template>
    <div class="w-full h-full">
        <LoadingOverlay :loading="loading" />

        <div class="mx-auto p-4 max-w-5xl" v-if="!loading">
            <h2 class="text-center font-bold text-2xl mb-6">
                {{ isEdit ? "Edit Quiz" : "Create New Quiz" }}
            </h2>

            <!-- Swap Mode Button -->
            <div class="flex justify-center mb-6" v-if="!isEdit">
                <v-btn variant="outlined" color="green" @click="swapMode">
                    {{
                        isBulkMode
                            ? "Switch to Single Mode"
                            : "Switch to Bulk Mode"
                    }}
                </v-btn>
            </div>

            <div class="mb-5 border border-gray-300 rounded-lg p-4">
                <div class="flex items-center mb-3">
                    <span class="text-green-600 text-xl">
                        <i class="mdi mdi-card-text-outline"></i>
                    </span>
                    <h3 class="ml-3 text-lg font-semibold">Quiz Title:</h3>
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
                v-if="!isEdit && isBulkMode"
                class="mb-5 border border-gray-300 rounded-lg p-4"
            >
                <div class="flex justify-between items-center pb-2">
                    <h3 class="text-lg font-semibold">Bulk Questions</h3>
                    <v-btn
                        variant="outlined"
                        color="green"
                        @click="insertSampleFormat"
                    >
                        Insert Sample Format
                    </v-btn>
                </div>
                <textarea
                    contenteditable="true"
                    v-model="bulkQuestions"
                    placeholder="Enter questions in bulk format"
                    rows="6"
                    class="w-full h-[300px] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                ></textarea>
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
            <div class="flex justify-between mt-4">
                <v-btn
                    variant="outlined"
                    color="green"
                    @click="$router.push('/')"
                >
                    Home
                </v-btn>
                <v-btn variant="outlined" color="green" @click="saveQuiz()">
                    {{ isEdit ? "Update" : "Save" }}
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "../utils/axios";
import QuestionBuilderComponent from "./QuestionBuilderComponent.vue";
import LoadingOverlay from "./LoadingOverlay.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
    components: {
        QuestionBuilderComponent,
        LoadingOverlay,
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
            isEdit: false,
            quizId: null,
            loading: false,
        };
    },
    methods: {
        // ===== Utility Functions =====
        resetQuestions() {
            this.quiz.questions = [];
        },
        createNewQuestion() {
            return {
                id: Date.now(), // Unique ID
                text: "",
                choices: [{ text: "", correct: false }],
            };
        },
        findQuestionIndexById(id) {
            return this.quiz.questions.findIndex((q) => q.id === id);
        },
        validateQuiz() {
            const hasEmptyTitle = !this.quiz.name.trim();
            const hasInvalidAnswers = this.quiz.questions.some((q) =>
                q.choices.every((c) => !c.correct)
            );
            if (hasEmptyTitle) {
                toast.warning("Please enter a title!");
                return false;
            }
            if (hasInvalidAnswers) {
                toast.warning("Please check all answers!");
                return false;
            }
            return true;
        },

        // ===== Main Functions =====
        swapMode() {
            this.isBulkMode = !this.isBulkMode;
            this.resetQuestions();
        },
        addQuestion() {
            this.quiz.questions.push(this.createNewQuestion());
        },
        updateQuestion(index, updatedQuestion) {
            if (index >= 0) this.quiz.questions[index] = updatedQuestion;
        },
        removeQuestion(id) {
            const index = this.findQuestionIndexById(id);
            if (index !== -1) this.quiz.questions.splice(index, 1);
        },
        addBulkQuestions() {
            const newQuestions = this.parseBulkQuestions();
            this.quiz.questions.push(...newQuestions);
            this.bulkQuestions = "";
        },

        // ===== Parsing Functions =====
        parseBulkQuestions() {
            const lines = this.bulkQuestions.split("\n");
            const parsedQuestions = [];
            let currentQuestion = null;

            lines.forEach((line) => {
                const trimmedLine = line.trim();
                if (trimmedLine.startsWith("q:")) {
                    if (currentQuestion) parsedQuestions.push(currentQuestion);
                    currentQuestion = {
                        text: trimmedLine.slice(2).trim(),
                        choices: [],
                    };
                } else if (
                    currentQuestion &&
                    trimmedLine.startsWith("correct:")
                ) {
                    const correctAnswer = trimmedLine.slice(8).trim();
                    currentQuestion.choices.forEach((choice) => {
                        if (choice.text === correctAnswer)
                            choice.correct = true;
                    });
                } else if (currentQuestion && trimmedLine) {
                    currentQuestion.choices.push({
                        text: trimmedLine,
                        correct: false,
                    });
                }
            });

            if (currentQuestion) parsedQuestions.push(currentQuestion);
            return parsedQuestions;
        },
        convertQuestionsToBulk(questions) {
            return questions
                .map(({ text, choices }) => {
                    const answers = choices.map((c) => c.text).join("\n");
                    const correctAnswer =
                        choices.find((c) => c.correct)?.text || "";
                    return `q: ${text}\n${answers}\ncorrect: ${correctAnswer}`;
                })
                .join("\n\n");
        },

        // ===== Save & Update =====
        async saveQuiz() {
            if (this.isEdit) return this.updateQuiz();

            if (!this.isEdit && this.isBulkMode && this.bulkQuestions.trim()) {
                this.addBulkQuestions();
            }

            if (!this.validateQuiz()) return;

            try {
                this.loading = true;
                await axios.post("/quiz/create-quiz", {
                    title: this.quiz.name,
                    createdBy: this.user._id,
                    questions: this.formatQuestionToDb(),
                });
                toast.success("Create Quiz successful!");
                setTimeout(() => {
                    this.$router.push("/");
                }, 500);
            } catch (error) {
                toast.error(error.response?.data?.error);
            } finally {
                this.loading = false;
            }
        },
        async updateQuiz() {
            try {
                this.loading = true;
                const updatedData = this.formatUpdateQuestion();
                await axios.put("/quiz/update/", {
                    quizId: this.$route?.query.id,
                    ...updatedData,
                });
                toast.success("Update Quiz successful!");
                setTimeout(() => {
                    this.$router.push("/");
                }, 2000);
            } catch (error) {
                toast.error(error.response?.data?.error);
            } finally {
                this.loading = false;
            }
        },

        // ===== Formatting Functions =====
        formatUpdateQuestion() {
            return {
                title: this.quiz.name,
                questions: this.quiz.questions.map(({ id, text, choices }) => ({
                    questionId: typeof id === "number" ? undefined : id,
                    questionText: text,
                    correctAnswer: choices.find((c) => c.correct)?.text,
                    answers: choices.map((c) => ({
                        answerId: c.id || undefined,
                        answerText: c.text,
                        isCorrect: c.correct,
                    })),
                })),
            };
        },
        formatQuestionToDb() {
            return this.quiz.questions.map(({ text, choices }) => ({
                questionText: text,
                answers: choices.map(({ text, correct }) => ({
                    answerText: text,
                    isCorrect: correct,
                })),
            }));
        },
        formatQuestionFromDB(data) {
            return data.map(({ _id, questionText, answers }) => ({
                id: _id,
                text: questionText,
                choices: answers.map(({ answerText, isCorrect, _id }) => ({
                    text: answerText,
                    correct: isCorrect,
                    id: _id,
                })),
            }));
        },

        // ===== API Calls =====
        async getData() {
            try {
                this.loading = true;
                const { data } = await axios.get(`/quiz/${this.quizId}`);
                this.quiz.name = data.title;
                await this.getQuestions();
            } catch (error) {
                this.loading = false;
                console.error(error);
            }
        },
        async getQuestions() {
            try {
                const { data } = await axios.get(
                    `/question/quiz/${this.quizId}`
                );
                this.quiz.questions = this.formatQuestionFromDB(data);
            } catch (error) {
                console.error(error);
            }
        },
        insertSampleFormat() {
            this.bulkQuestions = `q: What is React?\nanswer1\nanswer2\nanswer3\nanswer4\ncorrect: answer2\n\nq: What is Vue?\nanswer1\nanswer2\nanswer3\nanswer4\ncorrect: answer1`;
        },
    },

    mounted() {
        const { id, edit } = this.$route?.query;
        if (id && edit) {
            this.isEdit = true;
            this.quizId = id;
            this.getData();
        }
    },
};
</script>
