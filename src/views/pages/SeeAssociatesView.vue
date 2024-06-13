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
            filterTerms: '',
            loader: true,
            loadingTable: true,
            hasNextPage: false,
            itemsPerPage: 10,
            actualPage: 0,
            totalItems: 0,
            associateTableCategories: [
                'Nome',
                'Email',
                'Documento',
                'Matrícula ECT',
                'Status Financeiro'
            ],
            associatesTableActions: [
                'document-text',
                'pencil-square',
                'dollar',
                'trash',
            ],
            associates: [],
            associatesFullInfos: [],
            selectedAssociate: null,
            modalAssociateInfos: false,
            modalAddAssociate: false,
            modalEditAssociate: false,
            addAssociateRoleSelect: [],
            editAssociateRoleSelect: [],
            editAssociateNationalitySelect: [],
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
            editAssociateMaritalSelect: [],
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
            editAssociateStatusFinancialLifeSelect: [
                {
                    name: 'Pendência',
                    value: 'Indefinido',
                    selected: true,
                },
                {
                    name: 'Adimplente',
                    value: 'Adimplente',
                    selected: false,
                },
                {
                    name: 'Inadimplente',
                    value: 'Inadimplente',
                    selected: false,
                }
            ],
            editAssociateOtherAssociationsSelect: [],
            editAssociateData: {
                name: undefined,
                email: undefined,
                role: undefined,
                financial_situation: undefined,
                financial_situation_description: undefined,
                password: 't3MpP4sswo0rd2981s',
                document_cpf: undefined,
                document_rg: undefined,
                date_of_birth: undefined,
                document_rg_consignor: undefined,
                affiliation_date: undefined,
                registration_number: undefined,
                nationality: undefined,
                marital_status: undefined,
                occupation: undefined,
                address: undefined,
                address_city_state: undefined,
                address_zipcode: undefined,
                phone_ddd: undefined,
                phone_number: undefined,
                other_associations: undefined,
                code_bank: undefined,
                agency_bank: undefined,
                account_bank: undefined,
                is_associate: undefined,
                bank_identifier_a: undefined,
                bank_identifier_b: undefined,
            },
            addAssociateData: {
                name: '',
                email: '',
                role: 'associate',
                password: 't3MpP4sswo0rd2981s',
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
            selectedAssociateToDelete: {
                id: 0,
                name: 'Fulano',
            },
            modalDeleteAssociate: false,
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
        closeEditAssociateModal() {
            this.addAssociateData = {
                name: undefined,
                email: undefined,
                role: undefined,
                password: 't3MpP4sswo0rd2981s',
                document_cpf: undefined,
                document_rg: undefined,
                date_of_birth: undefined,
                document_rg_consignor: undefined,
                affiliation_date: undefined,
                registration_number: undefined,
                nationality: undefined,
                marital_status: undefined,
                occupation: undefined,
                address: undefined,
                address_city_state: undefined,
                address_zipcode: undefined,
                phone_ddd: undefined,
                phone_number: undefined,
                other_associations: undefined,
                code_bank: undefined,
                agency_bank: undefined,
                account_bank: undefined,
                is_associate: undefined,
                bank_identifier_a: undefined,
                bank_identifier_b: undefined,
            };

            this.editAssociateRoleSelect = [];

            this.modalEditAssociate = false;
        },
        closeAddAssociateModal() {
            this.addAssociateData = {
                name: '',
                email: '',
                role: 'associate',
                password: 't3MpP4sswo0rd2981s',
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
            this.loader = true;
            this.loadingTable = true;

            this.$axios.get(`/user/associates?items_per_page=${this.itemsPerPage}&page=${this.actualPage + 1}&terms_filter=${this.filterTerms}`)
            .then(res => {
                const data = res.data.data;
                console.log(data);

                this.actualPage += 1;

                this.totalItems = data.total;

                data.next_page_url == null ? this.hasNextPage = false : this.hasNextPage = true;

                data.data.forEach((item) => {
                    let associateData = [];

                    associateData.push(item.other_associations == 'Sim' ? `★ ${item.name}` : item.name); 
                    associateData.push(item.email);
                    associateData.push(item.document_cpf);
                    associateData.push(item.registration_number);
                    associateData.push(item.financial_situation != 'Indefinido' ? item.financial_situation : `Pendência - ${item.financial_situation_description}`);

                    this.associates.push(associateData);
                    this.associatesFullInfos.push(item);
                });

                this.loadingTable = false;
                this.loader = false;
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

            if (event.eventType == 'pencil-square') {
                for (let i = 0; i < this.associatesFullInfos.length; i++) {
                    if (this.associatesFullInfos[i].document_cpf === event.data[2]) {
                        this.editAssociateData = this.associatesFullInfos[i];
                    }
                }

                this.editAssociateStatusFinancialLifeSelect = [
                    {
                        name: 'Pendência',
                        value: 'Indefinido',
                        selected: this.editAssociateData.financial_situation == 'Indefinido' ? true : false,
                    },
                    {
                        name: 'Adimplente',
                        value: 'Adimplente',
                        selected: this.editAssociateData.financial_situation == 'Adimplente' ? true : false,
                    },
                    {
                        name: 'Inadimplente',
                        value: 'Inadimplente',
                        selected: this.editAssociateData.financial_situation == 'Inadimplente' ? true : false,
                    },
                ];

                this.editAssociateNationalitySelect = [
                    {
                        name: 'Brasileiro',
                        value: 'Brasileiro',
                        selected: this.editAssociateData.nationality == 'Brasileiro' ? true : false,
                    },
                    {
                        name: 'Estrangeiro',
                        value: 'Estrangeiro',
                        selected: this.editAssociateData.nationality == 'Estrangeiro' ? true : false,
                    },
                    {
                        name: 'Indefinido',
                        value: 'Indefinido',
                        selected: this.editAssociateData.nationality == 'Indefinido' ? true : false,
                    },
                ];

                if (this.userData.role == 'superadmin') {
                    this.editAssociateRoleSelect.push(
                        {
                            name: 'Super Administrador',
                            value: 'superadmin',
                            selected: this.editAssociateData.role == 'superadmin' ? true : false
                        },
                        {
                            name: 'Associado e Administrador',
                            value: 'adminandassociate',
                            selected: this.editAssociateData.role == 'admin' && this.editAssociateData.is_associate == 1 ? true : false
                        },
                        {
                            name: 'Administrador',
                            value: 'admin',
                            selected: this.editAssociateData.role == 'admin' && this.editAssociateData.is_associate == 0 ? true : false
                        },
                    );
                }
                
                this.editAssociateRoleSelect.push(
                    {
                        name: 'Associado',
                        value: 'associate',
                        selected: this.editAssociateData.role == 'associate' ? true : false
                    }
                );

                this.editAssociateMaritalSelect = [
                    {
                        name: 'Indefinido',
                        value: 'Indefinido',
                        selected: this.editAssociateData.marital_status == 'Indefinido' ? true : false,
                    },
                    {
                        name: 'Solteiro',
                        value: 'Solteiro',
                        selected: this.editAssociateData.marital_status == 'Solteiro' ? true : false,
                    },
                    {
                        name: 'Casado',
                        value: 'Casado',
                        selected: this.editAssociateData.marital_status == 'Casado' ? true : false,
                    },
                    {
                        name: 'Viúvo',
                        value: 'Viuvo',
                        selected: this.editAssociateData.marital_status == 'Viuvo' ? true : false,
                    },
                    {
                        name: 'Separado',
                        value: 'Separado',
                        selected: this.editAssociateData.marital_status == 'Separado' ? true : false,
                    },
                    {
                        name: 'Divorciado',
                        value: 'Divorciado',
                        selected: this.editAssociateData.marital_status == 'Divorciado' ? true : false,
                    },
                ];

                this.editAssociateOtherAssociationsSelect = [
                    {
                        name: 'Sim',
                        value: 'Sim',
                        selected: this.editAssociateData.other_associations == 'Sim' ? true : false,
                    },
                    {
                        name: 'Não',
                        value: 'Nao',
                        selected: this.editAssociateData.other_associations == 'Nao' ? true : false,
                    },
                    {
                        name: 'Indefinido',
                        value: 'Indefinido',
                        selected: this.editAssociateData.other_associations == 'Indefinido' ? true : false,
                    },
                ];

                return this.modalEditAssociate = true;
            }

            if (event.eventType == 'dollar') {
                for (let i = 0; i < this.associatesFullInfos.length; i++) {
                    if (this.associatesFullInfos[i].document_cpf === event.data[2]) {
                        this.$router.push(`/vida-financeira/${this.associatesFullInfos[i].id}`)
                    }
                }
            }

            if (event.eventType == 'trash') {
                for (let i = 0; i < this.associatesFullInfos.length; i++) {
                    if (this.associatesFullInfos[i].document_cpf === event.data[2]) {
                        this.selectedAssociateToDelete = {
                            id: this.associatesFullInfos[i].id,
                            name: this.associatesFullInfos[i].name
                        }
                    }
                }

                this.modalDeleteAssociate = true;
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
        },
        editAssociate() {
            if (this.loader) {
                return;
            }

            if (this.editAssociateData.role == 'admin' || this.editAssociateData.role == 'superadmin') {
                this.editAssociateData.is_associate = 0;
            } else {
                this.editAssociateData.is_associate = 1;
            }

            if (this.editAssociateData.role == 'adminandassociate') {
                this.editAssociateData.role = 'admin';
            }

            if (
                !this.editAssociateData.name ||
                !this.editAssociateData.email ||
                !this.editAssociateData.document_cpf ||
                !this.editAssociateData.registration_number
            ) {
                return this.notify('Preencha todos os campos obrigatórios (*)!', 'error');
            }

            this.loader = true;

            this.$axios.put(`/user/advanced/${this.editAssociateData.document_cpf}`, this.editAssociateData)
            .then(res => {
                this.notify('Usuário atualizado com sucesso!', 'success');

                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            })
            .catch(err => {
                this.loader = false;
                this.notify(err.response.data.message, 'error');
            });
        },
        deleteAssociate() {
            this.loader = true;

            this.$axios.delete(`user/associates/deactivate_user/${this.selectedAssociateToDelete.id}`)
            .then(res => {
                this.notify('Usuário deletado com sucesso!', 'success');

                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            })
            .catch(err => {
                this.notify('Ocorreu um erro durante a exclusão do usuário e não foi possível deletar essa conta!', 'error');

                this.loader = false;
            });
        },
    },
    components: { Head, Table, SimpleModal, Button, Input, Select, Loader }
}
</script>

<template>
    <Loader v-if="loader" />

    <SimpleModal v-if="modalDeleteAssociate" @close="selectedAssociateToDelete = null; modalDeleteAssociate = false" title="Deseja excluir esse associado?" :hasOkButton="true" okButtonDescription="Confirmar" @clickOkButton="deleteAssociate">
        <div class="delete-associate">
            <h1>Atenção!</h1>

            <p>Você tem certeza que deseja excluir permanentemente a conta do associado <b>{{ selectedAssociateToDelete.name }}</b>?</p>

            <p>Saiba que essa ação é permanente e irreversível. Confirme apenas se tiver certeza dessa ação!</p>
        </div>
    </SimpleModal>

    <SimpleModal v-if="modalAssociateInfos" @close="modalAssociateInfos = false" title="Associado">
        <div class="associate-infos-simple-modal">
            <p>ID: <span>{{ selectedAssociate.id }}</span></p>
            <p>Nome: <span class="blue">{{ selectedAssociate.name }}</span></p>
            <p>Email: <span class="blue">{{ selectedAssociate.email }}</span></p>
            <p>Matrícula ECT: <span class="orange">{{ selectedAssociate.registration_number }}</span></p>
            <p>Função: <span class="blue">{{ selectedAssociate.role == 'associate' ? 'Associado' : selectedAssociate.role == 'admin' && selectedAssociate.is_associate ? 'Administrador e Associado' : selectedAssociate.role == 'admin' ? 'Administrador' : 'Super Administrador' }}</span> </p>
            <p>CPF: <span>{{ selectedAssociate.document_cpf }}</span></p>
            <p>RG: <span>{{ selectedAssociate.document_rg }} - {{ selectedAssociate.document_rg_consignor }}</span></p>
            <p>Data de filiação: <span>{{ `${selectedAssociate.affiliation_date[8]}${selectedAssociate.affiliation_date[9]}/${selectedAssociate.affiliation_date[5]}${selectedAssociate.affiliation_date[6]}/${selectedAssociate.affiliation_date[0]}${selectedAssociate.affiliation_date[1]}${selectedAssociate.affiliation_date[2]}${selectedAssociate.affiliation_date[3]}` }}</span></p>
            <p>Nacionalidade: <span>{{ selectedAssociate.nationality }}</span></p>
            <p>Estado civil: <span>{{ selectedAssociate.marital_status }}</span></p>
            <p>Profissão: <span>{{ selectedAssociate.occupation }}</span></p>
            <p>Endereço: <span>{{ selectedAssociate.address }}</span></p>
            <p>Cidade/Estado: <span>{{ selectedAssociate.address_city_state }}</span></p>
            <p>CEP: <span>{{ selectedAssociate.address_zipcode }}</span></p>
            <p>Telefone: <span>{{ selectedAssociate.phone_ddd }} {{ selectedAssociate.phone_number }}</span></p>
            <p>Múltiplos pagamentos: <span :class="selectedAssociate.other_associations == 'Sim' ? 'orange' : ''">{{ selectedAssociate.other_associations }}</span></p>
            <p>Número do banco: <span>{{ selectedAssociate.code_bank }}</span></p>
            <p>Conta bancária: <span>{{ selectedAssociate.account_bank }}</span></p>
            <p>Agência bancária: <span>{{ selectedAssociate.agency_bank }}</span></p>
            <p>Status financeiro: <span :class="selectedAssociate.financial_situation == 'Adimplente' ? 'green' : selectedAssociate.financial_situation == 'Inadimplente' ? 'red' : ''">{{ selectedAssociate.financial_situation != "Indefinido" ? selectedAssociate.financial_situation : `Pendência - ${selectedAssociate.financial_situation_description}` }}</span></p>
            <p>Data de Nascimento: <span>{{ selectedAssociate.date_of_birth }}</span></p>
            <p>Status da conta: <span :class="selectedAssociate.is_active  ? 'green' : 'red'">{{ selectedAssociate.is_active == 1 ? 'Ativo' : 'Inativo' }}</span></p>
        </div>
    </SimpleModal>

    <section v-if="modalAddAssociate" class="bg-add-associate">
        <Head title="Criar associado" />

        <div @click="closeAddAssociateModal" class="close-add-associate">
            x
        </div>

        <section class="form-add-associate">
            <div class="form-add-associate-line">
                <Input type="text" label="Nome do associado*" placeholder="João Pedro Alves" :value="addAssociateData.name" v-model="addAssociateData.name" />
                <div class="form-add-associate-line-space"></div>
                <Input type="email" label="E-mail do associado*" placeholder="joaopedroalves@anipp.org.br" :value="addAssociateData.email" v-model="addAssociateData.email" />
                <div v-if="userData.role == 'superadmin'" class="form-add-associate-line-space"></div>
                <Select v-if="userData.role == 'superadmin'" label="Cargo do usuário*" :options="addAssociateRoleSelect" :value="addAssociateData.role" v-model="addAssociateData.role" />
            </div>

            <div class="form-add-associate-line">
                <Input type="text" label="Documento CPF*" placeholder="00000000000" :onlyNumbers="true" :value="addAssociateData.document_cpf" v-model="addAssociateData.document_cpf" />
                <div class="form-add-associate-line-space"></div>
                <Input type="text" label="Matrícula ECT*" placeholder="8.547.856-7" :value="addAssociateData.registration_number" v-model="addAssociateData.registration_number" />
                <div class="form-add-associate-line-space"></div>
                <Select label="Outros associados" :options="addAssociateOtherAssociationsSelect" :value="addAssociateData.other_associations" v-model="addAssociateData.other_associations" />
            </div>

            <div class="form-add-associate-line">
                <Input type="text" label="Documento RG" placeholder="x.xxx.xxx - xx" :value="addAssociateData.document_rg" v-model="addAssociateData.document_rg" />
                <div class="form-add-associate-line-space"></div>
                <Input type="text" label="Expedidor do RG" placeholder="SSP/UF" :value="addAssociateData.document_rg_consignor" v-model="addAssociateData.document_rg_consignor" />
                <div class="form-add-associate-line-space"></div>
                <Input type="date" label="Data de filiação" placeholder="10/01/2023" :value="addAssociateData.affiliation_date" v-model="addAssociateData.affiliation_date" />
            </div>

            <div class="form-add-associate-line">
                <Input type="date" label="Data de nascimento" placeholder="8.547.856-7" :value="addAssociateData.date_of_birth" v-model="addAssociateData.date_of_birth" />
                <div class="form-add-associate-line-space"></div>
                <Select label="Nacionalidade" :options="addAssociateNationalitySelect" :value="addAssociateData.nationality" v-model="addAssociateData.nationality" />
                <div class="form-add-associate-line-space"></div>
                <Select label="Estado civil" :options="addAssociateMaritalSelect" :value="addAssociateData.marital_status" v-model="addAssociateData.marital_status" />
            </div>

            <div class="form-add-associate-line">
                <Input type="text" label="Profissão" placeholder="Administrador" :value="addAssociateData.occupation" v-model="addAssociateData.occupation" />
                <div class="form-add-associate-line-space"></div>
                <Input type="text" label="Endereço" placeholder="Rua das Flores, 179, Apartamento 303" :value="addAssociateData.address" v-model="addAssociateData.address" />
                <div class="form-add-associate-line-space"></div>
                <Input type="text" label="Cidade/Estado" placeholder="São Paulo SP" :value="addAssociateData.address_city_state" v-model="addAssociateData.address_city_state" />
            </div>

            <div class="form-add-associate-line">
                <Input type="text" label="CEP" placeholder="xxxxx-xxx" :value="addAssociateData.address_zipcode" v-model="addAssociateData.address_zipcode" />
                <div class="form-add-associate-line-space"></div>
                <Input type="text" label="DDD Telefônico" placeholder="11" :value="addAssociateData.phone_ddd" v-model="addAssociateData.phone_ddd" />
                <div class="form-add-associate-line-space"></div>
                <Input type="text" label="Número do Whatsapp" placeholder="99999-9999" :value="addAssociateData.phone_number" v-model="addAssociateData.phone_number" />
            </div>

            <div class="form-add-associate-line">
                <Input type="text" label="Número do banco" placeholder="371" :onlyNumbers="true" :value="addAssociateData.code_bank" v-model="addAssociateData.code_bank" />
                <div class="form-add-associate-line-space"></div>
                <Input type="text" label="Agência bancária" placeholder="0001" :agencyBankMask="true" :onlyNumbers="true" :value="addAssociateData.agency_bank" v-model="addAssociateData.agency_bank" :maxLength="5" />
                <div class="form-add-associate-line-space"></div>
                <Input type="text" label="Conta bancária" placeholder="1578468-2" :value="addAssociateData.account_bank" v-model="addAssociateData.account_bank" />
                <div class="form-add-associate-line-space"></div>
                
            </div>

            <div class="form-add-associate-button">
                <Button type="primary" placeholder="Adicionar associado" @buttonPressed="addAssociate" />
            </div>
        </section>
    </section>

    <section v-if="modalEditAssociate" class="bg-add-associate">
        <Head title="Editar associado" />

        <div @click="closeEditAssociateModal" class="close-add-associate">
            x
        </div>

        <section class="form-add-associate">
            <div class="form-add-associate-line">
                <Input type="text" label="Nome do associado*" placeholder="João Pedro Alves" :value="editAssociateData.name" v-model="editAssociateData.name" />
                <div class="form-add-associate-line-space"></div>
                <Input type="email" label="E-mail do associado*" placeholder="joaopedroalves@anipp.org.br" :value="editAssociateData.email" v-model="editAssociateData.email" />
                <div class="form-add-associate-line-space"></div>
                <Select label="Status financeiro" :options="editAssociateStatusFinancialLifeSelect" :value="editAssociateData.financial_situation" v-model="editAssociateData.financial_situation" />
            </div>

            <div class="form-add-associate-line">
                <Input v-if="editAssociateData.financial_situation == 'Indefinido'" type="text" label="Descrição da pendência financeira" placeholder="8.547.856-7" :value="editAssociateData.financial_situation_description" v-model="editAssociateData.financial_situation_description" />
                <div v-if="editAssociateData.financial_situation == 'Indefinido'" class="form-add-associate-line-space"></div>
                <Select v-if="userData.role == 'superadmin'" label="Cargo do usuário*" :options="editAssociateRoleSelect" :value="editAssociateData.role" v-model="editAssociateData.role" />
                <div v-if="userData.role == 'superadmin'" class="form-add-associate-line-space"></div>
                <Input type="text" label="Matrícula ECT*" placeholder="8.547.856-7" :value="editAssociateData.registration_number" v-model="editAssociateData.registration_number" />
                <div class="form-add-associate-line-space"></div>
                <Select label="Outros associados" :options="editAssociateOtherAssociationsSelect" :value="editAssociateData.other_associations" v-model="editAssociateData.other_associations" />
            </div>

            <div class="form-add-associate-line">
                <Input type="text" label="Documento RG" placeholder="x.xxx.xxx - xx" :value="editAssociateData.document_rg" v-model="editAssociateData.document_rg" />
                <div class="form-add-associate-line-space"></div>
                <Input type="text" label="Expedidor do RG" placeholder="SSP/UF" :value="editAssociateData.document_rg_consignor" v-model="editAssociateData.document_rg_consignor" />
                <div class="form-add-associate-line-space"></div>
                <Input type="date" label="Data de filiação" placeholder="10/01/2023" :value="editAssociateData.affiliation_date" v-model="editAssociateData.affiliation_date" />
            </div>

            <div class="form-add-associate-line">
                <Input type="date" label="Data de nascimento" placeholder="8.547.856-7" :value="editAssociateData.date_of_birth" v-model="editAssociateData.date_of_birth" />
                <div class="form-add-associate-line-space"></div>
                <Select label="Nacionalidade" :options="editAssociateNationalitySelect" :value="editAssociateData.nationality" v-model="editAssociateData.nationality" />
                <div class="form-add-associate-line-space"></div>
                <Select label="Estado civil" :options="editAssociateMaritalSelect" :value="editAssociateData.marital_status" v-model="editAssociateData.marital_status" />
            </div>

            <div class="form-add-associate-line">
                <Input type="text" label="Profissão" placeholder="Administrador" :value="editAssociateData.occupation" v-model="editAssociateData.occupation" />
                <div class="form-add-associate-line-space"></div>
                <Input type="text" label="Endereço" placeholder="Rua das Flores, 179, Apartamento 303" :value="editAssociateData.address" v-model="editAssociateData.address" />
                <div class="form-add-associate-line-space"></div>
                <Input type="text" label="Cidade/Estado" placeholder="São Paulo SP" :value="editAssociateData.address_city_state" v-model="editAssociateData.address_city_state" />
            </div>

            <div class="form-add-associate-line">
                <Input type="text" label="CEP" placeholder="xxxxx-xxx" :value="editAssociateData.address_zipcode" v-model="editAssociateData.address_zipcode" />
                <div class="form-add-associate-line-space"></div>
                <Input type="text" label="DDD Telefônico" placeholder="11" :value="editAssociateData.phone_ddd" v-model="editAssociateData.phone_ddd" />
                <div class="form-add-associate-line-space"></div>
                <Input type="text" label="Número do Whatsapp" placeholder="99999-9999" :value="editAssociateData.phone_number" v-model="editAssociateData.phone_number" />
            </div>

            <div class="form-add-associate-line">
                <Input type="text" label="Número do banco" placeholder="371" :onlyNumbers="true" :value="editAssociateData.code_bank" v-model="editAssociateData.code_bank" />
                <div class="form-add-associate-line-space"></div>
                <Input type="text" label="Agência bancária" placeholder="0001" :agencyBankMask="true" :onlyNumbers="true" :value="editAssociateData.agency_bank" v-model="editAssociateData.agency_bank" :maxLength="5" />
                <div class="form-add-associate-line-space"></div>
                <Input type="text" label="Conta bancária" placeholder="1578468-2" :value="editAssociateData.account_bank" v-model="editAssociateData.account_bank" />
            </div>

            <div class="form-add-associate-line">
                <Input type="text" label="Identificador do extrato (Para PIX)" placeholder="000CPFDASTRANSFERENCIAS" :onlyNumbers="true" :value="editAssociateData.bank_identifier_a" v-model="editAssociateData.bank_identifier_a" />
                <div class="form-add-associate-line-space"></div>
                <Input type="text" label="Identificador do extrato (Para Transfêrencias)" placeholder="512417846541658486" :onlyNumbers="true" :value="editAssociateData.bank_identifier_b" v-model="editAssociateData.bank_identifier_b" />
            </div>

            <div class="form-add-associate-button">
                <Button type="primary" placeholder="Atualizar associado" @buttonPressed="editAssociate" />
            </div>
        </section>
    </section>

    <section class="bg-see-associates">
        <Head title="Associados" />
        <p v-if="!loadingTable" id="see-associates-total">Total de associados: <span id="see-associates-total-number">{{ totalItems }}</span></p>
        <div v-if="!loadingTable" class="button-add-associate">
            <Button type="primary" @buttonPressed="openAddAssociateModal" placeholder="+ Adicionar associado" />
        </div>

        <div class="search-associate-div">
            <Input type="text" label="Busque por termos" placeholder="Nome, e-mail ou documento" :value="filterTerms" v-model="filterTerms" />

            <Button class="button-search" type="primary" @buttonPressed="associatesFullInfos = []; associates = []; actualPage = 0; getNextPage()">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </Button>
        </div>

        <!-- <div class="filter-associates">
            <Input type="text" label="Filtrar por Nome, E-mail ou CPF" placeholder="Digite os termos que deseja encontrar!" :value="editAssociateData.account_bank" v-model="editAssociateData.account_bank" />
            <Button type="primary"></Button>
        </div> -->

        <Table v-if="!loadingTable" :hasActions="true" :actions="associatesTableActions" :hasNextPage="hasNextPage" :headers="associateTableCategories" :contents="associates" @loadMore="getNextPage" @clickAction="associatesTableClickAction" />
    </section>
</template>

<style scoped>
.button-search {
    width: 80px;
    margin-left: 10px;
}

.button-search .icon {
    width: 18px;
}

.search-associate-div {
    width: 100%;
    height: auto;
    margin-bottom: 30px;
    display: flex;
    align-items: flex-end;
}

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

.filter-associates {
    display: flex;
    margin-bottom: 30px;
}

.delete-associate {
    text-align: center;
    padding: 30px 0px;
}

.delete-associate h1 {
    font-size: 24px;
    margin-bottom: 40px;
    color: #C0AB61;
}

.delete-associate p {
    margin-bottom: 10px;
    color: rgb(38, 38, 38);
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