<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import Head from '@/components/Head';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Select from '@/components/Select';
import Loader from '@/components/Loader';
import Table from '@/components/Table';

export default {
    props: {
        userData: {
            type: Object
        }
    },
    data() {
        return {
            loader: true,
            editUserData: {
                document_rg: '',
                document_rg_consignor: '',
                nationality: '',
                marital_status: '',
                occupation: '',
                address: '',
                address_city_state: '',
                address_zipcode: '',
                phone_ddd: '',
                phone_number: '',
            },
            editUserNationalitySelect: [],
            editUserMaritalSelect: [],
            editUserPassword: {
                actual_password: '',
                new_password: '',
                confirm_new_password: '',
            },
            addDependentData: {
                name: '',
                email: '',
                phone: '',
                degree_of_kinship: '',
            },
            dependentsTableActions: [
                'trash'
            ],
            dependentsTableCategories: [
                'ID',
                'Nome',
                'Telefone',
                'Email',
                'Grau de parentesco',
            ],
            dependentsTableItems: [],
            dependentsTableItemsFullInfos: [],
            modalAddDependent: false,
        }
    },
    created() {
        this.editUserNationalitySelect = [
            {
                name: 'Brasileiro',
                value: 'Brasileiro',
                selected: this.userData.nationality == 'Brasileiro' ? true : false,
            },
            {
                name: 'Estrangeiro',
                value: 'Estrangeiro',
                selected: this.userData.nationality == 'Estrangeiro' ? true : false,
            },
            {
                name: 'Indefinido',
                value: 'Indefinido',
                selected: this.userData.nationality == 'Indefinido' ? true : false,
            }
        ];

        this.editUserData.document_rg = this.userData.document_rg
        this.editUserData.document_rg_consignor = this.userData.document_rg_consignor

        this.editUserData.nationality = this.userData.nationality

        this.editUserMaritalSelect = [
            {
                name: 'Indefinido',
                value: 'Indefinido',
                selected: this.userData.marital_status == 'Indefinido' ? true : false,
            },
            {
                name: 'Solteiro',
                value: 'Solteiro',
                selected: this.userData.marital_status == 'Solteiro' ? true : false,
            },
            {
                name: 'Casado',
                value: 'Casado',
                selected: this.userData.marital_status == 'Casado' ? true : false,
            },
            {
                name: 'Viúvo',
                value: 'Viuvo',
                selected: this.userData.marital_status == 'Viuvo' ? true : false,
            },
            {
                name: 'Separado',
                value: 'Separado',
                selected: this.userData.marital_status == 'Separado' ? true : false,
            },
            {
                name: 'Divorciado',
                value: 'Divorciado',
                selected: this.userData.marital_status == 'Divorciado' ? true : false,
            },
        ];

        this.editUserData.marital_status = this.userData.marital_status;

        this.editUserData.occupation = this.userData.occupation;
        this.editUserData.address = this.userData.address;
        this.editUserData.address_city_state = this.userData.address_city_state;
        this.editUserData.address_zipcode = this.userData.address_zipcode;
        this.editUserData.phone_ddd = this.userData.phone_ddd;
        this.editUserData.phone_number = this.userData.phone_number;
        this.editUserData.date_of_birth = this.userData.date_of_birth;

        this.$axios.get('/user/dependents')
        .then(res => {
            res.data.data.forEach((item) => {
                let dependents = [];

                dependents.push(item.id);
                dependents.push(item.name);
                dependents.push(item.phone);
                dependents.push(item.email);
                dependents.push(item.degree_of_kinship);

                this.dependentsTableItems.push(dependents);
                this.dependentsTableItemsFullInfos.push(item);
            });

            console.log(this.dependentsTableItems);
            this.loader = false;
        })
        .catch(err => {
            this.notify('Ocorreu um erro ao tentar buscar os seus dependentes!', 'error');

            this.loader = false;
        })
    },
    methods: {
        notify(text, type) {
            toast(text, {
                "type": type == 'info' ? 'info' : type == 'warning' ? 'warning' : type == 'error' ? 'error' : type == 'success' ? 'success' : 'default',
            });
        },
        updateUserData() {
            if (this.loader) {
                return;
            }

            this.loader = true;

            this.$axios.put('/user', this.editUserData)
            .then(res => {
                this.notify('Dados atualizados com suceso!', 'success');

                this.loader = false;
            })
            .catch(err => {
                this.notify('Erro ao atualizar dados do usuário!', 'error');

                this.loader = false;
            })
        },
        updateUserPassword() {
            if (this.loader) {
                return;
            }

            if (
                !this.editUserPassword.actual_password ||
                !this.editUserPassword.new_password ||
                !this.editUserPassword.confirm_new_password
            ) {
                return this.notify('Preencha todos os campos para atualizar sua senha!', 'error');
            }

            if (this.editUserPassword.actual_password == this.editUserPassword.new_password) {
                return this.notify('A nova senha não pode ser igual a senha atual!', 'error');
            }

            if (this.editUserPassword.new_password.length < 7) {
                return this.notify('A nova senha deve possuir ao menos 8 caracteres, uma letra maiuscula, uma letra minuscula e um número!', 'error');
            }

            if (this.editUserPassword.new_password != this.editUserPassword.confirm_new_password) {
                return this.notify('A confirmação da nova senha deve ser igual a nova senha!', 'error');
            }

            this.loader = true;

            this.$axios.put('/user/password', {
                actual_password: this.editUserPassword.actual_password,
                new_password: this.editUserPassword.new_password
            })
            .then(res => {
                this.notify('Senha atualizada com sucesso!', 'success');

                this.loader = false;
            })
            .catch(err => {
                this.notify('Ocorreu um erro durante a atualização, verifique se a senha está correta!', 'error');

                this.loader = false;
            })
        },
        dependentsTableClickAction(event) {
            if (event.eventType == 'trash') {
                this.loader = true;

                this.$axios.delete(`/user/dependents/${event.data[0]}`)
                .then(res => {
                    this.notify('Dependente removido com sucesso!', 'success');

                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                })
                .catch(err => {
                    this.notify('Ocorreu um erro e não foi possível remover esse dependente', 'error');

                    this.loader = false;
                });
            }
        },
        addDependentF() {
            this.loader = true;

            if (
                !this.addDependentData.name,
                !this.addDependentData.email,
                !this.addDependentData.degree_of_kinship
            ) {
                this.loader = false;

                return this.notify('Para adicionar um novo dependente, preencha todos os dados', 'error');
            }

            this.$axios.post('/user/dependents', this.addDependentData)
            .then(res => {
                this.notify('Dependente adicionado com sucesso!', 'success');

                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            })
            .catch(err => {
                this.notify('Ocorreu um erro ao tentar adicionar um novo dependente!', 'error');

                this.loader = false;
            })
        }
    },
    components: { Head, Input, Select, Button, Loader, Table }
}
</script>

