<template>
    <div v-if="loading" class="w-full">
        <div class="text-center">
            <v-overlay
                :model-value="loading"
                class="align-center justify-center"
            >
                <v-progress-circular
                    color="green"
                    size="64"
                    indeterminate
                ></v-progress-circular>
            </v-overlay>
        </div>
    </div>
</template>

<script>
export default {
    name: "LoadingOverlay",
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
    },
};
</script>
