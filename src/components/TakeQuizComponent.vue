<template>
    <div
        class="quiz-component bg-gray-100 min-h-screen flex flex-col items-center p-6"
    >
        <h1 class="font-bold text-2xl mb-10">quiz #122</h1>
        <!-- Question Title -->
        <h1 class="text-4xl font-semibold text-[#191D63] mb-6 text-center">
            {{ questions[currentQuestion].title }}
        </h1>

        <!-- Answer Options -->
        <div class="flex flex-col gap-4 w-full max-w-2xl">
            <button
                v-for="(option, index) in questions[currentQuestion].options"
                :key="index"
                @click="selectAnswer(index)"
                class="py-4 px-6 rounded text-left text-2xl"
                :class="{
                    'bg-green-200 transition-colors': selectedAnswer === index,
                    'bg-white transition-colors': selectedAnswer !== index,
                }"
            >
                {{ option }}
            </button>
        </div>

        <!-- Navigation Buttons -->
        <div class="mt-8 w-full max-w-6xl flex justify-center"></div>

        <div
            class="w-full flex items-center justify-center bg-white fixed bottom-0 left-0 p-4"
        >
            <div class="w-2/3 flex justify-between items-center">
                <div class="relative bg-gray-300 h-6 rounded-full w-1/2">
                    <div
                        class="absolute top-0 left-0 h-full px-4 bg-green-500 rounded-full"
                        :style="{ width: progress + '%' }"
                    ></div>
                    <span
                        class="absolute top-[-6px] right-[-66px] h-full px-4 text-2xl font-bold"
                        >{{ currentQuestion + 1 }}/{{ questions.length }}</span
                    >
                </div>
                <div class="flex-2">
                    <button
                        v-if="!isLastQuestion"
                        @click="goToNext"
                        class="text-2xl py-4 px-16 bg-green-600 text-white rounded shadow hover:bg-green-700"
                        :disabled="selectedAnswer === null"
                    >
                        Continue
                    </button>
                    <button
                        v-if="isLastQuestion"
                        @click="saveQuiz"
                        class="text-2xl py-4 px-16 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
                        :disabled="selectedAnswer === null"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
    name: "TakeQuizComponent",
    setup() {
        // State variables
        const questions = ref([
            {
                title: "What is React?",
                options: [
                    "A library",
                    "A framework",
                    "A database",
                    "A language",
                ],
                correctAnswer: 0,
            },
            {
                title: "What is Vue?",
                options: ["A library", "A framework", "A CMS", "An OS"],
                correctAnswer: 1,
            },
            {
                title: "What is Vue?",
                options: ["A library", "A framework", "A CMS", "An OS"],
                correctAnswer: 1,
            },
            {
                title: "What is Vue?",
                options: ["A library", "A framework", "A CMS", "An OS"],
                correctAnswer: 1,
            },
        ]);

        const currentQuestion = ref(0);
        const selectedAnswer = ref(null);

        // Computed properties
        const progress = computed(
            () => ((currentQuestion.value + 1) / questions.value.length) * 100
        );
        const isLastQuestion = computed(
            () => currentQuestion.value === questions.value.length - 1
        );

        // Methods
        const selectAnswer = (index) => {
            selectedAnswer.value = index;
        };

        const goToNext = () => {
            if (currentQuestion.value < questions.value.length - 1) {
                currentQuestion.value++;
                selectedAnswer.value = null;
            } else {
                saveQuiz();
            }
        };

        const saveQuiz = () => {
            alert("Quiz saved!"); // Replace with actual save logic
        };

        return {
            questions,
            currentQuestion,
            selectedAnswer,
            progress,
            isLastQuestion,
            selectAnswer,
            goToNext,
            saveQuiz,
        };
    },
};
</script>