<template>
    <Loader v-if="loader" />

    <section v-if="modalAddDependent" class="bg-add-associate">
        <Head title="Adicionar dependente" />

        <div @click="modalAddDependent = false" class="close-add-associate">
            x
        </div>

        <section class="form-add-associate">
            <div class="form-add-associate-line">
                <Input type="text" label="Nome do dependente*" placeholder="João Pedro Alves" :value="addDependentData.name" v-model="addDependentData.name" />
                <div class="form-add-associate-line-space"></div>
                <Input type="email" label="E-mail do dependente*" placeholder="joaopedroalves@anipp.org.br" :value="addDependentData.email" v-model="addDependentData.email" />
            </div>

            <div class="form-add-associate-line">
                <Input type="text" label="Telefone do dependente" placeholder="xxxxx-xxxx" :value="addDependentData.phone" v-model="addDependentData.phone" />
                <div class="form-add-associate-line-space"></div>
                <Input type="email" label="Grau de parentesco*" placeholder="Pai/Mãe Padrasto/Madastra" :value="addDependentData.degree_of_kinship" v-model="addDependentData.degree_of_kinship" />
            </div>

            <div class="form-add-associate-button">
                <Button type="primary" placeholder="Adicionar dependente" @buttonPressed="addDependentF" />
            </div>
        </section>
    </section>

    <section v-if="!loader" class="bg-user-profile">
        <Head title="Meu perfil" />
        <p class="user-profile-info">Olá, você está logado como <span class="gold">{{ userData.role == 'admin' && userData.is_associate == 1 ? 'administrador e associado' : userData.role == 'admin' || userData.role == 'superadmin' ? 'administrador' : 'associado' }}!</span></p>
        <p v-if="userData.registration_number != null" class="user-profile-info">Número de matrícula: <span class="gold">{{ userData.registration_number }}</span></p>

        <section class="form-user-data">
            <div class="form-user-data-line">
                <Input type="text" label="Seu e-mail" :value="userData.email" :disabled="true" />
                <div class="form-user-data-line-space"></div>
                <Input type="text" label="Documento CPF" :value="userData.document_cpf" :disabled="true" />
            </div>

            <div class="form-user-data-line">
                <Input type="text" label="Seu documento RG" placeholder="Seu RG aqui!" :value="editUserData.document_rg" v-model="editUserData.document_rg" />
                <div class="form-user-data-line-space"></div>
                <Input type="text" label="Orgão expedidor RG" placeholder="Expedidor do seu RG aqui!" :value="editUserData.document_rg_consignor" v-model="editUserData.document_rg_consignor" />
            </div>

            <div class="form-user-data-line">
                <Select label="Nacionalidade" :options="editUserNationalitySelect" :value="editUserData.nationality" v-model="editUserData.nationality" />
                <div class="form-user-data-line-space"></div>
                <Select label="Estado civil" :options="editUserMaritalSelect" :value="editUserData.marital_status" v-model="editUserData.marital_status" />
            </div>

            <div class="form-user-data-line">
                <Input type="text" label="Ocupação" placeholder="Administrador" :value="editUserData.occupation" v-model="editUserData.occupation" />
                <div class="form-user-data-line-space"></div>
                <Input type="text" label="Endereço" placeholder="Rua João Santo, Prédio 201, Ap. 101" :value="editUserData.address" v-model="editUserData.address" />
            </div>

            <div class="form-user-data-line">
                <Input type="text" label="Município/Estado" placeholder="São Paulo - SP" :value="editUserData.address_city_state" v-model="editUserData.address_city_state" />
                <div class="form-user-data-line-space"></div>
                <Input type="text" label="CEP" placeholder="00000-000" :value="editUserData.address_zipcode" v-model="editUserData.address_zipcode" />
            </div>

            <div class="form-user-data-line">
                <Input type="text" label="DDD do telefone" placeholder="11" :value="editUserData.phone_ddd" v-model="editUserData.phone_ddd" :only-numbers="true" />
                <div class="form-user-data-line-space"></div>
                <Input type="text" label="Número do Whatsapp" placeholder="999999999" :value="editUserData.phone_number" v-model="editUserData.phone_number" :only-numbers="true" />
            </div>

            <div class="form-button">
                <Button type="primary" placeholder="Salvar dados" @buttonPressed="updateUserData" />
            </div>
        </section>

        <section class="form-user-data manage-dependents">
            <h2>Gerencie os seus dependentes</h2>
            
            <div class="form-button add-dependent-button">
                <Button type="primary" placeholder="+ Adicionar dependente" @buttonPressed="modalAddDependent = true" />
            </div>

            <Table v-if="!loader" :hasActions="true" :actions="dependentsTableActions" :hasNextPage="false" :headers="dependentsTableCategories" :contents="dependentsTableItems" @clickAction="dependentsTableClickAction" />
        </section>

        <section class="form-user-data">
            <div class="form-user-data-line">
                <Input type="text" label="Digite sua senha atual" placeholder="●●●●●●●●●●●●" :value="editUserPassword.actual_password" v-model="editUserPassword.actual_password" />
                <div class="form-user-data-line-space"></div>
                <Input type="text" label="Digite sua nova senha" placeholder="●●●●●●●●●●●●" :value="editUserPassword.new_password" v-model="editUserPassword.new_password" />
                <div class="form-user-data-line-space"></div>
                <Input type="text" label="Repita sua nova senha" placeholder="●●●●●●●●●●●●" :value="editUserPassword.confirm_new_password" v-model="editUserPassword.confirm_new_password" />
            </div>

            <div class="form-button">
                <Button type="primary" placeholder="Atualizar senha" @buttonPressed="updateUserPassword" />
            </div>
        </section>
    </section>
</template>

<style scoped>
.bg-user-profile {
    width: 100%;
    height: auto;
    margin-bottom: 150px;
}

.bg-user-profile .user-profile-info {
    font-size: 18px;
    font-weight: 500;
    color: #2E2E2E;
    margin-bottom: 20px;
}

.gold {
    color: #C0AB61 !important;
}

.form-button {
    max-width: 300px;
    width: 100%;
}

.form-user-data {
    margin-bottom: 40px;
    border-top: 1px solid #afafaf;
    padding-top: 40px;
}

.form-user-data .form-user-data-line {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 1600px;
    margin: 0px auto;
    margin-bottom: 20px;
}

.form-user-data .form-user-data-line .form-user-data-line-space {
    margin: 0px 10px;
}

.manage-dependents h2 {
    margin-bottom: 20px;
    font-size: 20px;
    color: rgb(42, 42, 42);
}

.add-dependent-button {
    margin-bottom: 30px;
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

.form-add-associate-button {
    width: 100%;
}

@media screen and (max-width:800px) {
    .form-user-data .form-user-data-line {
        flex-direction: column;
    }

    .form-user-data .form-user-data-line-space {
        margin: 10px 0px !important;
    }
}
</style>