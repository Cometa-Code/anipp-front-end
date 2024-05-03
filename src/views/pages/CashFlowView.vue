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
            },
            modalManualHistory: false,
            addManualHistoryData: {
                type: "Entrada",
                date: this.getCurrentDate(),
                origin_agency: '',
                allotment: '',
                document_number: '',
                history_code: '',
                history: '',
                history_detail: '',
                value: 0,
                description: '',
            },
            typeSelectManualHistory: [
                {
                    name: 'Entrada',
                    value: 'Entrada',
                    selected: true
                },
                {
                    name: 'Saida',
                    value: 'Saida',
                    selected: false
                },
            ],
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
        addCashFlow() {
            this.loader = true;

            this.$axios.post('/cash_flow', this.addManualHistoryData)
            .then(res => {
                this.notify('Histórico adicionado com sucesso!', 'success');

                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            })
            .catch(err => {
                this.notify('Ocorreu um erro ao tentar adicionar um histórico novo.', 'error');
                this.loader = false;
            });
        },
        closeModalManualHistory() {
            this.addManualHistoryData = {
                type: "Entrada",
                date: this.getCurrentDate(),
                origin_agency: '',
                allotment: '',
                document_number: '',
                history_code: '',
                history: '',
                history_detail: '',
                value: 0,
                description: '',
            };

            this.modalManualHistory = false;
        }
    },
    components: { Head, Table, Button, Input, Select, Loader }
}
</script>

<template>
    <Loader v-if="loader" />

    <section v-if="modalManualHistory" class="bg-add-associate">
        <Head title="Adicionar histórico manual" />

        <div @click="closeModalManualHistory" class="close-add-associate">
            x
        </div>

        <section class="form-add-associate">
            <div class="form-add-associate-line">
                <Select label="Tipo" :options="typeSelectManualHistory" :value="addManualHistoryData.type" v-model="addManualHistoryData.type" />
                <div class="form-add-associate-line-space"></div>
                <Input type="date" label="Data" placeholder="10/01/2023" :value="addManualHistoryData.date" v-model="addManualHistoryData.date" />
                <div class="form-add-associate-line-space"></div>
                <Input type="text" label="Agência de origem" placeholder="0001" :value="addManualHistoryData.origin_agency" v-model="addManualHistoryData.origin_agency" :onlyNumbers="true" />
            </div>

            <div class="form-add-associate-line">
                <Input type="text" label="Lote" placeholder="54875" :value="addManualHistoryData.allotment" v-model="addManualHistoryData.allotment" :onlyNumbers="true" />
                <div class="form-add-associate-line-space"></div>
                <Input type="text" label="Número do documento" placeholder="54875" :value="addManualHistoryData.document_number" v-model="addManualHistoryData.document_number" :onlyNumbers="true" />
                <div class="form-add-associate-line-space"></div>
                <Input type="text" label="Código do histórico" placeholder="877" :value="addManualHistoryData.history_code" v-model="addManualHistoryData.history_code" :onlyNumbers="true" />
            </div>

            <div class="form-add-associate-line">
                <Input type="text" label="Histórico" placeholder="Transferência recebida" :value="addManualHistoryData.history" v-model="addManualHistoryData.history" />
                <div class="form-add-associate-line-space"></div>
                <Input type="text" label="Detalhamento do histórico" placeholder="02/01 10:20 FULANO CICLANO" :value="addManualHistoryData.history_detail" v-model="addManualHistoryData.history_detail" />
                <div class="form-add-associate-line-space"></div>
                <Input type="text" label="Valor" placeholder="200.00" :value="addManualHistoryData.value" v-model="addManualHistoryData.value" :currencyMask="true" />
            </div>

            <div class="form-add-associate-line">
                <Input type="text" label="Descrição" placeholder="Recebimento de mensalidade de Fulano Ciclano" :value="addManualHistoryData.description" v-model="addManualHistoryData.description" />
            </div>

            <div class="form-add-associate-button">
                <Button type="primary" placeholder="Adicionar histórico" @buttonPressed="addCashFlow" />
            </div>
        </section>
    </section>

    <section class="bg-cash-flow">
        <Head title="Fluxo de Caixa" />

        <section class="actions">
            <Button type="primary" placeholder="+ Histórico manual" class="btn" @buttonPressed="modalManualHistory = true" />
            <div class="form-line-space"></div>
            <Button type="primary" placeholder="+ Carregar extrato" class="btn" @buttonPressed="" />
        </section>

        <section class="filters">
            <Input type="date" label="Desde de:" placeholder="10/01/2023" :value="filtersData.initial_date" v-model="filtersData.initial_date" />
            <div class="form-line-space"></div>
            <Input type="date" label="Até:" placeholder="10/01/2023" :value="filtersData.finish_date" v-model="filtersData.finish_date" />
            <div class="form-line-space"></div>
            <Button type="primary" placeholder="Filtrar" class="btn" @buttonPressed="getRecoverFilter" />
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
.bg-add-associate {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 18;
    top: 0;
    left: 0;
    background-color: white;
    overflow-y: auto;
    padding: 0px 30px;
}

.form-add-associate {
    margin-bottom: 150px;
}

.bg-add-associate .close-add-associate {
    position: absolute;
    top: 22px;
    right: 30px;
    cursor: pointer;
    font-size: 18px;
}

.form-add-associate .form-add-associate-line {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 1600px;
    margin: 0px auto;
    margin-bottom: 20px;
}

.form-add-associate .form-add-associate-line .form-add-associate-line-space {
    margin: 0px 10px;
}

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

.filters .btn {
    margin-top: 25px;
}

.actions {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 20px;
    max-width: 600px;
}

@media screen and (max-width: 800px) {
    .form-add-associate .form-add-associate-line {
        flex-direction: column;
    }

    .form-add-associate .form-add-associate-line-space {
        margin: 10px 0px !important;
    }

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

    .filters .btn {
        margin-top: 10px;
    }

    .actions {
        flex-direction: column;
        max-width: 100%;
    }
}
</style>