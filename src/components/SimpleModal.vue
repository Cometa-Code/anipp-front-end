<script>
export default {
    props: {
        title: {
            type: Boolean
        }
    },
    methods: {
        clickOnBackground() {
            return this.$emit('close', 'background')
        },
        clickOnCloseButton() {
            return this.$emit('close', 'button');
        }
    }
}
</script>

<template>
    <section class="bg-simple-modal" @click="clickOnBackground">
    </section>

    <section class="bg-modal-simple-modal">
        <div class="simple-modal">
            <header>
                <h2>Associado</h2>
            </header>

            <article>
                <slot></slot>
            </article>

            <footer>
                <button class="button-close" @click="clickOnCloseButton">Fechar</button>
            </footer>
        </div>
    </section>
</template>

<style scoped>
.bg-simple-modal {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.316);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
    margin-top: -100px !important;
    display: flex;
    align-items: center;
    justify-content: center;
}

.bg-modal-simple-modal {
    position: absolute;
    top: 0;
    left: 0;
    max-height: 100%;
    z-index: 11;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-top: -100px !important;
    width: 100%;
    overflow-x: auto;
}

.simple-modal {
    width: 650px;
    max-width: 98%;
    height: auto;
    position: relative;
    margin-top: 60px;
    margin-bottom: 20px;
}

.simple-modal header {
    width: 100%;
    padding: 20px 30px;
    border-radius: 10px 10px 0px 0px;
    border: 1px solid gray;
    background-color: white;
}

.simple-modal header h2 {
    font-size: 18px;
    font-weight: 550;
    color: #2E2E2E;
}

.simple-modal article {
    width: 100%;
    padding: 20px 30px;
    height: auto;
    background-color: white;
    border: 1px solid gray;
    border-top: none;
}

.simple-modal footer {
    width: 100%;
    padding: 20px 30px;
    border-radius: 0px 0px 10px 10px;
    border: 1px solid gray;
    border-top: none;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.simple-modal footer .button-close {
    padding: 10px 30px;
    background-color: rgb(233, 233, 233);
    font-size: 16px;
    font-weight: 500;
    color: rgb(59, 59, 59);
    border: 1px solid rgb(184, 184, 184);
    border-radius: 5px;
    cursor: pointer;
    transition: .2s;
}

.simple-modal footer .button-close:hover {
    background-color: rgb(215, 215, 215);
    transition: .2s;
}
</style>