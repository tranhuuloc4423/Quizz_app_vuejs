<template>
    <div class="border border-gray-300 p-4 rounded-md">
        <!-- Question Header -->
        <div
            class="flex justify-center flex-wrap items-center mb-4 gap-4 sm:flex-col md:flex-row md:justify-between"
        >
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
                @click="$emit('remove-question', localQuestion.id)"
                class="flex items-center justify-center"
            >
                <font-awesome-icon icon="xmark" color="red" size="2x" />
            </button>
        </div>

        <!-- Choices Section -->
        <h5 class="text-base font-medium mb-2">Choices:</h5>
        <div
            v-for="(choice, choiceIndex) in localQuestion.choices"
            :key="choiceIndex"
            class="flex items-center space-x-4 mb-3 flex-wrap justify-center"
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
                    :checked="choice.correct"
                    @change="setCorrectAnswer(choiceIndex)"
                    class="text-green-600 p-2"
                />
                <span>Correct</span>
            </label>

            <!-- Delete Choice Button -->
            <button
                v-if="localQuestion.choices.length > 2"
                @click="removeChoice(choiceIndex)"
            >
                <font-awesome-icon icon="xmark" size="2x" />
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
            localQuestion: JSON.parse(JSON.stringify(this.question)), // Deep clone to avoid mutating parent
        };
    },
    methods: {
        addChoice() {
            if (this.localQuestion.choices.length < 4) {
                this.localQuestion.choices.push({ text: "", correct: false });
                this.emitUpdatedQuestion();
            }
        },
        removeChoice(index) {
            this.localQuestion.choices.splice(index, 1);
            this.emitUpdatedQuestion();
        },
        removeQuestion(index) {
            // Kiểm tra xem index có hợp lệ không
            if (index >= 0 && index < this.quiz.questions.length) {
                this.quiz.questions.splice(index, 1);
            }
        },
        setCorrectAnswer(choiceIndex) {
            this.localQuestion.choices.forEach((choice, idx) => {
                choice.correct = idx === choiceIndex;
            });
            this.emitUpdatedQuestion();
        },
        emitUpdatedQuestion() {
            this.$emit("update-question", this.index, this.localQuestion);
        },
    },
    watch: {
        localQuestion: {
            handler() {
                this.emitUpdatedQuestion();
            },
            deep: true,
        },
    },
};
</script>
