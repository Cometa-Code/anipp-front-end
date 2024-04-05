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
        hasActions: {
            type: Boolean
        },
    }
}
</script>

<template>
    <section class="bg-table">
        <table class="table">
            <tr class="table-head">
                <th class="table-head-item">Nome</th>
                <th class="table-head-item">Email</th>
                <th class="table-head-item">Documento</th>
                <th class="table-head-item">Matrícula</th>
                <th class="table-head-item">Estado Financeiro</th>
                <th class="table-head-item">Alguma coisa</th>
                <th class="table-head-item">Alguma outra coisa</th>
                <th v-if="hasActions" class="table-head-item">Ações</th>
            </tr>

            <tr class="table-content table-content-item-gray">
                <td class="table-content-item">Vitor Lauvers Barroso</td>
                <td class="table-content-item">vitorlauvresbarroso@gmail.com</td>
                <td class="table-content-item">000.000.000-00</td>
                <td class="table-content-item">25484819-5</td>
                <td class="table-content-item">Em dia</td>
                <td class="table-content-item">Resposta para alguma coisa</td>
                <td class="table-content-item">Resposta para alguma ou coisa</td>
                <td v-if="hasActions" class="table-content-item">
                    <slot></slot>
                </td>
            </tr>
        </table>
    </section>

    <section class="load-more">
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
    height: 46px;
    color: #2E2E2E;
    font-weight: 650;
}

.table-content-item-gray {
    background-color: rgb(232, 232, 232);
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
</style>