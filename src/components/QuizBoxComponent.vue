<template>
    <v-card class="quiz-box" outlined elevation="2">
        <v-card-title>
            <v-icon color="green" large>mdi-laptop</v-icon>
        </v-card-title>
        <v-card-text>
            <h3 class="title">{{ quiz.name }}</h3>
            <p>{{ quiz.questions }} question(s)</p>
            <p>
                Success rate: <strong>{{ quiz.successRate || "N/A" }}%</strong>
            </p>
        </v-card-text>
        <v-card-actions>
            <v-btn icon @click="startQuiz(quiz.id)">
                <v-icon color="green">mdi-play</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    props: {
        quiz: {
            type: Object,
            required: true,
        },
    },
    methods: {
        startQuiz(id) {
            this.$emit("start", id); // Gửi sự kiện cho component cha
        },
    },
};
</script>

<style scoped>
.quiz-box {
    max-width: 300px;
    text-align: center;
    margin: 10px;
}
.title {
    color: black;
    font-weight: bold;
}
</style>
