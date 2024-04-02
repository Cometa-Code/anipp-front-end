<script>
export default {
    props: {
        title: {
            type: String
        },
        description: {
            type: String
        },
        redirectTitle: {
            type: String
        },
        redirectPage: {
            type: String
        },
        icon: {
            type: String
        }
    }
}
</script>

<template>
    <div class="bg-card">
        <div class="card-infos">
            <div class="card-infos-left">
                <h4>{{ title }}</h4>
                <p>{{ description }}</p>
            </div>

            <div class="card-infos-right">
                <svg v-if="icon == 'user'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon">
                    <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" />
                </svg>

                <svg v-if="icon == 'wallet'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon">
                    <path d="M2.273 5.625A4.483 4.483 0 0 1 5.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 3H5.25a3 3 0 0 0-2.977 2.625ZM2.273 8.625A4.483 4.483 0 0 1 5.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 6H5.25a3 3 0 0 0-2.977 2.625ZM5.25 9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3H15a.75.75 0 0 0-.75.75 2.25 2.25 0 0 1-4.5 0A.75.75 0 0 0 9 9H5.25Z" />
                </svg>

                <svg v-if="icon == 'newspaper'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon">
                    <path fill-rule="evenodd" d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 0 0 3 3h15a3 3 0 0 1-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125ZM12 9.75a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H12Zm-.75-2.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75ZM6 12.75a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5H6Zm-.75 3.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75ZM6 6.75a.75.75 0 0 0-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-3A.75.75 0 0 0 9 6.75H6Z" clip-rule="evenodd" />
                <path d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 0 1-3 0V6.75Z" />
                </svg>
            </div>
        </div>

        <div class="card-bottom">
            <router-link class="router-link" :to="redirectPage"><p>{{ redirectTitle }}</p></router-link>
        </div>
    </div>
</template>

<style scoped>
.bg-card {
    width: 100%;
    height: auto;
    min-height: 160px;
    border: 1px solid #C0AB61;
    border-radius: 10px;
    position: relative;
}

.card-infos {
    padding: 15px;
    display: flex;
    align-items: flex-start;
}

.card-infos h4 {
    font-size: 16px;
    color: #2E2E2E;
}

.card-infos p {
    font-size: 14px;
    font-weight: 450;
    color: #5b5a5a;
    margin-top: 5px;
}

.card-infos .card-infos-left {
    padding-right: 14px;
}

.card-infos .card-infos-right .icon {
    width: 70px;
    color: #ABABAB;
}

.card-bottom {
    width: 100%;
    position: absolute;
    bottom: 0px;
    text-align: center;
    padding: 8px 0px;
    border-top: 1px solid #C0AB61;
    font-weight: 550;
    font-size: 16px;
    transition: .2s;
    cursor: pointer;
    color: #C0AB61;
}

.card-bottom .router-link {
    color: inherit;
}

.card-bottom:hover {
    background-color: #C0AB61;
    border-radius: 0px 0px 7px 7px;
    transition: .2s;
    color: white;
}
</style>