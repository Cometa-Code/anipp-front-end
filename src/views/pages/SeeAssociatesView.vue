<script>
import Head from '@/components/Head';
import Table from '@/components/Table';

export default {
    props: {
        userData: {
            type: Object
        }
    },
    components: { Head, Table }
}
</script>

<template>
    <section class="bg-see-associates">
        <Head title="Associados" />
        <p id="see-associates-total">Total de associados: <span id="see-associates-total-number">50</span></p>

        <Table :hasActions="true">
            E F B
        </Table>
    </section>
</template>

<style scoped>
.bg-see-associates {
    width: 100%;
    height: 100vh;
    margin-bottom: 100px;
}

.bg-see-associates #see-associates-total {
    font-size: 18px;
    font-weight: 500;
    color: #2E2E2E;
    margin-bottom: 20px;
}

.bg-see-associates #see-associates-total #see-associates-total-number {
    color: rgb(0, 123, 255);
    font-weight: 600;
}
</style>