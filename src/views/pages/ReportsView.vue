<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import Head from '@/components/Head';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Select from '@/components/Select';
import Loader from '@/components/Loader';
import axios from 'axios';

export default {
    props: {
        userData: {
            type: Object
        }
    },
    data() {
        return {
            loader: true,
            reportsListCategories: [
                {
                    name: "Ação ANIPP - Documentos",
                    isActive: false,
                    data: [],
                },
                {
                    name: "Assembleias",
                    isActive: false,
                    data: [],
                },
                {
                    name: "Conselho Deliberativo – Atas e Relatórios",
                    isActive: false,
                    data: [],
                },
                {
                    name: "Conselho Fiscal – Atas e Relatórios",
                    isActive: false,
                    data: [],
                },
                {
                    name: "Contratos e Convênios",
                    isActive: false,
                    data: [],
                },
                {
                    name: "Demonstrativos Financeiros",
                    isActive: false,
                    data: [],
                },
                {
                    name: "Diretoria Executiva – Atas e Relatórios",
                    isActive: false,
                    data: [],
                },
                {
                    name: "Informes e Orientações",
                    isActive: false,
                    data: [],
                },
            ],
            createReport: {
                title: "",
                category: 0,
                file_name: "",
                file_url: "",
            },
            selectedUploadFile: null,
            modalCreateReport: false,
            selectedReport: undefined,
            modalSeeReport: false,
        }
    },
    created() {
        this.loader = true;
        this.$axios.get('/reports')
        .then(res => {
            console.log(res);

            res.data.data.forEach(report => {
                switch (report.category) {
                    case 0:
                        this.reportsListCategories[0].data = report.data;
                        break;
                    case 1:
                        this.reportsListCategories[1].data = report.data;
                        break;
                    case 2:
                        this.reportsListCategories[2].data = report.data;
                        break;
                    case 3:
                        this.reportsListCategories[3].data = report.data;
                        break;
                    case 4:
                        this.reportsListCategories[4].data = report.data;
                        break;
                    case 5:
                        this.reportsListCategories[5].data = report.data;
                        break;
                    case 6:
                        this.reportsListCategories[6].data = report.data;
                        break;
                    case 7:
                        this.reportsListCategories[7].data = report.data;
                        break;
                }
            });

            this.loader = false;
            console.log(this.reportsListCategories);
        })
        .catch(err => {
            this.notify('Ocorreu um erro enquanto buscavamos os informes.', 'error');

            setTimeout(() => {
                this.$router.push('/inicio');
            }, 2000)
        });
    },
    methods: {
        notify(text, type) {
            toast(text, {
                "type": type == 'info' ? 'info' : type == 'warning' ? 'warning' : type == 'error' ? 'error' : type == 'success' ? 'success' : 'default',
            });
        },
        closeModalCreateReport() {
            this.createReport = {
                title: "",
                category: 0,
                file_name: "",
                file_url: "",
            };

            return this.modalCreateReport = false;
        },
        createNewReport() {
            console.log(this.selectedUploadFile);

            axios.post('https://files.associados.anipp.org.br/create.php', {
                file: this.selectedUploadFile
            })
            .then(res => {
                this.createReport.file_name = res.data;
                this.createReport.file_url = `https://files.associados.anipp.org.br/uploads/${res.data}`;

                this.$axios.post('/reports', this.createReport)
                .then(res => {
                    this.notify('Informe adicionado com sucesso!', 'success');
                    
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                })
                .catch(err => {
                    this.notify('Ocorreu um erro durante a criação do informativo e não foi possível finalizar!', 'error');
                    return this.loader = false;
                });
            })
            .catch(err => {
                this.notify('Ocorreu um erro durante a criação do informativo e não foi possível finalizar!', 'error');
                return this.loader = false;
            })
        },
        uploadFile(event) {
            this.selectedUploadFile = event.target.files[0];
        },
    },
    components: { Head, Input, Select, Button, Loader }
}
</script>

