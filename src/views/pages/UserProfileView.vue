<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import Head from '@/components/Head';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Select from '@/components/Select';
import Loader from '@/components/Loader';

export default {
    props: {
        userData: {
            type: Object
        }
    },
    data() {
        return {
            loader: false,
            editUserData: {
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
            }
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
        }
    },
    components: { Head, Input, Select, Button, Loader }
}
</script>

<template>
    <Loader v-if="loader" />

    <section class="bg-user-profile">
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
                <Input type="text" label="Seu documento RG" placeholder="Seu RG aqui!" :value="userData.document_rg" :disabled="true" />
                <div class="form-user-data-line-space"></div>
                <Input type="text" label="Orgão expedidor RG" placeholder="Expedidor do seu RG aqui!" :value="userData.document_rg_consignor" :disabled="true" />
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
                <Input type="text" label="Número do telefone" placeholder="999999999" :value="editUserData.phone_number" v-model="editUserData.phone_number" :only-numbers="true" />
            </div>

            <div class="form-button">
                <Button type="primary" placeholder="Salvar dados" @buttonPressed="updateUserData" />
            </div>
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

@media screen and (max-width:800px) {
    .form-user-data .form-user-data-line {
        flex-direction: column;
    }

    .form-user-data .form-user-data-line-space {
        margin: 10px 0px !important;
    }
}
</style>