<template>
    <v-card flat>
        <v-card-title class="d-flex align-center pe-2" title="Quiz Management">
            Find a Quiz

            <v-spacer></v-spacer>

            <v-text-field
                v-model="search"
                density="compact"
                label="Search"
                prepend-inner-icon="mdi-magnify"
                variant="solo-filled"
                flat
                hide-details
                single-line
            ></v-text-field>
        </v-card-title>

        <v-divider></v-divider>
        <v-data-table
            v-model:search="search"
            :filter-keys="['title']"
            :items="items"
            style="border: 1px solid; border-collapse: separate"
        >
            <template v-slot:[`item.title`]="{ item }">
                <div class="text-center">{{ item.title }}</div>
            </template>

            <template v-slot:[`item.questions`]="{ item }">
                <div class="text-center">{{ item.questions }}</div>
            </template>

            <template v-slot:[`item.participants`]="{ item }">
                <div class="text-center">{{ item.participants }}</div>
            </template>

            <template v-slot:[`item.correctRate`]="{ item }">
                <div class="text-center">
                    <v-chip
                        :color="item.correctRate > 50 ? 'green' : 'red'"
                        :text="item.correctRate"
                        class="text-uppercase"
                        size="small"
                        label
                    ></v-chip>
                </div>
            </template>
            <template v-slot:[`item.incorrectRate`]="{ item }">
                <div class="text-center">
                    <v-chip
                        :color="item.incorrectRate > 50 ? 'green' : 'red'"
                        :text="item.incorrectRate"
                        class="text-uppercase"
                        size="small"
                        label
                    ></v-chip>
                </div>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            search: "",
            items: [
                {
                    title: "React Quiz",
                    questions: 10,
                    participants: 10,
                    correctRate: 40,
                    incorrectRate: 60,
                },
                {
                    title: "Vue.js Basics",
                    questions: 12,
                    participants: 15,
                    correctRate: 65,
                    incorrectRate: 35,
                },
                {
                    title: "JavaScript Fundamentals",
                    questions: 20,
                    participants: 25,
                    correctRate: 55,
                    incorrectRate: 45,
                },
                {
                    title: "CSS Mastery",
                    questions: 15,
                    participants: 30,
                    correctRate: 70,
                    incorrectRate: 30,
                },
                {
                    title: "HTML5 Knowledge",
                    questions: 10,
                    participants: 20,
                    correctRate: 80,
                    incorrectRate: 20,
                },
                {
                    title: "TypeScript Basics",
                    questions: 12,
                    participants: 18,
                    correctRate: 50,
                    incorrectRate: 50,
                },
                {
                    title: "Node.js Essentials",
                    questions: 10,
                    participants: 22,
                    correctRate: 45,
                    incorrectRate: 55,
                },
                {
                    title: "Python for Beginners",
                    questions: 20,
                    participants: 28,
                    correctRate: 60,
                    incorrectRate: 40,
                },
                {
                    title: "SQL Queries",
                    questions: 18,
                    participants: 25,
                    correctRate: 75,
                    incorrectRate: 25,
                },
                {
                    title: "PHP Quiz",
                    questions: 15,
                    participants: 12,
                    correctRate: 35,
                    incorrectRate: 65,
                },
                {
                    title: "Blockchain Basics",
                    questions: 10,
                    participants: 14,
                    correctRate: 55,
                    incorrectRate: 45,
                },
                {
                    title: "Java Master Quiz",
                    questions: 25,
                    participants: 35,
                    correctRate: 60,
                    incorrectRate: 40,
                },
                {
                    title: "C++ Problem Solving",
                    questions: 18,
                    participants: 20,
                    correctRate: 65,
                    incorrectRate: 35,
                },
                {
                    title: "Rust Language Intro",
                    questions: 10,
                    participants: 8,
                    correctRate: 50,
                    incorrectRate: 50,
                },
                {
                    title: "Django Basics",
                    questions: 12,
                    participants: 16,
                    correctRate: 40,
                    incorrectRate: 60,
                },
            ],
        };
    },
};
</script>
