<template>
    <div>
        <v-tabs v-model="tab" class="mb-2">
          <v-tab v-for="(tab, index) in tabs" :key="index" @click="handleTabClick(tab)">{{ tab.name }}</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <!-- Create/Change -->
            <v-tab-item>
                <v-card outlined class="mx-auto style-card" color="surface-variant">
                    <div class="box-check">
                        <h1 class="f-20 mb-1">Check</h1>
                        <div class="border border-b-lg " style="height: 64px; width: 64px;"></div>
                        <v-container>
                            <v-row class="my-2">

                                <v-col cols="12" md="6" class="text-center px-0 py-0">
                                    <span>Employee Status</span>
                                </v-col>
                                <v-col cols="12" md="6" class="px-0 py-0"></v-col>

                                <v-col cols="12" md="6"  class="text-center">
                                    <InputSearchHN 
                                        ref="EmpStatusField"
                                        title="Active Status"
                                        label="Employee Status Code / Employee Status Name" 
                                        code="Active Status Code" 
                                        name="Active Status name"
                                        type="EmployeeStatus" 
                                        dataUpdate="EmployeeStatus"
                                        @childEvent="getselectedItemEmpStatus"
                                    />
                                  
                                </v-col>

                                <v-col cols="12" md="6" align-self="center" class="d-flex justify-space-between align-center">
                                    
                                    <span class="f-12 pr-3">Employee Status Name : {{ selectedItemEmpStatus.LocalName }}</span>
                                    <v-btn @click="checkEmpStatus" class="bg-orange">Check</v-btn>
                                </v-col>
                            </v-row>
                        </v-container>

                        <div class="border-gray border-b-lg mb-3" style="height: 64px; width: 64px;"></div>
                        <h1 class="f-16 mb-1">Table Mapping</h1>
                        <v-data-table
                            :headers="headersData"
                            :items="dataTermPayment"
                            density="compact"
                            item-key="name"
                            :footer-props="{ 'items-per-page-options': [10, 25, 50, 100] }"
                            class="style-table"
                        >
                            <template v-slot:[`item.Action`]="{ item }">
                                <v-btn density="compact" icon class="bg-red text-white" @click="removeHNActivity(item)">
                                    <v-icon>mdi-close</v-icon>
                                </v-btn>
                            </template>
                        </v-data-table>
                    </div>

                    <div class="box-relationship-mapping">
                        <h1 class="f-20 mb-1">Relationship Mapping</h1>
                        <div class="border border-b-lg " style="height: 64px; width: 64px;"></div>

                        <v-form
                            ref="formMapping"
                            v-model="valid"
                            lazy-validation
                        
                        >

                     
                        <v-row class="mb-3">

                            <v-col cols="12" md="2"></v-col>

                            <v-col cols="12" md="4">
                                <SelectSystemCode ref="selectSystemCode"/>
                            
                            </v-col>

                            <v-col cols="12" md="4">
                                <SelectCompanyCode ref="selectCompanyCode"/>
                            </v-col>

                            <v-col cols="12" md="2"></v-col>
                         

                        </v-row>

                        <div class=" border-bottom pb-0"></div>

                        <v-row class="my-2">  
                         
                            <v-col cols="12" md="6">
                                <h2 class="f-16">Active Status SSB</h2>
                                <v-row class="mt-3">
                                    <v-col cols="12" md="4">
                                        <span class="f-12">Active Status Code</span>
                                    </v-col>
                                    <v-col cols="12" md="8">

                                        <InputSearch 
                                            title="Active Status"
                                            label="Active Status" 
                                            code="Active Status Code" 
                                            name="Active Status name"
                                            type="EmployeeStatus" 
                                            dataUpdate="ActiveStatusSSB"
                                            @childEvent="getselectedItemActiveStatusSSB"
                                        />

                                       
                                    </v-col>
                                </v-row>

                                <v-row class="mt-3">
                                    <v-col cols="12" md="4">
                                        <span class="f-12">Active Status Name</span>
                                    </v-col>
                                    <v-col cols="12" md="8">
                                        <p class="f-12 border-bottom pb-0 h25">{{selectedItemActiveStatusSSB.LocalName}}</p>
                                    </v-col>
                                </v-row>

                            </v-col>

                            <v-col cols="12" md="6">
                                <h2 class="f-16">Active Status SAP</h2>
                                <v-row class="mt-3">
                                    <v-col cols="12" md="4">
                                        <span class="f-12">Active Status Code</span>
                                    </v-col>
                                    <v-col cols="12" md="8">
                                        
                                        <InputSearch 
                                            title="Active Status"
                                            label="Active Status" 
                                            code="Active Status Code" 
                                            name="Active Status name"
                                            type="EmployeeStatus" 
                                            @childEvent="getselectedItemActiveStatusSAP"
                                        />
                                    </v-col>
                                </v-row>

                                <v-row class="mt-3">
                                    <v-col cols="12" md="4">
                                        <span class="f-12">Active Status Name</span>
                                    </v-col>
                                    <v-col cols="12" md="8">
                                        <p class="f-12 border-bottom pb-0 h25">{{selectedItemActiveStatusSAP.GLDes}}</p>
                                    </v-col>
                                    
                                </v-row>
                            </v-col>
                        
                        </v-row>
                        
                   
                        <v-btn @click="MappingCashGL" class="bg-orange" block>Update Data</v-btn>
                        </v-form>

                    
                    </div>
                </v-card>
            </v-tab-item>

            <!-- Export -->
            <v-tab-item>
                <v-card outlined class="mx-auto style-card" color="surface-variant">
                    <h1 class="f-20">Export</h1>
                    <div class="border border-b-lg " style="height: 64px; width: 64px;"></div>
                    <v-row class="py-3">
                        <v-col>
                            <h2 class="f-16">
                                Table Mapping
                            </h2>
                        </v-col>

                        <v-col class="text-right">
                            <v-btn class="bg-blue"  @click="exportToExcel">Export</v-btn>
                        </v-col>
                    </v-row>
                    <v-data-table
                        :headers="headersExport"
                        :items="datasExport"
                        :loading="loading"
                        density="compact"
                        item-key="name"
                        :footer-props="{ 'items-per-page-options': [10, 25, 50, 100] }"
                        class="style-table"
                    >
                        <!-- Header Template for CompanyCode -->
                        <template v-slot:[`header.CompanyCode`]="{ header }">
                            <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedCompanyCode"
                                :select-items="selectOptionsForColumn('CompanyCode', datasExport)"
                                @update:selectedValue="updateSelectedCompanyCode"
                                @search="searchCompanies('CompanyCode', $event)"
                            />
                        </template>

                        <!-- Header Template for SystemCode -->
                        <template v-slot:[`header.SystemCode`]="{ header }">
                        <HeaderSelect
                            :header-text="header.text"
                            :selected-value="selectedSystemCode"
                            :select-items="selectOptionsForColumn('SystemCode')"
                            @update:selectedValue="updateSelectedSystemCode"
                            @search="searchCompanies('SystemCode', $event)"
                        />
                        </template>

                        <!-- Header Template for ActiveStatusCode -->
                        <template v-slot:[`header.ActiveStatusCode`]="{ header }">
                            <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedActiveStatusCode"
                                :select-items="selectOptionsForColumn('ActiveStatusCode', datasExport)"
                                @update:selectedValue="updateSelectedActiveStatusCode"
                                @search="searchCompanies('ActiveStatusCode', $event)"
                            />
                        </template>

                        <!-- Header Template for LocalName -->
                        <template v-slot:[`header.LocalName`]="{ header }">
                            <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedLocalName"
                                :select-items="selectOptionsForColumn('LocalName', datasExport)"
                                @update:selectedValue="updateSelectedLocalName"
                                @search="searchCompanies('LocalName', $event)"
                            />
                        </template>

                        <!-- Header Template for STAT2 -->
                        <template v-slot:[`header.STAT2`]="{ header }">
                            <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedSTAT2"
                                :select-items="selectOptionsForColumn('STAT2', datasExport)"
                                @update:selectedValue="updateSelectedSTAT2"
                                @search="searchCompanies('STAT2', $event)"
                            />
                        </template>

                        <!-- Header Template for Description -->
                        <template v-slot:[`header.Description`]="{ header }">
                            <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedDescription"
                                :select-items="selectOptionsForColumn('Description', datasExport)"
                                @update:selectedValue="updateSelectedDescription"
                                @search="searchCompanies('Description', $event)"
                            />
                        </template>

                    </v-data-table>
                </v-card>
            </v-tab-item>
        </v-tabs-items>

    </div>


