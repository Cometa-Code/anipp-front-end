<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import Head from '@/components/Head';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Select from '@/components/Select';
import Loader from '@/components/Loader';
import axios from 'axios';
import SimpleModal from '@/components/SimpleModal.vue';

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
            modalConfirmDelete: false,
            selectedReportDelete: undefined,
        }
    },
    created() {
        if (this.userData.role == 'associate') {
            this.$router.push('/inicio');
        }

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
        deleteReport() {
            this.loader = true;

            this.$axios.delete(`/reports/${this.selectedReportDelete}`)
            .then(res => {
                this.notify('Informativo deletado com sucesso!', 'success');

                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            })
            .catch(err => {
                this.notify('Ocorreu um erro ao tentar deletar o informativo!', 'error');
                return this.loader = false;
            })
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
            }, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
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
        }
    },
    components: { Head, Input, Select, Button, Loader, SimpleModal }
}
</script>

<template>
    <Loader v-if="loader" />

    <SimpleModal v-if="modalConfirmDelete" @close="modalConfirmDelete = false" title="Deseja deletar?" :hasOkButton="true" okButtonDescription="Confirmar" @clickOkButton="deleteReport">
        <div class="warning-delete-content">
            <h1>Atenção!</h1>

            <p>Essa é uma ação que não pode ser revertida!</p>
            <p>Só delete caso tenha certeza!</p>
            
            <div id="space"></div>
        </div>
    </SimpleModal>

    <section class="bg-manage-reports">
        <Head title="Gerenciar Informes" />
    </section>

    <section v-if="modalCreateReport" class="bg-modal-add-report">
        <div class="modal-add-report">
            <header>
                <h2>Adicionar Informativo</h2>
            </header>

            <article>
                <Input type="text" label="Título do informe" placeholder="Informe financeiro 01/2024" :value="createReport.title" v-model="createReport.title" />

                <div class="upload-pdf-div">
                    <label for="upload-pdf">Selecione um arquivo PDF</label>
                    <input type="file" name="upload-pdf" id="upload-pdf" accept="application/pdf" @change="uploadFile">
                </div>
            </article>

            <footer>
                <button class="button-close" @click="closeModalCreateReport">Fechar</button>
                <button class="button-create" @click="createNewReport">Confirmar</button>
            </footer>
        </div>
    </section>

    <section v-if="!loader" class="manage-reports-list">
        <div v-for="(type, index) in reportsListCategories">
            <div @click="!reportsListCategories[index].isActive ? reportsListCategories[index].isActive = true : reportsListCategories[index].isActive = false" class="manage-reports-list-type">
                <p>{{ type.name }}</p>
            </div>

            <div :class="[!type.isActive ? 'hidden' : '', 'second-content']">
                <div @click="createReport.category = index; modalCreateReport = true" class="manage-reports-list-add-button">
                    + Adicionar novo informe
                </div>

                <div v-for="report in type.data" class="manage-reports-list-content">
                    <p>{{ report.title ? report.title : report.file_name }}</p>

                    <div @click="selectedReportDelete = report.id; modalConfirmDelete = true" class="manage-reports-list-delete-content">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </div>
                </div>

                <!-- <div class="manage-reports-list-load-more">
                    Carregar mais informes
                </div> -->
            </div>
        </div>
    </section>
</template>

<style scoped>
.warning-delete-content {
    width: 100%;
    text-align: center;
}

.warning-delete-content h1 {
    font-size: 24px;
    color: rgb(255, 61, 61);
    margin-bottom: 20px;
    margin-top: 20px;
}

.warning-delete-content #space {
    margin-bottom: 20px;
}

.warning-delete-content p {
    font-size: 18px;
    margin-bottom: 5px;
}

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

.gold {
    color: #C0AB61 !important;
}
</style>