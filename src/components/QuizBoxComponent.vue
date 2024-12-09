<template>
    <div
        class="border border-[#c5c5c5] rounded-lg shadow-md p-4 bg-white hover:scale-[0.98] transition-all"
    >
        <div
            class="w-full h-[150px] mx-auto bg-green-600 rounded-md flex flex-col items-center justify-between px-4 py-2"
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
                    <v-list-item class="cursor-pointer hover:bg-green-500">
                        <font-awesome-icon icon="pen-to-square" />
                        <span class="ml-2">Edit</span>
                    </v-list-item>
                    <v-list-item class="cursor-pointer hover:bg-green-500"
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
            <span class="text-xl font-semibold mb-2">
                Quiz: {{ quiz.title }}
            </span>
            <span class="text-lg font-medium mb-2">
                {{ quiz.questions.length }} question(s)
            </span>
            <span class="text-lg font-medium mb-2">
                {{ quiz.participantCount }} participants(s)
            </span>
            <span>
                <font-awesome-icon icon="circle-check" size="xl" />
                Success rate
                {{ quiz.correctRate }} %</span
            >
        </div>
        <div class="flex flex-col justify-between items-center">
            <v-btn
                class="w-fit mt-4 px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700"
            >
                View Quiz
            </v-btn>
            <v-dialog max-width="500">
                <template v-slot:activator="{ props: activatorProps }">
                    <v-btn
                        v-bind="activatorProps"
                        text="Share Quiz"
                        class="mt-4 px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700"
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
                            <button @click="CopyUrl">Copy link</button>
                        </div>

                        <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn
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
export default {
    components: { vueQr },
    props: {
        quiz: {
            type: Object,
            required: true,
        },
    },
    methods: {
        methods: {
            onEdit() {
                // Thực hiện hành động khi nhấn Edit
                this.$emit("edit-quiz", this.quiz);
            },
            onRemove() {
                // Thực hiện hành động khi nhấn Remove
                this.$emit("remove-quiz", this.quiz);
            },
            onView() {
                // Thực hiện hành động khi nhấn View Quiz
                this.$emit("view-quiz", this.quiz);
            },
            async CopyUrl() {
                try {
                    await navigator.clipboard.writeText(
                        `localhost:8080/take-quiz/${this.quiz.title}`
                    );
                    alert("URL copied to clipboard!"); // Thông báo thành công
                } catch (err) {
                    console.error("Failed to copy: ", err); // Xử lý lỗi
                }
            },
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
