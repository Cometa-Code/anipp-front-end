<script>
import Head from '@/components/Head';
import Table from '@/components/Table';
import Loader from '@/components/Loader';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Select from '@/components/Select';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    props: {
        userData: {
            type: Object
        }
    },
    data() {
        return {
            loader: true,
            loadingTable: true,
            hasNextPage: false,
            itemsPerPage: 10,
            actualPage: 0,
            totalItems: 0,
            cashFlowTableCategories: [
                'Tipo',
                'Data',
                'Valor',
                'Número Documento',
                'Código do Histórico',
                'Histórico',
                'Detalhamento do Histórico',
                'Descrição',
            ],
            cashFlowItems: [],
            entrySum: 0,
            exitSum: 0,
            totalSum: 0,
            filtersData: {
                initial_date: '2018-01-01',
                finish_date: this.getCurrentDate(),
            }
        }
    },
    created() {
        if (this.userData.role == 'associate') {
            this.$router.push('/inicio');
        }

        this.getNextCashFlow();
    },
    methods: {
        notify(text, type) {
            toast(text, {
                "type": type == 'info' ? 'info' : type == 'warning' ? 'warning' : type == 'error' ? 'error' : type == 'success' ? 'success' : 'default',
            });
        },
        getCurrentDate() {
            var data = new Date();

            var year = data.getFullYear();
            var monthly = ('0' + (data.getMonth() + 1)).slice(-2);
            var day = ('0' + data.getDate()).slice(-2);

            var formatedDate = year + '-' + monthly + '-' + day;
            return formatedDate;
        },
        getRecoverFilter() {
            this.loader = true;

            this.actualPage = 0;
            this.totalItems = 0;
            this.cashFlowItems = [];

            this.loadingTable = true;

            this.$axios.get(`/cash_flow?initial_date=${this.filtersData.initial_date}&finish_date=${this.filtersData.finish_date}&items_per_page=${this.itemsPerPage}&page=${this.actualPage + 1}`)
            .then(res => {
                console.log(res);
                if (!res.data.data) {
                    return this.notify('Ocorreu um erro ao buscar o histórico do fluxo de caixa!', 'error')
                };

                const data = res.data.data;

                this.actualPage += 1;
                
                this.totalItems = data.data.total;

                data.data.next_page_url == null ? this.hasNextPage = false : this.hasNextPage = true;

                this.entrySum = data.entry_sum;
                this.exitSum = data.exit_sum;
                this.totalSum = data.final_sum;

                data.data.data.forEach((item) => {
                    let cashFlows = [];

                    cashFlows.push(item.type);
                    cashFlows.push(item.date);
                    cashFlows.push(`R$ ${item.value.replace('.', ',')}`);
                    cashFlows.push(item.document_number);
                    cashFlows.push(item.history_code);
                    cashFlows.push(item.history);
                    cashFlows.push(item.history_detail);
                    cashFlows.push(item.description);

                    this.cashFlowItems.push(cashFlows);
                });

                this.loader = false;
            })
            .catch(err => {
                this.loader = false;
                return this.notify('Ocorreu um erro ao buscar o histórido do fluxo de caixa.', 'error');
            });
        },
        getNextCashFlow() {
            this.loadingTable = true;

            this.$axios.get(`/cash_flow?initial_date=${this.filtersData.initial_date}&finish_date=${this.filtersData.finish_date}&items_per_page=${this.itemsPerPage}&page=${this.actualPage + 1}`)
            .then(res => {
                console.log(res);
                if (!res.data.data) {
                    return this.notify('Ocorreu um erro ao buscar o histórico do fluxo de caixa!', 'error')
                };

                const data = res.data.data;

                this.actualPage += 1;
                
                this.totalItems = data.data.total;

                data.data.next_page_url == null ? this.hasNextPage = false : this.hasNextPage = true;

                this.entrySum = data.entry_sum;
                this.exitSum = data.exit_sum;
                this.totalSum = data.final_sum;

                data.data.data.forEach((item) => {
                    let cashFlows = [];

                    cashFlows.push(item.type);
                    cashFlows.push(item.date);
                    cashFlows.push(`R$ ${item.value.replace('.', ',')}`);
                    cashFlows.push(item.document_number);
                    cashFlows.push(item.history_code);
                    cashFlows.push(item.history);
                    cashFlows.push(item.history_detail);
                    cashFlows.push(item.description);

                    this.cashFlowItems.push(cashFlows);
                });

                this.loader = false;
            })
            .catch(err => {
                this.loader = false;
                return this.notify('Ocorreu um erro ao buscar o histórido do fluxo de caixa.', 'error');
            });
        },
    },
    components: { Head, Table, Button, Input, Select, Loader }
}
</script>

<template>
    <Loader v-if="loader" />

    <section class="bg-cash-flow">
        <Head title="Fluxo de Caixa" />

        <section class="filters">
            <Input type="date" label="Desde de:" placeholder="10/01/2023" :value="filtersData.initial_date" v-model="filtersData.initial_date" />
            <div class="form-line-space"></div>
            <Input type="date" label="Até:" placeholder="10/01/2023" :value="filtersData.finish_date" v-model="filtersData.finish_date" />
            <div class="form-line-space"></div>
            <Button type="primary" placeholder="Filtrar" class="" @buttonPressed="getRecoverFilter" />
        </section>

        <section v-if="!loader" class="bg-cards">
            <div class="card">
                <h2>Entradas</h2>
                <p class="green">R$ {{ parseFloat(entrySum).toFixed(2).replace('.', ',') }}</p>
            </div>

            <div class="card">
                <h2>Saídas</h2>
                <p class="red">R$ {{ parseFloat(exitSum).toFixed(2).replace('.', ',') }}</p>
            </div>

            <div class="card">
                <h2>Valor total</h2>
                <p class="blue">R$ {{ totalSum.toFixed(2).replace('.', ',') }}</p>
            </div>
        </section>

        <Table v-if="!loader" :hasActions="false" :hasNextPage="hasNextPage" :headers="cashFlowTableCategories" :contents="cashFlowItems" @loadMore="getNextCashFlow" />
    </section>
</template>

<style scoped>
.bg-cash-flow {
    width: 100%;
    height: auto;
    margin-bottom: 150px;
}

.bg-cards {
    width: 100%;
    height: auto;
    padding: 10px 0px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.card {
    width: 250px;
    max-width: 100%;
    margin-right: 10px;
    background-color: white;
    padding: 16px 20px;
    border: 1px solid rgb(184, 184, 184);
    border-radius: 10px;
}

.card h2 {
    font-size: 18px;
    margin-bottom: 8px;
    font-weight: 500;
}

.card p {
    font-size: 22px;
    font-weight: 550;
}

.green {
    color: green;
}

.red {
    color: rgb(217, 0, 0);
}

.blue {
    color: rgb(78, 78, 255);
}

.filters {
    max-width: 300px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

@media screen and (max-width: 800px) {
    .filters {
        flex-direction: column;
        width: 100%;
        max-width: 100%;
    }

    .bg-cards {
        flex-direction: column;
    }

    .card {
        width: 100%;
        margin-top: 10px;
    }
}
</style>