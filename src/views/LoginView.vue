<script>
import Input from '@/components/Input.vue';
import Button from '@/components/Button.vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    data() {
        return {
            recoverPasswordView: false,
            loginData: {
                user: "",
                password: "",
            },
            request: false,
        }
    },
    created() {
        const userToken = localStorage.getItem('UAUTHTKKEY');

        if (userToken) {
            this.$router.push('/inicio')
        }
    },
    methods: {
        notify(text, type) {
            toast(text, {
                "type": type == 'info' ? 'info' : type == 'warning' ? 'warning' : type == 'error' ? 'error' : type == 'success' ? 'success' : 'default',
            });
        },
        login() {
            if (this.loginData.user.length > 0 && this.loginData.password.length > 0 && !this.request) {
                this.request = true;
                this.notify('Validando dados de login...', 'info');

                this.$axios.post('user/login', {
                    user: this.loginData.user,
                    password: this.loginData.password
                })
                .then(res => {
                    this.notify(res.data.message, 'success');
                    localStorage.setItem("UAUTHTKKEY", res.data.data.token);
                    setTimeout(() => {
                        this.$router.push('/inicio');
                    }, 1000);
                })
                .catch(err => {
                    this.request = false;
                    return this.notify(err.response.data.message, 'error');
                })
            }
        },
        recoverPassword() {
            console.log("Solicitação enviada");
        },
    },
    components: { Input, Button }
}
</script>

<template>
    <section id="bg-access">
        <div id="left-banner"></div>

        <article id="form-access">
            <section id="form-access-header">
                <h1>ANIPP</h1>
                <h2 v-if="!recoverPasswordView">Conecte-se ao sistema</h2>
                <h2 v-if="recoverPasswordView">Recupere sua senha</h2>
            </section>
            <section id="form-access-inputs">
                <Input label="Digite seu CPF:" type="text" placeholder="00000000000" inputName="document" :onlyNumbers="true" v-model="loginData.user" />
                
                <Input v-if="!recoverPasswordView" label="Digite sua senha:" type="password" placeholder="●●●●●●●●●●●●" inputName="password" :onlyNumbers="false" v-model="loginData.password" class="mt-1p5" />

                <Button v-if="!recoverPasswordView" type="primary" placeholder="Conecte-se" class="mt-3" @buttonPressed="login" />
                <Button v-if="recoverPasswordView" type="primary" placeholder="Solicitar recuperação" class="mt-3" @buttonPressed="recoverPassword" />

                <Button v-if="!recoverPasswordView" typer="tertiary" placeholder="Esqueceu sua senha? Clique aqui!" class="mt-1" @buttonPressed="recoverPasswordView = true" />
                <Button v-if="recoverPasswordView" typer="tertiary" placeholder="Lembrou a senha? Clique aqui!" class="mt-1" @buttonPressed="recoverPasswordView = false" />
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