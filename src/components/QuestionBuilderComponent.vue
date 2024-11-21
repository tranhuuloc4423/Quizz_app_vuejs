<template>
    <div class="border border-gray-300 p-4 rounded-md">
        <!-- Question Header -->
        <div class="flex justify-between items-center mb-4 gap-4">
            <h3 class="text-lg font-semibold">Question {{ index + 1 }}</h3>

            <!-- Input for Question Text -->
            <input
                type="text"
                v-model="localQuestion.text"
                class="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="Enter question text"
            />

            <!-- Delete Question Button -->
            <button
                @click="$emit('remove-question', index)"
                class="flex items-center justify-center"
            >
                <span
                    class="text-red-500 hover:text-red-700 text-4xl flex items-center justify-center"
                    >&times;</span
                >
            </button>
        </div>

        <!-- Choices Section -->
        <h5 class="text-base font-medium mb-2">Choices:</h5>
        <div
            v-for="(choice, choiceIndex) in localQuestion.choices"
            :key="choiceIndex"
            class="flex items-center space-x-4 mb-3"
        >
            <!-- Choice Input -->
            <input
                type="text"
                v-model="choice.text"
                class="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="Enter choice text"
            />

            <!-- Radio Button -->
            <label class="flex items-center space-x-2">
                <input
                    type="radio"
                    :value="choiceIndex"
                    v-model="localQuestion.correctChoiceIndex"
                    class="text-green-600 p-2 peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-green-400 transition-all"
                />
                <span>Correct</span>
            </label>

            <!-- Delete Choice Button -->
            <button
                v-if="localQuestion.choices.length > 2"
                @click="removeChoice(choiceIndex)"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
        </div>

        <!-- Add Choice Button -->
        <div class="flex justify-center mt-4">
            <button
                v-if="localQuestion.choices.length < 4"
                @click="addChoice"
                class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
                Add Choice
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        question: {
            type: Object,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            localQuestion: {
                ...this.question,
                correctChoiceIndex: this.question.correctChoiceIndex || null,
            }, // Ensure correctChoiceIndex is initialized
        };
    },
    methods: {
        addChoice() {
            if (this.localQuestion.choices.length < 4) {
                this.localQuestion.choices.push({ text: "", correct: false });
                this.$emit("update-question", this.index, this.localQuestion);
            }
        },
        removeChoice(index) {
            this.localQuestion.choices.splice(index, 1);
            this.$emit("update-question", this.index, this.localQuestion);
        },
    },
    watch: {
        localQuestion: {
            handler(newVal) {
                this.$emit("update-question", this.index, newVal);
            },
            deep: true,
        },
    },
};
</script>
