<template>

    <div>
        <v-tabs v-model="tab" class="mb-2">
          <v-tab v-for="(tab, index) in tabs" :key="index" @click="handleTabClick(tab, `/api/SAP/EmployeeStatus`)">{{ tab.name }}</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <!-- Create/Change -->
            <v-tab-item>
                <v-card outlined class="mx-auto style-card" color="surface-variant">
                    <div class="box-check">
                        <h1 class="f-20 mb-1">Check</h1>
                        <div class="border border-b-lg " style="height: 64px; width: 64px;"></div>
                        
                        <!-- Check -->
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
                                        :rules="validationRules"
                                        @childEvent="getselectedItemEmpStatus"
                                        @data-updated="handleClearData('selectedItemEmpStatus', 'EmployeeStatus')"
                                    />
                                  
                                </v-col>

                                <v-col cols="12" md="6" align-self="center" class="d-flex justify-space-between align-center">
                                    
                                    <span class="f-12 pr-3">Employee Status Name : {{ selectedItemEmpStatus.LocalName }}</span>
                                    <v-btn @click="checkMapping" class="bg-orange">Check</v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                        <!-- /Check -->

                        <div class="border-gray border-b-lg mb-3" style="height: 64px; width: 64px;"></div>
                        
                        <!-- Table Mapping -->
                        <h1 class="f-16 mb-1">Table Mapping</h1>
                        <v-data-table
                            :headers="headersData"
                            :items="dataEmpStatus"
                            density="compact"
                            item-key="name"
                            class="style-table"
                            hide-default-footer
                        >
                            <template v-slot:[`item.Action`]="{ item }">
                                <v-btn density="compact" icon class="bg-red text-white" @click="removeHNActivity(item)">
                                    <v-icon>mdi-close</v-icon>
                                </v-btn>
                            </template>
                        </v-data-table>
                        <!-- /Table Mapping -->
                    </div>

                    <!-- Relationship Mapping -->
                    <div class="box-relationship-mapping">
                        <h1 class="f-20 mb-1 mt-4">Relationship Mapping</h1>
                        <div class="border border-b-lg " style="height: 64px; width: 64px;"></div>
                        <v-form ref="formMapping" v-model="valid" lazy-validation>
                            <v-row class="mb-3">
                                <v-col cols="12" md="2" class="d-xs-none"></v-col>
                                <!-- select System Code -->
                                <v-col cols="12" md="4">
                                    <SelectSystemCode ref="selectSystemCode"/>
                                </v-col>

                                <!-- select Company Code -->
                                <v-col cols="12" md="4">
                                    <SelectCompanyCode ref="selectCompanyCode"/>
                                </v-col>

                                <v-col cols="12" md="2" class="d-xs-none"></v-col>
                            </v-row>

                            <div class=" border-bottom pb-0"></div>

                            <v-row class="my-2">  
                                <!-- input Active Status SSB -->
                                <v-col cols="12" md="6">
                                    <h2 class="f-16">Active Status SSB</h2>
                                    <v-row class="mt-3">
                                        <v-col>
                                            <span class="f-12">Active Status Code</span>
                                        </v-col>
                                        <v-col cols="8">

                                            <InputSearch 
                                                title="Active Status"
                                                label="Active Status" 
                                                code="Active Status Code" 
                                                name="Active Status name"
                                                type="EmployeeStatus" 
                                                ref="ActivityStatusSSB"
                                                :rules="validationRules"
                                                @childEvent="getselectedItemActiveStatusSSB"
                                                @data-updated="handleClearData('selectedItemActiveStatusSSB', 'ActiveStatusSSB')"
                                            />

                                        
                                        </v-col>
                                    </v-row>

                                    <v-row class="mt-3">
                                        <v-col>
                                            <span class="f-12">Active Status Name</span>
                                        </v-col>
                                        <v-col cols="8">
                                            <p 
                                                class="f-12 border-bottom pb-0 h25"
                                                :class="{ 'text-error': isError}"
                                            >
                                                {{selectedItemActiveStatusSSB.LocalName
                                            }}</p>
                                        </v-col>
                                    </v-row>

                                </v-col>

                                <!-- input Active Status SAP -->
                                <v-col cols="12" md="6">
                                    <h2 class="f-16">Active Status SAP</h2>
                                    <v-row class="mt-3">
                                        <v-col>
                                            <span class="f-12">Active Status Code</span>
                                        </v-col>
                                        <v-col cols="8">
                                            
                                            <InputSearch 
                                                title="Active Status"
                                                label="Active Status" 
                                                code="Active Status Code" 
                                                name="Active Status name"
                                                type="EmployeeStatus" 
                                                ref="ActiveStatusSAP"
                                                :rules="validationRules"
                                                @childEvent="getselectedItemActiveStatusSAP"
                                                @data-updated="handleClearData('selectedItemActiveStatusSAP', 'ActiveStatusSAP')"
                                            />
                                        </v-col>
                                    </v-row>

                                    <v-row class="mt-3">
                                        <v-col>
                                            <span class="f-12">Active Status Name</span>
                                        </v-col>
                                        <v-col cols="8">
                                            <p 
                                                class="f-12 border-bottom pb-0 h25"
                                                :class="{ 'text-error': isError}"
                                            >
                                                {{selectedItemActiveStatusSAP.GLDes}}
                                            </p>
                                        </v-col>
                                        
                                    </v-row>
                                </v-col>
                            </v-row>

                            <p v-if="isError" class="text-error f-13">*ข้อมูลไม่ถูกต้อง</p>
                            <div class="text-center">
                                <v-btn @click="MappingEmpStatus" class="bg-orange">Update Data</v-btn>
                            </div>
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
                            <v-btn class="bg-blue"  @click="exportToExcel(filteredData, 'EmployeeStatus')">Export</v-btn>
                        </v-col>
                    </v-row>
                    <v-data-table
                        :headers="headersExport"
                        :items="filteredData"
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
                                :select-items="selectOptionsForColumn('CompanyCode')"
                                @update:selectedValue="updateSelectedCompanyCode"
                                @sort="handleSort('CompanyCode', $event)"
                                :class="{ active_select: isActive('CompanyCode') }"
                            />
                        </template>

                        <!-- Header Template for SystemCode -->
                        <template v-slot:[`header.SystemCode`]="{ header }">
                            <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedSystemCode"
                                :select-items="selectOptionsForColumn('SystemCode')"
                                @update:selectedValue="updateSelectedSystemCode"
                                @sort="handleSort('SystemCode', $event)"
                                :class="{ active_select: isActive('SystemCode') }"
                            />
                        </template>

                        <!-- Header Template for ActiveStatusCode -->
                        <template v-slot:[`header.ActiveStatusCode`]="{ header }">
                            <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedActiveStatusCode"
                                :select-items="selectOptionsForColumn('ActiveStatusCode')"
                                @update:selectedValue="updateSelectedActiveStatusCode"
                                @sort="handleSort('ActiveStatusCode', $event)"
                                :class="{ active_select: isActive('ActiveStatusCode') }"
                            />
                        </template>

                        <!-- Header Template for LocalName -->
                        <template v-slot:[`header.LocalName`]="{ header }">
                            <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedLocalName"
                                :select-items="selectOptionsForColumn('LocalName')"
                                @update:selectedValue="updateSelectedLocalName"
                                @sort="handleSort('LocalName', $event)"
                                :class="{ active_select: isActive('LocalName') }"
                            />
                        </template>

                        <!-- Header Template for STAT2 -->
                        <template v-slot:[`header.STAT2`]="{ header }">
                            <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedSTAT2"
                                :select-items="selectOptionsForColumn('STAT2')"
                                @update:selectedValue="updateSelectedSTAT2"
                                @sort="handleSort('STAT2', $event)"
                                :class="{ active_select: isActive('STAT2') }"
                            />
                        </template>

                        <!-- Header Template for Description -->
                        <template v-slot:[`header.Description`]="{ header }">
                            <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedDescription"
                                :select-items="selectOptionsForColumn('Description')"
                                @update:selectedValue="updateSelectedDescription"
                                @sort="handleSort('Description', $event)"
                                :class="{ active_select: isActive('Description') }"
                            />
                        </template>

                    </v-data-table>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </div>

