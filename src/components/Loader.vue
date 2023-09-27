<template>
    <v-overlay :model-value="onLoading" class="align-center justify-center" persistent style="z-index: 3999">
        <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
    </v-overlay>
</template>

<script>
export default {
    props: {
        onLoading: {
            type: Boolean,
            default: false,
        },
    },
}
</script>
