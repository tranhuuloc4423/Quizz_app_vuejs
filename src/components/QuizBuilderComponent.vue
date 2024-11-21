<template>
    <div class="mx-auto p-4 max-w-5xl">
        <h2 class="text-center font-bold text-2xl mb-6">Quiz Builder</h2>

        <!-- Quiz Name Section -->
        <div class="mb-5 border border-gray-300 rounded-lg p-4">
            <div class="flex items-center mb-3">
                <span class="text-green-600 text-xl">
                    <i class="mdi mdi-card-text-outline"></i>
                </span>
                <h3 class="ml-3 text-lg font-semibold">Quiz Name:</h3>
            </div>
            <div>
                <input
                    type="text"
                    v-model="quiz.name"
                    placeholder="Enter quiz name"
                    class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                />
            </div>
        </div>

        <!-- Questions Section -->
        <div class="border border-gray-300 rounded-lg p-4">
            <div class="flex items-center mb-3">
                <span class="text-green-600 text-xl">
                    <i class="mdi mdi-format-list-bulleted"></i>
                </span>
                <h3 class="ml-3 text-lg font-semibold">Quiz Questions:</h3>
            </div>
            <div class="space-y-4">
                <div
                    v-for="(question, index) in quiz.questions"
                    :key="index"
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
        <button
            class="w-full py-3 mt-5 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
            @click="saveQuiz"
        >
            Save
        </button>
    </div>
</template>

<script>
import QuestionBuilderComponent from "./QuestionBuilderComponent.vue";

export default {
    components: {
        QuestionBuilderComponent,
    },
    data() {
        return {
            quiz: {
                name: "",
                questions: [
                    { text: "", choices: [{ text: "", correct: false }] },
                ],
            },
        };
    },
    methods: {
        addQuestion() {
            this.quiz.questions.push({
                text: "",
                choices: [{ text: "", correct: false }],
            });
        },
        updateQuestion(index, updatedQuestion) {
            this.quiz.questions[index] = updatedQuestion;
        },
        removeQuestion(index) {
            this.quiz.questions.splice(index, 1);
        },
        saveQuiz() {
            console.log("Saved Quiz:", this.quiz);
            alert("Quiz saved successfully!");
        },
    },
};
</script>
