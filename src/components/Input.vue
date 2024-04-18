<script>
export default {
    props: {
        type: {
            type: String
        },
        placeholder: {
            type: String
        },
        inputName: {
            type: String
        },
        label: {
            type: String
        },
        onlyNumbers: {
            type: Boolean
        },
        currencyMask: {
            type: Boolean
        },
        modelValue: {
            type: String
        },
        value: {
            type: String
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
            if (this.currencyMask) {
                    const newValue = event.target.value.replace(/\D/g, '');
                    event.target.value = newValue;

                    var n = undefined;
                    
                    if (newValue.length > 2) {
                        n = newValue.slice(0, -2) + '.' + newValue.slice(-2);

                        return this.$emit('update:modelValue', n);
                    }

                    return this.$emit('update:modelValue', newValue);
                }

            if (this.onlyNumbers) {
                const newValue = event.target.value.replace(/\D/g, '');
                event.target.value = newValue;

                this.$emit('update:modelValue', newValue);
            } else {
                this.$emit('update:modelValue', event.target.value);
            }
        },
    }
}
</script>

<template>
    <section class="bg-input">
        <label :for="inputName" class="label-input">{{ label }}</label>

        <input :type="type" :placeholder="placeholder" :name="inputName" class="input" @input="emitContent" :input="modelValue" :value="value" />
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