</template>
<script>
// import axios from "axios";
import * as XLSX from 'xlsx';
// import Swal from 'sweetalert2';
import SelectCompanyCode from '@/components/SelectCompanyCode.vue';
import SelectSystemCode from '@/components/SelectSystemCode.vue';
import InputSearch from '@/components/InputSearch.vue';
import InputSearchHN from '@/components/InputSearchHN.vue';
import HeaderSelect from '@/components/HeaderSelect.vue';
export default{
    components: {SelectCompanyCode, SelectSystemCode, InputSearch, InputSearchHN, HeaderSelect},
    data: () => ({
        tab: null, // Selected tab
        tabs: [
            { name: 'Create/Change' },
            { name: 'Export' },
        ],

        menu: false,
        selectedItem: null,
        search: '',
        selectedItems: [],
        scrollTo: null,

        valid:true,
        loading: true,
        dataTermPayment : [],
        selectedItemEmpStatus: {},
        selectedItemActiveStatusSSB: {},
        selectedItemActiveStatusSAP: {},
        datasExport : [],
        SelectHNActivity:[],
        posting_key: null,
        posting_key2: null,
        headersData: [
            { text: 'Company Code', align: 'left', sortable: false, value: 'CompanyCode' },
            { text: 'System Code', align: 'left', sortable: false, value: 'SystemCode' },
            { text: 'Active Status Code', align: 'left', sortable: false, value: 'ActiveStatusCode' },
            { text: 'Local Name', align: 'left', sortable: false, value: 'LocalName' },
            { text: 'STAT2', align: 'left', sortable: false, value: 'STAT2' },
            { text: 'Description', align: 'left', sortable: false, value: 'Description' },
            { text: 'Delete', align: 'center', sortable: false, value: 'Action' },
        ],
        headersExport: [
            { text: 'Company Code', align: 'left', sortable: false, value: 'CompanyCode' },
            { text: 'System Code', align: 'left', sortable: false, value: 'SystemCode' },
            { text: 'Active Status Code', align: 'left', sortable: false, value: 'ActiveStatusCode' },
            { text: 'Local Name', align: 'left', sortable: false, value: 'LocalName' },
            { text: 'STAT2', align: 'left', sortable: false, value: 'STAT2' },
            { text: 'Description', align: 'left', sortable: false, value: 'Description' },
        ],

        selectedCompanyCode: [],
        selectedSystemCode: [],
        selectedActiveStatusCode: [],
        selectedLocalName: [],
        selectedSTAT2: [],
        selectedDescription: [],
    }),

   
    methods: {
        // updateSelectedCompanyCode(value) {
        //     this.selectedCompanyCode = value;
        // },
        // updateSelectedSystemCode(value) {
        //     this.selectedSystemCode = value;
        // },
        updateSelectedActiveStatusCode(value) {
            this.selectedActiveStatusCode = value;
        },
        updateSelectedLocalName(value) {
            this.selectedLocalName = value;
        },
        updateSelectedSTAT2(value) {
            this.selectedSTAT2 = value;
        },
        updateSelectedDescription(value) {
            this.selectedDescription = value;
        },
        handleTabClick(tab) {
            switch (tab.name) {
                case "Create/Change":
                    break;
                case "Export":
                    this.getExportEmployeeStatus()
                    break;
                default:
                    // Default action
                    break;
            }
        },
        async getExportEmployeeStatus(){
            try {
                this.loading        = await true
                let EmployeeStatusPath = '/api/SAP/EmployeeStatus'
                let response        = await this.$axios.get(EmployeeStatusPath);
                await setTimeout(() => {
                    this.loading = false;
                    this.datasExport = response.data;
                }, 300);
            } catch (error) {
                this.loading = await false
                // console.error('Error fetching data:', error);
            }
        },
        exportToExcel() {
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(this.datasExport);
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

            /* generate XLSX file and send to client */
            XLSX.writeFile(wb, 'TMHNActivity.xlsx');
        },

        removeHNActivity(value){
            console.log(value);
        },

        async checkEmpStatus(){

            if(this.selectedItemEmpStatus){
                this.checkInputData('Employee Status', this.$refs.EmpStatusField)
            }else{
                try {
                    this.loading                = await true
                    let GetTmCashAndGLIDPath     = `/api/SAP/CashAndGL/GetEmpStatusID?HNReceiveCode=${this.selectedItemEmpStatus}`
                    let response                = await this.$axios.get(GetTmCashAndGLIDPath);
                    this.dataTermPayment         = response.data;
                    
                } catch (error) {
                    this.loading = await false
                    console.error('Error fetching data:', error);
                }
            }

           
        },
        
        async MappingCashGL(){

            const selectCompanyCode   = this.$refs.selectCompanyCode.selecItem;
            const selectSystemCode    = this.$refs.selectSystemCode.selecItem;

            if(this.$refs.formMapping.validate()){

                try {

                    if(this.dataTermPayment.length > 0){

                        await this.$swal.fire({
                            title: "Warning",
                            text: "Data has already map. Are you sure to map again? ",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#52A1DB",
                            cancelButtonColor: "#52A1DB",
                            confirmButtonText: "OK",
                            customClass: {
                                title: 'text-warning' // Add your custom class here
                            }
                            }).then(async(result) => {
                            if (result.isConfirmed) {
                                let fd  = {
                                    "companyCode": selectCompanyCode,
                                    "systemCode": selectSystemCode,
                                    "hnReceiveCode": this.selectedItemHNTwo.Code,
                                    "localName": this.selectedItemHNTwo.LocalName,
                                    "englishName": this.selectedItemHNTwo.EnglishName,
                                    "glsarCode": this.selectedItemGLSAR.GLNo,
                                    "glsarName": this.selectedItemGLSAR.GLDes,
                                    "postingKey": this.posting_key,
                                    "postingKey2": this.posting_key2,
                                    "glsapCode": this.selectedItemGLSAP.GLNo,
                                    "key2Description": "string",
                                    "specialGL":this.selectedItemspecialGL.GLNo,
                                }

                                let MappingCashGLPath       =   `/api/SAP/CashAndGL/MappingCashGL`
                                await this.$axios.post(`${MappingCashGLPath}`, fd)


                                // if(response){
                                    this.$swal.fire({
                                        icon: "success",
                                        title: "Complete",
                                        text: "You data was saved.",
                                        customClass: {
                                            title: 'text-success' // Add your custom class here
                                        }
                                    });
                                // }

                        
                            }
                        });

                    }else{
                        this.$swal.fire({
                            icon: "error",
                            title: "Incomplete",
                            text: "Unable to update . Please check data agian.",
                            customClass: {
                                title: 'text-error' // Add your custom class here
                            }
                        });
                    }

                } catch (error) {
                    console.log('MappingCashGL',error);
                    this.$swal.fire({
                        icon: "error",
                        title: "Incomplete",
                        text: "Unable to update . Please check data agian.",
                        customClass: {
                            title: 'text-error' // Add your custom class here
                        }
                    });
                }

            }else{
                this.$swal.fire({
                    icon: "error",
                    title: "Incomplete",
                    text: "Unable to update . Please check data agian.",
                    customClass: {
                        title: 'text-error' // Add your custom class here
                    }
                });
            }
        },
        getselectedItemEmpStatus(data) {
              this.selectedItemEmpStatus = data;
        },
        getselectedItemActiveStatusSSB(data) {
              this.selectedItemActiveStatusSSB = data;
        
        },
    
        getselectedItemActiveStatusSAP(data){
            this.selectedItemActiveStatusSAP = data;
        },
       
    }
}
</script>

