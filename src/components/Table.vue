<script>
export default {
    props: {
        headers: {
            type: Object,
            required: true
        },
        contents: {
            type: Object,
            required: true
        },
        actions: {
            type: Object,
            required: true
        },
        hasActions: {
            type: Boolean
        },
        hasNextPage: {
            type: Boolean
        },
    },
    methods: {
        emitClickEvent() {
            return this.$emit('loadMore');
        },
        emitActionEvent(event, data = []) {
            return this.$emit('clickAction', { eventType: event, data: data });
        }
    }
}
</script>

<template>
    <section class="bg-table">
        <table class="table">
            <tr class="table-head">
                <th v-for="item in headers" class="table-head-item">{{ item }}</th>
                <th v-if="hasActions" class="table-head-item">Ações</th>
            </tr>

            <tr v-for="(item, index) in contents" :class="[(index % 2) === 0 ? 'table-content-item-gray' : '', 'table-content']">
                <td v-for="itemData in item" class="table-content-item">{{ itemData }}</td>
                <td v-if="hasActions" class="table-content-item">
                    <div class="see-associates-action-icons">
                        <svg @click="emitActionEvent('document-text', item)" v-if="actions.includes('document-text')" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
                        <!-- Ver usuário -->
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>

                        <!-- Editar -->
                        <svg @click="emitActionEvent('pencil-square', item)" v-if="actions.includes('pencil-square')" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>

                        <!-- Financeiro -->
                        <svg @click="emitActionEvent('dollar', item)" v-if="actions.includes('dollar')" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>
                </td>
            </tr>
        </table>
    </section>

    <section @click="emitClickEvent" v-if="hasNextPage" class="load-more">
        <p>Clique para carregar mais</p>
    </section>
</template>

<style scoped>
.bg-table {
    width: 100%;
    overflow-x: auto;
}

/* Estilo para ajustar a tabela */
.table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    position: relative;
}

.table-head-item {
    border-bottom: 1px solid rgb(165, 165, 165);
    height: 55px;
    color: #2E2E2E;
    font-weight: 650;
}

.table-content-item-gray {
    background-color: rgb(237, 237, 237);
}

.table-head-item, .table-content-item {
    padding: 8px 12px;
    text-align: left;
    white-space: nowrap; /* Evita que o texto seja quebrado */
}

.table-content-item {
    padding-top: 15px;
    padding-bottom: 15px;
}

.load-more {
    width: 100%;
    text-align: center;
    padding: 10px 0px;
    background-color: #F5F1E5;
    border: 1px solid #C0AB61;
    color: #C0AB61;
    font-weight: 600;
    border-radius: 0px 0px 5px 5px;
    cursor: pointer;
}

.see-associates-action-icons .icon {
    width: 22px;
    cursor: pointer;
    margin-right: 5px;
    color: rgb(156, 130, 38);
    transition: .3s;
}

.see-associates-action-icons .icon:hover {
    color: rgb(187, 160, 63);
    transition: .3s;
}
</style>