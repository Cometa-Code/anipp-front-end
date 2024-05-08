<script>
export default {
    props: {
        type: {
            type: String
        },
        placeholder: {
            type: String
        }
    },
}
</script>

<template>
    <section class="bg-button">
        <button @click="$emit('buttonPressed')" :class="[type == 'primary' ? 'primary' : type == 'secondary' ? 'secondary' : 'tertiary']">
            <slot></slot> {{ placeholder }}
        </button>
    </section>
</template>

<style scoped>
.bg-button {
    width: 100%;
    height: auto;
}

button {
    width: 100%;
    font-size: 16px;
}

.primary,
.secondary {
    border-radius: 10px;
    font-weight: 600;
    font-size: 18px;
    cursor: pointer;
    letter-spacing: 0.8px;
    padding: 14px;
    transition: 0.2s;
}

.primary {
    background-color: var(--primary-color);
    border: 2px solid var(--primary-color);
    color: var(--white-color);
}

.primary:hover {
    background-color: transparent;
    color: var(--primary-color);
    transition: 0.2s;
}

.secondary {
    background-color: transparent;
    border: 2px solid var(--primary-color);
    color: var(--primary-color);
}

.secondary:hover {
    background-color: var(--primary-color);
    color: var(--white-color);
    transition: 0.2s;
}

.tertiary {
    background-color: transparent;
    border: none;
    color: var(--primary-color);
    cursor: pointer;
    margin-top: 5px;
    font-weight: 500;
}
</style>