</template>

<script>
    import SelectCompanyCode from '@/components/SelectCompanyCode.vue';
    import SelectSystemCode from '@/components/SelectSystemCode.vue';
    import InputSearch from '@/components/InputSearch.vue';
    import InputSearchHN from '@/components/InputSearchHN.vue';
    import HeaderSelect from '@/components/HeaderSelect.vue';
    import * as XLSX from 'xlsx';
    export default{
        components: {SelectCompanyCode, SelectSystemCode, InputSearch, InputSearchHN, HeaderSelect},
        data: () => ({
            tab: null,
            tabs: [{ name: 'Create/Change' },{ name: 'Export' }],
            selectedItem: null,
            search: '',
            selectedItems: [],
            valid:true,
            loading: true,
            dataEmpStatus : [],
            selectedItemEmpStatus: {},
            selectedItemActiveStatusSSB: {},
            selectedItemActiveStatusSAP: {},
            filteredData: [],
             // select export //
            selectedCompanyCode: [],
            selectedSystemCode: [],
            selectedActiveStatusCode: [],
            selectedLocalName: [],
            selectedSTAT2: [],
            selectedDescription: [],
             // select export //
            isError: false,
            validationRules: [v => !!v || ''],
            headersData: [
                { text: 'Company Code', align: 'center', sortable: false, value: 'CompanyCode' },
                { text: 'System Code', align: 'center', sortable: false, value: 'SystemCode' },
                { text: 'Active Status Code', align: 'center', sortable: false, value: 'ActiveStatusCode' },
                { text: 'Local Name', align: 'center', sortable: false, value: 'LocalName' },
                { text: 'STAT2', align: 'center', sortable: false, value: 'STAT2' },
                { text: 'Description', align: 'center', sortable: false, value: 'Description' },
                { text: 'Delete', align: 'center', sortable: false, value: 'Action' },
            ],
            headersExport: [
                { text: 'Company Code', align: 'center', sortable: false, value: 'CompanyCode' },
                { text: 'System Code', align: 'center', sortable: false, value: 'SystemCode' },
                { text: 'Active Status Code', align: 'center', sortable: false, value: 'ActiveStatusCode' },
                { text: 'Local Name', align: 'center', sortable: false, value: 'LocalName' },
                { text: 'STAT2', align: 'center', sortable: false, value: 'STAT2' },
                { text: 'Description', align: 'center', sortable: false, value: 'Description' },
            ],
        
        }),

        watch: {
            selectedCompanyCode: {
                handler() {
                    this.filterData();
                },
                deep: true,
            },
            selectedSystemCode: {
                handler() {
                    this.filterData();
                },
                deep: true,
            },
            selectedActiveStatusCode: {
                handler() {
                    this.filterData();
                },
                deep: true,
            },
            selectedLocalName: {
                handler() {
                    this.filterData();
                },
                deep: true,
            },
            selectedSTAT2: {
                handler() {
                    this.filterData();
                },
                deep: true,
            },
            selectedDescription: {
                handler() {
                    this.filterData();
                },
                deep: true,
            },
          
        },

        methods: {
            /* search select table export */
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

            // Active column fiter export
            isActive(column) {
                if(column === 'CompanyCode'){
                    return this.selectedCompanyCode.length > 0;
                }else if (column === 'SystemCode'){
                    return this.selectedSystemCode.length > 0;
                }else if (column === 'ActiveStatusCode') {
                    return this.selectedActiveStatusCode.length > 0;
                }else if (column === 'LocalName') {
                    return this.selectedLocalName.length > 0;
                }else if(column === 'STAT2'){
                    return this.selectedSTAT2.length > 0;
                }else if(column === 'Description'){
                    return this.selectedDescription.length > 0;
                }
                return false;
            },

            clearData(){
                this.$refs.formMapping.resetValidation()
                this.$refs.ActivityStatusSSB.selectedItem = {}
                this.$refs.ActiveStatusSAP.selectedItem = {},
                this.$refs.selectCompanyCode.selecItem = null 
                this.$refs.selectSystemCode.selecItem = null 
                this.selectedItemActiveStatusSSB = {},
                this.selectedItemActiveStatusSAP = {},
                this.isError = false
            },

            filterData() {

                this.filteredData = this.datasExport.filter(item =>

                    (this.selectedCompanyCode.length === 0 || this.selectedCompanyCode.includes(item.CompanyCode)) &&
                    (this.selectedSystemCode.length === 0 || this.selectedSystemCode.includes(item.SystemCode)) && 
                    (this.selectedActiveStatusCode.length === 0 || this.selectedActiveStatusCode.includes(item.ActiveStatusCode)) && 
                    (this.selectedLocalName.length === 0 || this.selectedLocalName.includes(item.LocalName)) && 
                    (this.selectedSTAT2.length === 0 || this.selectedSTAT2.includes(item.STAT2)) && 
                    (this.selectedDescription.length === 0 || this.selectedDescription.includes(item.Description))
                    

              
                );
            },
            
            async removeEmpStatus(value){
                console.log(value);
                this.$swal.fire({
                    title: "ไม่สามารถลบข้อมูลได้",
                    icon: "question"
                });
            },

            async checkMapping(){

                if(this.selectedItemEmpStatus){
                    this.checkInputData('Employee Status', this.$refs.EmpStatusField)
                }else{
                    try {
                        this.loading                = await true
                        let GetTmCashAndGLIDPath    = `/api/SAP/CashAndGL/GetEmpStatusID?HNReceiveCode=${this.selectedItemEmpStatus}`
                        let response                = await this.$axios.get(GetTmCashAndGLIDPath);
                        this.dataEmpStatus          = response.data;
                        
                    } catch (error) {
                        this.loading = await false
                        console.error('Error fetching data:', error);
                    }
                }

            
            },
            
            async MappingEmpStatus(){
                
                // เช็ค value ใน ฟอร์ม Relationship Mapping
                if(this.$refs.formMapping.validate()){
                    // เช็คค่าใน Table Mapping กับค่าที่จะ Mapping
                    if(this.dataEmpStatus.length > 0){

                        const ActiveStatusSSB           = this.dataEmpStatus[0].ActiveStatusSSB
                        const selectActiveStatusSSB     = this.selectedItemActiveStatusSSB.GLNo;

                        const ActiveStatusSAP           = this.dataEmpStatus[0].ActiveStatusSAP
                        const selectActiveStatusSAP     = this.$refs.selectedItemActiveStatusSAP.GLNo;

                        const selectCompanyCode   = this.$refs.selectCompanyCode.selecItem;
                        const selectSystemCode    = this.$refs.selectSystemCode.selecItem;

                        // เช็คค่า ActiveStatusSSB และ ActiveStatusSAP เหมือนกัน จะเข้าเงื่อนไข if
                        const checkRecord = (

                            ActiveStatusSSB === selectActiveStatusSSB &&
                            ActiveStatusSAP === selectActiveStatusSAP 

                        );

                        const resultRecord = checkRecord ? true : false;

                        const MappingEmpStatusPath       =   `/api/SAP/CashAndGL/MappingEmpStatus`

                        const fd  = {
                            "companyCode": selectCompanyCode,
                            "systemCode": selectSystemCode,
                            // "activeStatusSSB" : 
                            // "activeStatusSAP" : 
                        }

                         // globalMixin.js
                        this.MappingData(resultRecord, MappingEmpStatusPath, fd)

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
    
            exportToExcel() {
                const datas = this.filteredData.map(item => ({
                    "Company Code": item.CompanyCode,
                    "System Code": item.SystemCode,
                    "Active Status Code": item.ActiveStatusCode,
                    "Local Name": item.LocalName,
                    "STAT2": item.STAT2,
                    "Description": item.Description
                }));
     
                const fileName = 'EmployeeStatus.xlsx';
                const wb = XLSX.utils.book_new();
                const ws = XLSX.utils.json_to_sheet(datas);
                XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

                /* Generate XLSX file and send to client */
                XLSX.writeFile(wb, fileName);
              
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