<style scoped>
    .v-tab{
        background: #D9D9D9!important;
        color: #000!important;
        margin-right: 0.5rem;
    }
    .v-tab--active{
        background: #F9BA7F!important;
    }
    ::v-deep .v-tabs-slider{
        display: none;
    }

    ::v-deep .style-table thead.v-data-table-header {
        background: #D9D9D9!important;
    }

    ::v-deep .style-table thead.v-data-table-header span{
        color: #000;
    }
  
    ::v-deep .style-table td{
        border: 1px solid #D9D9D9;
    }

    .border-b-lg{
        height: 5px!important;
        width: 100%!important;
        background: #F9BA7F;

    }
    .style-card{
        padding: 16px
    }
    .bg-blue{
        background-color: #7FA9F9!important;
    }
    .bg-orange{
        background-color: #F9BA7F!important;
        
    }
    ::v-deep .dialog-search{
        height: 550px!important;
    }
    .h25{
        height: 25px;
    }

    .border-bottom{
        border-bottom-style: solid;
        border-bottom-width: thin;
        border-bottom-color: #D9D9D9;
    }
    .border-gray{
        height: 3px !important;
        width: 100% !important;
        background: #D9D9D9;
    }
    .btn-with-icon{
        height: auto!important;
        min-width: auto!important;
        padding: 0!important;
    }
   
    
</style>