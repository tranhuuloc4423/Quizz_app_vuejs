<template>
    <div class="w-full flex flex-col gap-4 items-center">
        <h1 class="text-4xl font-semibold mt-4">Quizzes Table</h1>

        <div class="w-2/3 mx-auto">
            <v-card flat>
                <v-card-title
                    class="d-flex align-center pe-2"
                    title="Quiz Management"
                >
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

                <div
                    v-if="loading"
                    class="w-full mt-[100px] flex justify-center items-center"
                >
                    <v-progress-circular
                        color="green"
                        size="64"
                        indeterminate
                    ></v-progress-circular>
                </div>
                <v-data-table
                    :headers="headers"
                    :items="items"
                    :search="search"
                    style="border: 1px solid; border-collapse: collapse';"
                    v-if="!loading"
                >
                    <template v-slot:[`item.correctRate`]="{ item }">
                        <div>
                            <v-chip
                                :color="
                                    item.correctRate >= 50 ? 'green' : 'red'
                                "
                                :text="item.correctRate"
                                class="text-uppercase"
                                size="small"
                                label
                            ></v-chip>
                        </div>
                    </template>
                    <template v-slot:[`item.incorrectRate`]="{ item }">
                        <div>
                            <v-chip
                                :color="
                                    item.incorrectRate >= 50 ? 'green' : 'red'
                                "
                                :text="item.incorrectRate"
                                class="text-uppercase"
                                size="small"
                                label
                            ></v-chip>
                        </div>
                    </template>
                </v-data-table>
            </v-card>
        </div>
    </div>
</template>

<script>
import axios from "../utils/axios";
export default {
    data() {
        return {
            search: "",
            loading: false,
            headers: [
                {
                    align: "center",
                    key: "name",
                    sortable: false,
                },
                { key: "participant", title: "Participant" },
                { key: "questions", title: "Questions" },
                { key: "correctRate", title: "CorrectRate" },
                { key: "incorrectRate", title: "InCorrectRate" },
            ],
            items: [
                {
                    participant: "name",
                    questions: 0,
                    correctRate: 0,
                    incorrectRate: 0,
                },
            ],
        };
    },
    methods: {
        async getQuizResults() {
            try {
                this.loading = true;
                const res = await axios.get(
                    `/quiz-result/quiz/${this.$route.params.id}`
                );
                console.log(res.data);
                this.items = this.convertQuizResultFromDB(res.data);
                this.loading = false;
            } catch (error) {
                this.loading = false;
                console.log(error);
            }
        },
        convertQuizResultFromDB(data) {
            return data.map((item) => ({
                participant: item.participant.name,
                questions: item.answers.length,
                correctRate: item.correctRate,
                incorrectRate: item.incorrectRate,
            }));
        },
    },
    mounted() {
        this.getQuizResults();
    },
};
</script>
