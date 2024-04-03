<script>
import Card from "@/components/Card.vue";

export default {
    created() {
        this.$axios.get('/user')
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
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
                    Vitor Barroso!
                </span>
            </h1>

            <p>Você está no painel de associados da ANIPP.</p>
            <p>Selecione uma opção para prosseguir!</p>
        </section>

        <section class="home-view-cards">
            <div class="card">
                <Card 
                    title="Gerenciar perfil" 
                    description="Gerencie o seu perfil, altere seus dados e configure seus dependentes."
                    redirect-title="Gerenciar meu perfil"
                    redirectPage="/perfil"
                    icon="user"
                />
            </div>

            <div class="card">
                <Card 
                    title="Meu financeiro" 
                    description="Acompanhe sua vida financeira na associação."
                    redirect-title="Ver vida financeira"
                    redirectPage="/financeiro-associado"
                    icon="wallet"
                />
            </div>

            <div class="card">
                <Card 
                    title="Acompanhe os informes" 
                    description="Veja os informes da associação e fique por dentro de tudo que acontece."
                    redirect-title="Ver informes"
                    redirectPage="/informes"
                    icon="newspaper"
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