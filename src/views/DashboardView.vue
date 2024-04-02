<script>
export default {
    data() {
        return {
            mobileLateralNavbarIsActive: false,
        }
    },
    methods: {
        openMobileLateralNavBar() {
            const mobileLateralNavbar =  document.getElementById("lateral-nav-bar");

            mobileLateralNavbar.style.margin = "auto";
            mobileLateralNavbar.style.width = "350px";
            
            this.mobileLateralNavbarIsActive = true;
        },
        closeMobileLateralNavBar() {
            const mobileLateralNavbar =  document.getElementById("lateral-nav-bar");
            
            mobileLateralNavbar.style.margin = "0px 0px 0px -358px";
            mobileLateralNavbar.style.width = "400px";

            this.mobileLateralNavbarIsActive = false;
        },
    }
}
</script>

<template>
    <section class="dashboard-bg">
        <section class="top-bar">
            <figure class="top-bar-figure">
                <img src="@/assets/logo2.png" alt="Logo Anipp">
            </figure>

            <section class="top-bar-icons">
                <a href="https://anipp.org.br/" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                </a>

                <router-link to="/informes">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                    </svg>
                </router-link>

                <router-link to="/perfil">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </router-link>
            </section>
        </section>

        <section class="center-content">
            <section id="lateral-nav-bar" class="lateral-nav-bar">
                <header>
                    <h2>Painel de associados:</h2>

                    <div @click="!mobileLateralNavbarIsActive ? openMobileLateralNavBar() : closeMobileLateralNavBar()" class="open-close-modal">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </div>
                </header>

                <nav>
                    <div class="active">
                        <router-link id="first-router-link" class="router-link" to="/inicio">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>

                            <p>Página inicial</p>
                        </router-link>
                    </div>

                    <div>
                        <router-link class="router-link" to="/inicio">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                            </svg>

                            <p>Vida financeira</p>
                        </router-link>
                    </div>

                    <div>
                        <router-link class="router-link" to="/inicio">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                            </svg>

                            <p>Informes</p>
                        </router-link>
                    </div>
                </nav>
            </section>

            <section class="center-content-section">
                <router-view/>
            </section>
        </section>
    </section>
</template>

<style scoped>
.top-bar {
    width: 100%;
    height: auto;
    padding: 25px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #afafaf;
}

.top-bar-icons {
    display: flex;
}

.top-bar-icons a,
.top-bar-icons router-link {
    margin: 0px 6px;
    cursor: pointer;
}

.top-bar-icons a .icon,
.top-bar-icons router-link .icon {
    width: 26px;
    color: #2E2E2E;
}

.center-content {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
}

.center-content .lateral-nav-bar {
    width: 400px;
    height: 100vh;
    border-right: 1px solid #afafaf;
    padding: 20px 0px;
}

.center-content .lateral-nav-bar header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.center-content .lateral-nav-bar header .open-close-modal {
    cursor: pointer;
    display: none;
}

.center-content .lateral-nav-bar header .open-close-modal .icon {
    width: 30px;
    margin-top: -5px;
    margin-right: 5px;
    color: #3a3a3a;
}

.center-content .lateral-nav-bar header h2 {
    font-size: 16px;
    font-weight: 600;
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 14px;
    color: #3a3a3a;
}

.center-content .lateral-nav-bar nav div {
    width: 100%;
    padding: 16px 0px;
}

.center-content .lateral-nav-bar nav .active {
    width: 90%;
    background-color: #D7C27B;
    border-radius: 0px 30px 30px 0px;
    transition: 0.3s
}

.center-content .lateral-nav-bar nav div .router-link {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 20px;
}

.center-content .lateral-nav-bar nav div p {
    color: #2E2E2E;
    font-size: 16px;
    font-weight: 550;
    padding-left: 10px;
}

.center-content .lateral-nav-bar nav div .icon {
    width: 20px !important;
    color: #2E2E2E;
}

.center-content-section {
    background-color: #F3F2F2;
    width: 90%;
    height: 100vh;
    overflow-y: auto;
    padding: 20px 20px 0px 25px;
}

@media screen and (max-width:970px) {
    .center-content-section {
        width: 100%;
        padding: 20px 20px 0px 70px;
    }

    .center-content .lateral-nav-bar nav .active {
        width: 80%;
        transition: 0.3s
    }

    .center-content .lateral-nav-bar {
        position: absolute;
        margin-left: -358px;
        background-color: #FFF;
    }

    .center-content .lateral-nav-bar header .open-close-modal {
        display: flex;
    }
}
</style>