<template>
    <Loader v-if="loader" />

    <section class="bg-manage-reports">
        <Head title="Informativos" />
    </section>

    <section v-if="modalSeeReport" class="bg-add-associate">
        <Head title="Ver informativo" />

        <div @click="modalSeeReport = false" class="close-add-associate">
            x
        </div>

        <section class="see-report">
            <iframe :src="`${selectedReport}#toolbar=0`" style="border: none"></iframe>
        </section>
    </section>

    <section v-if="!loader" class="manage-reports-list">
        <div v-for="(type, index) in reportsListCategories">
            <div @click="!reportsListCategories[index].isActive ? reportsListCategories[index].isActive = true : reportsListCategories[index].isActive = false" class="manage-reports-list-type">
                <p>{{ type.name }}</p>
            </div>

            <div :class="[!type.isActive ? 'hidden' : '']">

                <div @click="selectedReport = report.file_url; modalSeeReport = true" v-for="report in type.data" class="manage-reports-list-content">
                    <p>{{ report.title ? report.title : report.file_name }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.bg-manage-reports {
    width: 100%;
    height: auto;
    margin-bottom: 10px;
}

.bg-manage-reports .user-profile-info {
    font-size: 18px;
    font-weight: 500;
    color: #2E2E2E;
    margin-bottom: 20px;
}

.manage-reports-list {
    width: 100%;
    height: auto;
    margin-bottom: 150px;
}

.manage-reports-list-type {
    padding: 15px 12px;
    background-color: #d6d6d6;
    margin-top: 10px;
    border-radius: 5px;
    cursor: pointer;
}

.manage-reports-list-add-button {
    padding: 10px;
    background-color: transparent;
    border: 2px dashed #C0AB61;
    color: #C0AB61;
    cursor: pointer;
    transition: .2s;
}

.manage-reports-list-load-more {
    padding: 10px;
    background-color: #F5F1E5;
    border: 1px solid #C0AB61;
    color: #C0AB61;
    font-weight: 550;
    border-radius: 0px 0px 5px 5px;
    cursor: pointer;
    text-align: center;
}

.manage-reports-list-content {
    padding: 12px 10px;
    background-color: #e5e5e5;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
}

.manage-reports-list-content-active {
    background-color: #eeeeee;
}

.second-content {
    margin-left: 20px;
}

.manage-reports-list-delete-content {
    background-color: transparent;
    border: 1px solid #ff4545;
    padding: 5px;
    border-radius: 5px;
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 5px;
    cursor: pointer;
    color: #ff4545;
    transition: .2s;
}

.manage-reports-list-delete-content:hover {
    background-color: #ff4545;
    color: white;
    transition: .2s;
}

.manage-reports-list-delete-content .icon {
    width: 14px;

}

.hidden {
    display: none !important;
}

.manage-reports-list-add-button:hover {
    background-color: #C0AB61;
    color: white;
    transition: .2s;
}

.bg-modal-add-report {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 19;
    background-color: rgba(0, 0, 0, 0.316);
    top: 0px;
    margin-top: -101px;
    left: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-y: auto;
}

.modal-add-report {
    width: 700px;
    max-width: 98%;
    height: auto;
    margin-top: 200px;
    margin-bottom: 100px;
}

.modal-add-report header {
    width: 100%;
    padding: 20px 30px;
    border-radius: 10px 10px 0px 0px;
    border: 1px solid gray;
    background-color: white;
}

.modal-add-report header h2 {
    font-size: 18px;
    font-weight: 550;
    color: #2E2E2E;
}

.modal-add-report article {
    width: 100%;
    padding: 20px 30px;
    height: auto;
    background-color: white;
    border: 1px solid gray;
    border-top: none;
}

.modal-add-report footer {
    width: 100%;
    padding: 20px 30px;
    border-radius: 0px 0px 10px 10px;
    border: 1px solid gray;
    border-top: none;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.modal-add-report footer button {
    padding: 10px 30px;
    background-color: rgb(233, 233, 233);
    font-size: 16px;
    font-weight: 500;
    color: rgb(59, 59, 59);
    border: 1px solid rgb(184, 184, 184);
    border-radius: 5px;
    cursor: pointer;
    transition: .2s;
}

.modal-add-report footer button:hover {
    transition: .2s;
}

.modal-add-report footer .button-close {
    background-color: rgb(233, 233, 233);
    color: rgb(59, 59, 59);
    border: 1px solid rgb(184, 184, 184);
}

.modal-add-report footer .button-close:hover {
    background-color: rgb(215, 215, 215);
}

.modal-add-report footer .button-create {
    background-color: var(--primary-color);
    border: 2px solid var(--primary-color);
    color: var(--white-color);
    margin-left: 5px;
}

.modal-add-report footer .button-create:hover {
    background-color: transparent;
    color: var(--primary-color);
}

.upload-pdf-div {
    display: flex;
    flex-direction: column;
}

.upload-pdf-div label {
    font-size: 16px;
    font-weight: 600;
    color: var(--primary-color);
    margin-bottom: 6px;
    margin-top: 14px;
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

.see-report {
    width: 100%;
    height: auto;
}

.see-report iframe {
    width: 100%;
    height: 100vh;
    margin-bottom: 150px;
}

.gold {
    color: #C0AB61 !important;
}
</style>