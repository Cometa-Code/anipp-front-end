<script>
import Card from "@/components/Card.vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    props: {
        userData: {
            type: Object
        }
    },
    created() {
        console.log(this.userData);
    },
    methods: {
        notify(text, type) {
            toast(text, {
                "type": type == 'info' ? 'info' : type == 'warning' ? 'warning' : type == 'error' ? 'error' : type == 'success' ? 'success' : 'default',
            });
        },
    },
    components: { Card }
}
</script>

<template>
    <section class="bg-home-view">
        <figure class="home-view-illustration">
            <img src="@/assets/img/anipp-pagina-inicial-il-1.svg" alt="Ilustração - ANIPP">
        </figure>

        <section class="home-view-content">
            <h1>
                Olá, 
                <span>
                    {{ userData.name }}
                </span>
            </h1>

            <p>Você está no painel de {{ userData.role == 'associate' ? 'associados' : 'administradores' }} da ANIPP.</p>
            <p>Selecione uma opção para prosseguir!</p>
        </section>

        <section class="home-view-cards">
            <!-- Cards Associados -->
            <div v-if="userData.is_associate" class="card">
                <Card 
                    title="Gerenciar perfil" 
                    description="Gerencie o seu perfil, altere seus dados e configure seus dependentes."
                    redirect-title="Gerenciar meu perfil"
                    redirectPage="/perfil"
                    icon="user"
                />
            </div>

            <div v-if="userData.is_associate" class="card">
                <Card 
                    title="Meu financeiro" 
                    description="Acompanhe sua vida financeira na associação."
                    redirect-title="Ver vida financeira"
                    redirectPage="/vida-financeira"
                    icon="wallet"
                />
            </div>

            <div v-if="userData.is_associate" class="card">
                <Card 
                    title="Acompanhe os informes" 
                    description="Veja os informes da associação e fique por dentro de tudo que acontece."
                    redirect-title="Ver informes"
                    redirectPage="/informes"
                    icon="newspaper"
                />
            </div>

            <!-- Cards Administradores -->
            <div v-if="userData.role != 'associate'" class="card">
                <Card 
                    title="Ver associados" 
                    description="Acompanhe os associados e a vida financeira através de históricos de pagamentos."
                    redirect-title="Ver associados"
                    redirectPage="/associados"
                    icon="users"
                />
            </div>

            <div v-if="userData.role != 'associate'" class="card">
                <Card 
                    title="Fluxo de caixa" 
                    description="Acompanhe e gerencie o fluxo de caixa da associação."
                    redirect-title="Acompanhar caixa"
                    redirectPage="/informes"
                    icon="dollar"
                />
            </div>

            <div v-if="userData.role != 'associate'" class="card">
                <Card 
                    title="Gerenciar informes" 
                    description="Gerencie os informes da associação. Adicione e exclua informes."
                    redirect-title="Gerenciar informes"
                    redirectPage="/informes"
                    icon="table-cells"
                />
            </div>
        </section>
    </section>
</template>

<style scoped>
.bg-home-view {
    width: 100%;
    margin-bottom: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.home-view-illustration {
    margin-top: 50px;
}

.home-view-illustration img {
    max-width: 95%;
}

.home-view-content {
    text-align: center;
    margin-top: 40px;
    margin-bottom: 40px;
}

.home-view-content h1 {
    font-size: 24px;
    font-weight: 650;
    color: #2E2E2E;
    margin-bottom: 5px;
}

.home-view-content h1 span {
    color: #C0AB61;
}

.home-view-content p {
    font-weight: 500;
    color: #5b5a5a;
    letter-spacing: 0.1px;
}

.home-view-cards {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
}

.home-view-cards .card {
    width: 350px;
    max-width: 70% !important;
    margin: 0px 15px 30px 15px;
}
</style>