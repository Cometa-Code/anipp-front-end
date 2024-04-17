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
                'Nome',
                'Email',
                'Documento',
                'Matrícula',
                'Status Financeiro'
            ],
            associatesTableActions: [
                'document-text',
                'pencil-square',
                'dollar',
            ],
            associates: [],
            associatesFullInfos: [],
            selectedAssociate: null,
            modalAssociateInfos: false,
            modalAddAssociate: false,
            addAssociateRoleSelect: [],
            addAssociateNationalitySelect: [
                {
                    name: 'Brasileiro',
                    value: 'Brasileiro',
                    selected: true,
                },
                {
                    name: 'Estrangeiro',
                    value: 'Estrangeiro',
                    selected: false,
                },
                {
                    name: 'Indefinido',
                    value: 'Indefinido',
                    selected: false,
                },
            ],
            addAssociateMaritalSelect: [
                {
                    name: 'Indefinido',
                    value: 'Indefinido',
                    selected: true,
                },
                {
                    name: 'Solteiro',
                    value: 'Solteiro',
                    selected: false,
                },
                {
                    name: 'Casado',
                    value: 'Casado',
                    selected: false,
                },
                {
                    name: 'Viúvo',
                    value: 'Viuvo',
                    selected: false,
                },
                {
                    name: 'Separado',
                    value: 'Separado',
                    selected: false,
                },
                {
                    name: 'Divorciado',
                    value: 'Divorciado',
                    selected: false,
                },
            ],
            addAssociateOtherAssociationsSelect: [
                {
                    name: 'Não',
                    value: 'Nao',
                    selected: true,
                },
                {
                    name: 'Sim',
                    value: 'Sim',
                    selected: false,
                }
            ],
            addAssociateData: {
                name: '',
                email: '',
                role: 'associate',
                password: '',
                document_cpf: '',
                document_rg: '',
                date_of_birth: '',
                document_rg_consignor: '',
                affiliation_date: '',
                registration_number: '',
                nationality: 'Brasileiro',
                marital_status: 'Indefinido',
                occupation: '',
                address: '',
                address_city_state: '',
                address_zipcode: '',
                phone_ddd: '',
                phone_number: '',
                other_associations: 'Nao',
                code_bank: '',
                agency_bank: '',
                account_bank: '',
                is_associate: 1,
            },
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

        if (this.userData.role == 'superadmin') {
            this.addAssociateRoleSelect.push(
                {
                    name: 'Super Administrador',
                    value: 'superadmin',
                    selected: false
                },
                {
                    name: 'Associado e Administrador',
                    value: 'adminandassociate',
                    selected: false
                },
                {
                    name: 'Administrador',
                    value: 'admin',
                    selected: false
                },
            );
        }

        this.addAssociateRoleSelect.push(
            {
                name: 'Associado',
                value: 'associate',
                selected: true
            }
        );

        this.getNextPage();
    },
    methods: {
        notify(text, type) {
            toast(text, {
                "type": type == 'info' ? 'info' : type == 'warning' ? 'warning' : type == 'error' ? 'error' : type == 'success' ? 'success' : 'default',
            });
        },
        closeAddAssociateModal() {
            this.addAssociateData = {
                name: '',
                email: '',
                role: 'associate',
                password: '',
                document_cpf: '',
                document_rg: '',
                date_of_birth: '',
                document_rg_consignor: '',
                affiliation_date: '',
                registration_number: '',
                nationality: 'Brasileiro',
                marital_status: 'Indefinido',
                occupation: '',
                address: '',
                address_city_state: '',
                address_zipcode: '',
                phone_ddd: '',
                phone_number: '',
                other_associations: 'Nao',
                code_bank: '',
                agency_bank: '',
                account_bank: '',
                is_associate: 1,
            };

            this.modalAddAssociate = false;
        },
        openAddAssociateModal() {
            this.modalAddAssociate = true;
        },
        getNextPage() {
            this.loadingTable = true;

            this.$axios.get(`/user/associates?items_per_page=${this.itemsPerPage}&page=${this.actualPage + 1}`)
            .then(res => {
                const data = res.data.data;
                console.log(data);

                this.actualPage += 1;

                this.totalItems = data.total;

                data.next_page_url == null ? this.hasNextPage = false : this.hasNextPage = true;

                data.data.forEach((item) => {
                    let associateData = [];

                    associateData.push(item.name); 
                    associateData.push(item.email);
                    associateData.push(item.document_cpf);
                    associateData.push(item.registration_number);
                    associateData.push(item.financial_situation);

                    this.associates.push(associateData);
                    this.associatesFullInfos.push(item);
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
        },
        associatesTableClickAction(event) {
            if (event.eventType == 'document-text') {
                for (let i = 0; i < this.associatesFullInfos.length; i++) {
                    if (this.associatesFullInfos[i].document_cpf === event.data[2]) {
                        this.selectedAssociate = this.associatesFullInfos[i];
                        return this.modalAssociateInfos = true;
                    }
                }
            }
        },
        addAssociate() {
            if (this.loader) {
                return;
            }

            if (this.addAssociateData.role == 'admin' || this.addAssociateData.role == 'superadmin') {
                this.addAssociateData.is_associate = 0;
            } else {
                this.addAssociateData.is_associate = 1;
            }

            if (this.addAssociateData.role == 'adminandassociate') {
                this.addAssociateData.role = 'admin';
            }

            if (
                !this.addAssociateData.name ||
                !this.addAssociateData.email ||
                !this.addAssociateData.password ||
                !this.addAssociateData.document_cpf ||
                !this.addAssociateData.registration_number
            ) {
                return this.notify('Preencha todos os campos obrigatórios (*)!', 'error');
            }

            this.loader = true;

            this.$axios.post('/user/advanced', this.addAssociateData)
            .then(res => {
                this.notify('Usuário criado com sucesso!', 'success');

                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            })
            .catch(err => {
                this.loader = false;
                this.notify(err.response.data.message, 'error');
            });
        }
    },
    components: { Head, Table, SimpleModal, Button, Input, Select, Loader }
}
</script>

<template>
    <Loader v-if="loader" />

    <SimpleModal v-if="modalAssociateInfos" @close="modalAssociateInfos = false">
        <div class="associate-infos-simple-modal">
            <p>ID: <span>{{ selectedAssociate.id }}</span></p>
            <p>Nome: <span class="blue">{{ selectedAssociate.name }}</span></p>
            <p>Email: <span class="blue">{{ selectedAssociate.email }}</span></p>
            <p>Número de registro: <span class="orange">{{ selectedAssociate.registration_number }}</span></p>
            <p>Função: <span class="blue">{{ selectedAssociate.role == 'associate' ? 'Associado' : selectedAssociate.role == 'admin' && selectedAssociate.is_associate ? 'Administrador e Associado' : selectedAssociate.role == 'admin' ? 'Administrador' : 'Super Administrador' }}</span> </p>
            <p>CPF: <span>{{ selectedAssociate.document_cpf }}</span></p>
            <p>RG: <span>{{ selectedAssociate.document_rg }} - {{ selectedAssociate.document_rg_consignor }}</span></p>
            <p>Data de afiliação: <span>{{ selectedAssociate.affiliation_date }}</span></p>
            <p>Nacionalidade: <span>{{ selectedAssociate.nationality }}</span></p>
            <p>Estado civil: <span>{{ selectedAssociate.marital_status }}</span></p>
            <p>Ocupação: <span>{{ selectedAssociate.occupation }}</span></p>
            <p>Endereço: <span>{{ selectedAssociate.address }}</span></p>
            <p>Cidade/Estado: <span>{{ selectedAssociate.address_city_state }}</span></p>
            <p>CEP: <span>{{ selectedAssociate.address_zipcode }}</span></p>
            <p>Telefone: <span>{{ selectedAssociate.phone_ddd }} {{ selectedAssociate.phone_number }}</span></p>
            <p>Múltiplos pagamentos: <span :class="selectedAssociate.other_associations == 'Sim' ? 'orange' : ''">{{ selectedAssociate.other_associations }}</span></p>
            <p>Tipo de pagamento: <span>{{ selectedAssociate.payment_type }}</span></p>
            <p>Código do banco: <span>{{ selectedAssociate.code_bank }}</span></p>
            <p>Conta bancária: <span>{{ selectedAssociate.account_bank }}</span></p>
            <p>Agência bancária: <span>{{ selectedAssociate.agency_bank }}</span></p>
            <p>Status financeiro: <span :class="selectedAssociate.financial_situation == 'Adimplente' ? 'green' : selectedAssociate.financial_situation == 'Inadimplente' ? 'red' : ''">{{ selectedAssociate.financial_situation }}</span></p>
            <p>Data de Nascimento: <span>{{ selectedAssociate.date_of_birth }}</span></p>
            <p>Status da conta: <span :class="selectedAssociate.is_active  ? 'green' : 'red'">{{ selectedAssociate.is_active }}</span></p>
        </div>
    </SimpleModal>

    <section v-if="modalAddAssociate" class="bg-add-associate">
        <Head title="Criar associado" />

        <div @click="closeAddAssociateModal" class="close-add-associate">
            x
        </div>

        <section class="form-add-associate">
            <div class="form-add-associate-line">
                <Input type="text" label="Nome do associado*" placeholder="João Pedro Alves" v-model="addAssociateData.name" />
                <div class="form-add-associate-line-space"></div>
                <Input type="email" label="E-mail do associado*" placeholder="joaopedroalves@anipp.org.br" v-model="addAssociateData.email" />
                <div class="form-add-associate-line-space"></div>
                <Select label="Cargo do usuário*" :options="addAssociateRoleSelect" v-model="addAssociateData.role" />
            </div>

            <div class="form-add-associate-line">
                <Input type="text" label="Senha do usuário*" placeholder="●●●●●●●●●●●●" v-model="addAssociateData.password" />
                <div class="form-add-associate-line-space"></div>
                <Input type="text" label="Documento CPF*" placeholder="00000000000" :onlyNumbers="true" v-model="addAssociateData.document_cpf" />
                <div class="form-add-associate-line-space"></div>
                <Input type="text" label="Número de registro*" placeholder="8.547.856-7" v-model="addAssociateData.registration_number" />
            </div>

            <div class="form-add-associate-line">
                <Input type="text" label="Documento RG" placeholder="x.xxx.xxx - xx" v-model="addAssociateData.document_rg" />
                <div class="form-add-associate-line-space"></div>
                <Input type="text" label="Expedidor do RG" placeholder="SSP/UF" v-model="addAssociateData.document_rg_consignor" />
                <div class="form-add-associate-line-space"></div>
                <Input type="date" label="Data de afiliação" placeholder="10/01/2023" v-model="addAssociateData.affiliation_date" />
            </div>

            <div class="form-add-associate-line">
                <Input type="date" label="Data de nascimento" placeholder="8.547.856-7" v-model="addAssociateData.date_of_birth" />
                <div class="form-add-associate-line-space"></div>
                <Select label="Nacionalidade" :options="addAssociateNationalitySelect" v-model="addAssociateData.nationality" />
                <div class="form-add-associate-line-space"></div>
                <Select label="Estado civil" :options="addAssociateMaritalSelect" v-model="addAssociateData.marital_status" />
            </div>

            <div class="form-add-associate-line">
                <Input type="text" label="Ocupação" placeholder="Administrador" v-model="addAssociateData.occupation" />
                <div class="form-add-associate-line-space"></div>
                <Input type="text" label="Endereço" placeholder="Rua das Flores, 179, Apartamento 303" v-model="addAssociateData.address" />
                <div class="form-add-associate-line-space"></div>
                <Input type="text" label="Cidade/Estado" placeholder="São Paulo SP" v-model="addAssociateData.address_city_state" />
            </div>

            <div class="form-add-associate-line">
                <Input type="text" label="CEP" placeholder="xxxxx-xxx" v-model="addAssociateData.address_zipcode" />
                <div class="form-add-associate-line-space"></div>
                <Input type="text" label="DDD Telefônico" placeholder="11" v-model="addAssociateData.phone_ddd" />
                <div class="form-add-associate-line-space"></div>
                <Input type="text" label="Número de telefone" placeholder="99999-9999" v-model="addAssociateData.phone_number" />
            </div>

            <div class="form-add-associate-line">
                <Input type="text" label="Código do banco" placeholder="371" :onlyNumbers="true" v-model="addAssociateData.code_bank" />
                <div class="form-add-associate-line-space"></div>
                <Input type="text" label="Agência bancária" placeholder="0001" :onlyNumbers="true" v-model="addAssociateData.agency_bank" />
                <div class="form-add-associate-line-space"></div>
                <Input type="text" label="Conta bancária" placeholder="1578468-2" v-model="addAssociateData.account_bank" />
                <div class="form-add-associate-line-space"></div>
                <Select label="Outros associados" :options="addAssociateOtherAssociationsSelect" v-model="addAssociateData.other_associations" />
            </div>

            <div class="form-add-associate-button">
                <Button type="primary" placeholder="Adicionar associado" @buttonPressed="addAssociate" />
            </div>
        </section>
    </section>

    <section class="bg-see-associates">
        <Head title="Associados" />
        <p v-if="!loadingTable" id="see-associates-total">Total de associados: <span id="see-associates-total-number">{{ totalItems }}</span></p>
        <div v-if="!loadingTable" class="button-add-associate">
            <Button type="primary" @buttonPressed="openAddAssociateModal" placeholder="+ Adicionar associado" />
        </div>

        <Table v-if="!loadingTable" :hasActions="true" :actions="associatesTableActions" :hasNextPage="hasNextPage" :headers="associateTableCategories" :contents="associates" @loadMore="getNextPage" @clickAction="associatesTableClickAction" />
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