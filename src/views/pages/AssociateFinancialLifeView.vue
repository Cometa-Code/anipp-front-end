<script>
import Head from '@/components/Head';
import Table from '@/components/Table';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Select from '@/components/Select';
import Loader from '@/components/Loader';
import SimpleModal from '@/components/SimpleModal';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    data() {
        return {
            loader: false,
            loadingTable: true,
            hasNextPage: false,
            itemsPerPage: 10,
            actualPage: 0,
            totalItems: 0,
            associateTableCategories: [
                'Método de pagamento',
                'Tipo de pagamento',
                'Data de pagamento',
                'Valor do crédito',
                'Taxa de adesão',
                'Encargos',
                'Honorários',
                'Total pago',
                'Observações',
            ],
            totalSumPayments: 0,
            financial_situation: '',
            associate_name: '',
            payments: [],
            paymentsFullInfos: [],
        }
    },
    props: {
        userData: {
            type: Object
        }
    },
    created() {
        if (this.userData.role == 'associate') {
            this.$router.push('/inicio');
        }

        this.getNextPayment();
    },
    methods: {
        notify(text, type) {
            toast(text, {
                "type": type == 'info' ? 'info' : type == 'warning' ? 'warning' : type == 'error' ? 'error' : type == 'success' ? 'success' : 'default',
            });
        },
        getNextPayment() {
            this.loadingTable = true;

            this.$axios.get(`/payments/${this.$route.params.id}?items_per_page=${this.itemsPerPage}&page=${this.actualPage + 1}`)
            .then(res => {
                if (!res.data.data) {
                    return this.notify('Ocorreu um erro ao buscar o financeiro do usuário', res.data)
                };
                const data = res.data.data;
                
                this.actualPage += 1;
                
                this.totalItems = data.data.total;
                
                data.data.next_page_url == null ? this.hasNextPage = false : this.hasNextPage = true;
                
                this.totalSumPayments = data.totalSumPayments;
                this.financial_situation = data.associate_data.financial_situation;

                this.associate_name = data.associate_data.name;

                data.data.data.forEach((item) => {
                    let payments = [];

                    payments.push(item.payment_method); 
                    payments.push(item.payment_type);
                    payments.push(item.payment_date);
                    payments.push(`R$ ${item.credit_value.replace('.', ',')}`);
                    payments.push(`R$ ${item.membership_fee.replace('.', ',')}`);
                    payments.push(`R$ ${item.charges.replace('.', ',')}`);
                    payments.push(`R$ ${item.fees.replace('.', ',')}`);
                    payments.push(`R$ ${parseFloat(item.credit_value) + parseFloat(item.membership_fee) + parseFloat(item.charges) + parseFloat(item.fees)}`);
                    payments.push(item.comments);

                    this.payments.push(payments);
                    this.paymentsFullInfos.push(item);
                });

                this.loadingTable = false;
            })
            .catch(err => {
                console.log(err);
                switch (err.response.data.message) {
                    case "Usuário não possui permissões suficientes!":
                        this.$router.push('/inicio');
                        break;
                }
                
                this.notify('Erro ao buscar informações!', 'error');
            })
        }
    },
    components: { Head, Table, SimpleModal, Button, Input, Select, Loader }
}
</script>

<template>
    <Loader v-if="loader" />

    <section class="bg-see-associates">
        <Head :title="`Vida Financeira - ${associate_name}`" />
        <p v-if="!loadingTable" id="see-associates-total">Total de pagamentos: <span id="see-associates-total-number">{{ totalItems }}</span></p>
        <p v-if="!loadingTable" id="see-associates-total">Soma total dos valores pagos: <span id="see-associates-total-number">R$ {{ totalSumPayments }}</span></p>
        <p v-if="!loadingTable" id="see-associates-total">Status da vida financeira: <span :class="financial_situation == 'Adimplente' ? 'green' : financial_situation == 'Inadimplente' ? 'red' : ''">{{ financial_situation }}</span></p>

        <Table v-if="!loadingTable" :hasActions="false" :hasNextPage="hasNextPage" :headers="associateTableCategories" :contents="payments" @loadMore="getNextPayment" />
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

.bg-add-associate .close-add-associate {
    position: absolute;
    top: 22px;
    right: 30px;
    cursor: pointer;
    font-size: 18px;
}

.form-add-associate {
    margin-bottom: 150px;
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

.bg-see-associates {
    width: 100%;
    height: auto;
    margin-bottom: 150px;
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

.form-add-associate-button {
    width: 100%;
}

.button-add-associate {
    width: 300px;
    max-width: 100%;
    margin-bottom: 20px;
}

.associate-infos-simple-modal {
    width: 100%;
}

.associate-infos-simple-modal p {
    font-size: 16px;
    font-weight: 500;
    margin: 5px 0px;
}

.associate-infos-simple-modal span {
    font-weight: 400;
}

.blue {
    color: rgb(12, 121, 198);
    font-weight: 600 !important;
}

.orange {
    color: rgb(230, 149, 0);
    font-weight: 600 !important;
}

.green {
    color: rgb(17, 162, 1);
    font-weight: 600 !important;
}

.red {
    color: rgb(162, 1, 1);
    font-weight: 600 !important;
}

@media screen and (max-width:800px) {
    .form-add-associate .form-add-associate-line {
        flex-direction: column;
    }

    .form-add-associate .form-add-associate-line-space {
        margin: 10px 0px !important;
    }
}
</style>