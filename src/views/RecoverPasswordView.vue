<script>
import Input from '@/components/Input.vue';
import Button from '@/components/Button.vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    data() {
        return {
            recoverPassword: {
                password: "",
                passwordConfirmation: "",
                email: "",
                token: ""
            },
            request: false,
            viewUI: false,
        }
    },
    created() {
        const userToken = localStorage.getItem('UAUTHTKKEY');

        if (userToken) {
            this.$router.push('/inicio')
        }

        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token')
        const email = urlParams.get('email')
        this.recoverPassword.token = token;
        this.recoverPassword.email = email;
        
        if (!token || !email) {
            return this.$router.push('/acessar');
        }

        this.$axios.get(`user/recover-password/verify-token/${token}`)
        .then(res => {
            this.viewUI = true;
        })
        .catch(err => {
            return this.$router.push('/acessar');
        });
    },
    methods: {
        notify(text, type) {
            toast(text, {
                "type": type == 'info' ? 'info' : type == 'warning' ? 'warning' : type == 'error' ? 'error' : type == 'success' ? 'success' : 'default',
            });
        },
        checkPassword() {
            this.samePasswords = this.recoverPassword.password.length > 0 && this.recoverPassword.password == this.recoverPassword.passwordConfirmation;
            this.hasEightCharacters = this.recoverPassword.password.length >= 8;
            this.hasOneUpperCase = /[A-Z]/.test(this.recoverPassword.password);
            this.hasOneNumber = /[0-9]/.test(this.recoverPassword.password);
        },
        sendRecoverPassword() {
            if (
                this.samePasswords && 
                this.hasEightCharacters && 
                this.hasOneUpperCase && 
                this.hasOneNumber && 
                !this.request
            ) {
                this.request = true;
                this.notify('Definindo nova senha!', 'info');

                this.$axios.post('user/recover-password/set-password', {
                    new_password: this.recoverPassword.password,
                    token: this.recoverPassword.token,
                    email: this.recoverPassword.email,
                })
                .then(res => {
                    this.notify(res.data.message, 'success');

                    setTimeout(() => {
                        this.$router.push('/acessar');
                    }, 1000);
                })
                .catch(err => {
                    this.request = false;
                    return this.notify(err.response.data.message, 'error');
                })
            }
        },
    },
    components: { Input, Button }
}
</script>

<template>
    <section id="bg-access">
        <div v-if="viewUI" id="left-banner"></div>

        <article v-if="viewUI" id="form-access">
            <section id="form-access-header">
                <h1>ANIPP</h1>
                <h2>Recupere sua senha</h2>
            </section>
            <section id="form-access-inputs">
                <Input label="Digite sua nova senha:" type="password" placeholder="●●●●●●●●●●●●" inputName="document" :onlyNumbers="false" :value="recoverPassword.password" v-model="recoverPassword.password" @update:modelValue="checkPassword" :visibilyPassword="true"  />
                
                <Input label="Repita sua nova senha:" type="password" placeholder="●●●●●●●●●●●●" inputName="confirmPassword" :onlyNumbers="false" :value="recoverPassword.passwordConfirmation" v-model="recoverPassword.passwordConfirmation" @update:modelValue="checkPassword" class="mt-1p5" :visibilyPassword="true" />

                <section id="confirmations-secure-password" class="mt-1p5">
                    <p :class="samePasswords ? 'active-confirmation' : 'non-confirmation'">As senhas serem iguais</p>
                    <p :class="hasEightCharacters ? 'active-confirmation' : 'non-confirmation'">Ter mais de 8 caracteres</p>
                    <p :class="hasOneUpperCase ? 'active-confirmation' : 'non-confirmation'">Ter uma letra maiúscula</p>
                    <p :class="hasOneNumber ? 'active-confirmation' : 'non-confirmation'">Ter um número</p>
                </section>

                <Button type="primary" placeholder="Definir senha" class="mt-3" @buttonPressed="sendRecoverPassword" />
            </section>
        </article>
    </section>
</template>

<style scoped>
#bg-access {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: justify-between;
}

#left-banner {
    height: 100vh;
    width: 45%;
    background-image: url('@/assets/img/bg-access-left-banner.png');
    background-size: cover;
    background-repeat: no-repeat;
}

#form-access {
    width: 55%;
    max-width: 100%;
    padding: 10px 100px;
}

#form-access #form-access-header {
    text-align: center;
    margin-bottom: 50px;
}

#form-access #form-access-header h1 {
    color: var(--primary-color);
    font-size: 24px;
    margin-bottom: 5px;
}

#form-access #form-access-header h2 {
    font-size: 20px;
    font-weight: 600;
    color: var(--secondary-color);
}

#confirmations-secure-password {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
}

#confirmations-secure-password p {
    font-size: 16px;
    line-height: 20px;
    font-weight: 450;
}

.non-confirmation {
    color: rgb(255, 99, 99);
}

.active-confirmation {
    color: rgb(86, 203, 40);
}

@media screen and (max-width: 1000px) {
    #bg-access {
        height: 100vh;
        justify-content: center;
    }

    #left-banner {
        display: none;
    }

    #form-access {
        width: 100%;
        padding: 10px 30px;
    }
}
</style>