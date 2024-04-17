<template>
    <section class="bg-loader">
        <div class="loader"></div>
    </section>
</template>

<style scoped>
.bg-loader {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 20;
    top: 0;
    left: 0;
    background-color: rgba(83, 83, 83, 0.506);
    margin-top: -100px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.loader {
    width: 40px;
    height: 40px;
    border: 2px solid transparent;
    border-top: 2px solid #D7C27B;
    border-right: 2px solid #D7C27B;
    border-bottom: 2px solid #D7C27B;
    border-radius: 100%;
    animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>