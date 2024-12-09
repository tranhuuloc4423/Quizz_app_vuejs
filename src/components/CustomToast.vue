<template>
    <div
        v-if="visible"
        class="custom-toast"
        :style="{
            border: '1px solid',
            borderColor: color,
            color: color,
            backgroundColor: 'white',
        }"
    >
        {{ message }}
        <button
            @click="closeToast"
            :style="{ color: color, marginLeft: '10px' }"
        >
            &times;
        </button>
    </div>
</template>

<script>
export default {
    name: "CustomToast",
    props: {
        message: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            default: "success", // Màu nền mặc định
        },
        duration: {
            type: Number,
            default: 5000,
        },
    },
    data() {
        return {
            visible: false,
        };
    },
    methods: {
        show() {
            this.visible = true;
            setTimeout(() => {
                this.visible = false;
            }, this.duration);
        },
        closeToast() {
            this.visible = false;
        },
    },
    computed: {
        colorMap() {
            return {
                success: "#16a34a",
                error: "#dc2626",
                warning: "#ca8a04",
                info: "#2563eb",
            };
        },
    },
    mounted() {
        this.color = this.colorMap[this.state] || "#000000";
        this.show();
    },
};
</script>

<style scoped>
.custom-toast {
    position: fixed;
    top: 100px;
    right: 100px;
    font-size: 16px;
    z-index: 9999;
    padding: 10px 20px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    animation: fade-in-out 0.3s ease-in-out;
}
@keyframes fade-in-out {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
