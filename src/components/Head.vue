<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        }
    }
}
</script>

<template>
    <section class="bg-header">
        <h1>{{ title }}</h1>
    </section>
</template>

<style scoped>
.bg-header {
    width: 100%;
    padding: 20px 0px;
}

h1 {
    font-size: 22px;
    color: #2E2E2E;
}
</style>