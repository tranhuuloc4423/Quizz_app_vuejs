<template>
    <div
        class="border border-[#c5c5c5] rounded-lg shadow-md p-4 bg-white hover:scale-[0.99] transition-all"
    >
        <div
            class="w-full h-[150px] mx-auto bg-green-500 rounded-md flex flex-col items-center justify-between px-4 py-2"
        >
            <v-menu>
                <template v-slot:activator="{ props }">
                    <div class="align-self-end cursor-pointer" v-bind="props">
                        <font-awesome-icon
                            icon="ellipsis"
                            size="2x"
                            color="white"
                        />
                    </div>
                </template>

                <v-list>
                    <v-list-item
                        @click="onEdit"
                        class="cursor-pointer hover:bg-green-200"
                    >
                        <font-awesome-icon icon="pen-to-square" />
                        <span class="ml-2">Edit</span>
                    </v-list-item>
                    <v-list-item
                        @click="onRemove"
                        class="cursor-pointer hover:bg-green-200"
                        ><font-awesome-icon icon="trash-can" />
                        <span class="ml-2">Remove</span>
                    </v-list-item>
                </v-list>
            </v-menu>

            <div>
                <font-awesome-icon icon="laptop-code" size="3x" color="white" />
            </div>
            <div class="h-[28px]"></div>
        </div>
        <div class="flex flex-col gap items-start mt-2">
            <div class="text-xl font-semibold mb-2 nowrap w-[95%] text-left">
                Quiz: {{ quiz.title }}
            </div>
            <span class="text-lg font-medium mb-2">
                {{ quiz.questions.length }} question(s)
            </span>
            <span class="text-lg font-medium mb-2">
                {{ quiz.participantCount }} participant(s)
            </span>
            <span>
                <font-awesome-icon icon="circle-check" size="xl" />
                Success rate
                {{ Math.round(quiz.correctRate) }} %</span
            >
        </div>
        <div
            class="flex justify-between mt-4 items-center md:flex-col lg:flex-col xl:flex-row md:gap-2 lg:gap-2 xl:gap-0"
        >
            <v-btn @click="onView" variant="outlined" color="green">
                View Quiz
            </v-btn>
            <v-dialog max-width="500">
                <template v-slot:activator="{ props: activatorProps }">
                    <v-btn
                        v-bind="activatorProps"
                        text="Share Quiz"
                        variant="outlined"
                        color="green"
                    ></v-btn>
                </template>

                <template v-slot:default="{ isActive }">
                    <v-card title="Share your quiz or scan the QR code">
                        <div
                            class="flex flex-col items-center justify-between gap-2"
                        >
                            <vue-qr
                                :text="`localhost:8080/take-quiz/${quiz._id}`"
                                :size="200"
                                class="border rounded-md"
                            ></vue-qr>
                            <div>Quiz: {{ quiz.title }}</div>
                            <v-btn
                                variant="outlined"
                                color="green"
                                @click="CopyUrl"
                                text="Copy link"
                            ></v-btn>
                        </div>

                        <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn
                                variant="outlined"
                                color="green"
                                text="Ok"
                                @click="isActive.value = false"
                            ></v-btn>
                        </v-card-actions>
                    </v-card>
                </template>
            </v-dialog>
        </div>
    </div>
</template>

<script>
import vueQr from "vue-qr/src/packages/vue-qr.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default {
    components: { vueQr },
    props: {
        quiz: {
            type: Object,
            required: true,
        },
    },
    methods: {
        onEdit() {
            if (this.quiz.participantCount > 0) {
                toast.warning("You can't edit a quiz that has been taken!");
                return;
            }
            this.$router.push({
                path: `/create-quiz/`,
                query: {
                    id: this.quiz._id,
                    edit: true,
                },
            });
        },
        onRemove() {
            this.$emit("remove-quiz", this.quiz);
        },
        onView() {
            location.href = `/manage-quiz/${this.quiz._id}`;
        },
        async CopyUrl() {
            try {
                await navigator.clipboard.writeText(
                    `https://quizz-app-vuejs.vercel.app/take-quiz/${this.quiz._id}`
                );
                toast.success("Copied to clipboard!");
            } catch (err) {
                console.error("Failed to copy: ", err); // Xử lý lỗi
                toast.success("Failed to copy!");
            }
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
.nowrap {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
