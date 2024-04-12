<script>
export default {
    props: {
        inputName: {
            type: String
        },
        label: {
            type: String
        },
        options: {
            type: Object
        },
    },
    emits: ["update:modelValue"],
    data() {
        return {
            modelValue: '',
        }
    },
    methods: {
        emitContent(event) {
            console.log(event.target.value);
        },
    }
}
</script>

<template>
    <section class="bg-input">
        <label :for="inputName" class="label-input">{{ label }}</label>

        <select :name="inputName" @input="emitContent" class="input">
            <option v-for="(option, index) in options" :value="option.value" :key="option.value" :selected="option.selected === true">{{ option.name }}</option>
        </select>
    </section>
</template>

<style scoped>
.bg-input {
    width: 100%;
    height: auto;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
}

.bg-input .label-input {
    font-size: 16px;
    font-weight: 600;
    color: var(--primary-color);
    margin-bottom: 6px;
}

.bg-input .input {
    width: 100%;
    border: 2px solid var(--primary-color);
    border-radius: 10px;
    padding: 14px 12px;
    font-size: 16px;
}
</style>