<template>
    <div>

        <v-tabs v-model="tab" class="mb-2">
          <v-tab v-for="(tab, index) in tabs" :key="index" @click="handleTabClick(tab, `/api/SAP/AccountGroup`)">{{ tab.name }}</v-tab>
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
                                    <span>Account Group</span>
                                </v-col>
                                <v-col cols="12" md="6" class="px-0 py-0"></v-col>

                                <v-col cols="12" md="6" class="text-center">
                                    <InputSearchHN 
                                        ref="AccountGroupField"
                                        title="AR Compose Category"
                                        label="AR Compose Category" 
                                        code="AR Compose Category" 
                                        name="Description"
                                        type="Term Of Payment" 
                                        :rules="validationRules"
                                        @childEvent="getselectedItemAccGroup"
                                        @data-updated="handleClearData('selectedItemAccGroup', 'AccountGroup')"
                                    />
                                  
                                </v-col>

                                <v-col cols="12" md="6"  class="d-flex justify-space-between align-center">
                                    
                                    <span class="f-12 pr-3">AR Compose Category Name : {{ selectedItemHNOne.LocalName }}</span>
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
                            :items="checkData"
                            density="compact"
                            item-key="name"
                            class="style-table"
                            hide-default-footer
                        >
                            <template v-slot:[`item.Action`]="{ item }">
                                <v-btn density="compact" icon class="bg-red text-white" @click="removeAccountGroup(item)">
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
                            <!-- select Company Code -->
                            <v-col cols="12" md="4">
                                <SelectCompanyCode ref="selectCompanyCode"/>
                            </v-col>

                            <!-- select System Code -->
                            <v-col cols="12" md="4">
                                <SelectSystemCode ref="selectSystemCode"/>
                            </v-col>

                            <v-col cols="12" md="2" class="d-xs-none"></v-col>
                        </v-row>

                        <div class=" border-bottom pb-0"></div>

                        <v-row class="my-2">  
                            <v-col cols="12" md="1"></v-col>

                            <!-- input AR Compose Category -->
                            <v-col cols="12" md="5">
                                <h2 class="f-16">AR Compose Category</h2>
                                <v-row class="mt-3">
                                    <v-col>
                                        <span class="f-12">AR Compose Category</span>
                                    </v-col>
                                    <v-col cols="8">
                                        <InputSearchHN 
                                            ref="ARComposeCategory"
                                            title="AR Compose Category"
                                            label="AR Compose Category" 
                                            code="AR Compose Category" 
                                            name="Description"
                                            type="Term Of Payment" 
                                            :isError="isError"
                                            :rules="validationRules"
                                            @childEvent="getselectedItemAccGroupTwo"
                                            @data-updated="handleClearData('selectedItemAccGroupTwo', 'AccountGroup')"
                                        />

                                      

                                       
                                    </v-col>
                                </v-row>

                                <v-row class="mt-3">
                                    <v-col>
                                        <span class="f-12">Description</span>
                                    </v-col>
                                    <v-col cols="8">
                                        <p 
                                            class="f-12 border-bottom pb-0 h25"
                                            :class="{ 'text-error': isError}"
                                        >{{selectedItemAccGroupTwo.LocalName}}</p>
                                    </v-col>
                                </v-row>

                            </v-col>
                            <!-- /input AR Compose Category -->

                            <!-- input KTOKK -->
                            <v-col cols="12" md="5">
                                <h2 class="f-16">KTOKK</h2>
                                <v-row class="mt-3">
                                    <v-col>
                                        <span class="f-12">KTOKK</span>
                                    </v-col>
                                    <v-col cols="8">

                                        <InputSearch 
                                            :rules="validationRules"
                                            ref="KTOKK"
                                            title="KTOKK"
                                            label="Text" 
                                            code="KTOKK" 
                                            name="Description"
                                            type="KTOKK" 
                                            :isError="isError"
                                            @childEvent="getselectedItemKTOKK"
                                            @data-updated="handleClearData('selectedItemKTOKK', 'KTOKK')"
                                        />

                                       
                                    </v-col>
                                </v-row>

                                <v-row class="mt-3">
                                    <v-col>
                                        <span class="f-12">Description</span>
                                    </v-col>
                                    <v-col cols="8">
                                        <p 
                                            class="f-12 border-bottom pb-0 h25"
                                            :class="{ 'text-error': isError}"
                                        >{{selectedItemKTOKK.GLDes}}</p>
                                    </v-col>
                                    
                                </v-row>
                            </v-col>
                            <!-- /input KTOKK -->

                            <v-col cols="12" md="1"></v-col>
                        </v-row>

                        <div class=" border-bottom pb-0"></div>

                        <v-row class="my-2">  
                            <v-col cols="12" md="1"></v-col>

                            <!-- input AR_AKONT -->
                            <v-col cols="12" md="5">
                                <h2 class="f-16">AR_AKONT</h2>
                                <v-row class="mt-3">
                                    <v-col>
                                        <span class="f-12">AR_AKONT</span>
                                    </v-col>
                                    <v-col cols="8">
                                        <InputSearch 
                                            :rules="validationRules"
                                            ref="AR_AKONT"
                                            title="AR_AKONT"
                                            label="Text" 
                                            code="AR_AKONT" 
                                            name="Description"
                                            type="AR_AKONT" 
                                            :isError="isError"
                                            @childEvent="getselectedItemAR_AKONT"
                                            @data-updated="handleClearData('selectedItemAR_AKONT', 'AR_AKONT')"
                                        />
                                    </v-col>
                                </v-row>

                                <v-row class="mt-3">
                                    <v-col>
                                        <span class="f-12">Description</span>
                                    </v-col>
                                    <v-col cols="8">
                                        <p 
                                            class="f-12 border-bottom pb-0 h25"
                                            :class="{ 'text-error': isError}"
                                        >{{selectedItemAR_AKONT.LocalName}}</p>
                                    </v-col>
                                </v-row>

                            </v-col>
                            <!-- /input AR_AKONT -->
                            
                            <!-- input AP_AKONT -->
                            <v-col cols="12" md="5">
                                <h2 class="f-16">AP_AKONT</h2>
                                <v-row class="mt-3">
                                    <v-col>
                                        <span class="f-12">AP_AKONT</span>
                                    </v-col>
                                    <v-col cols="8">

                                        <InputSearch 
                                            :rules="validationRules"
                                            ref="AP_AKONT"
                                            title="AP_AKONT"
                                            label="Text" 
                                            code="AP_AKONT" 
                                            name="Description"
                                            type="AP_AKONT" 
                                            :isError="isError"
                                            @childEvent="getselectedItemAP_AKONT"
                                            @data-updated="handleClearData('selectedItemAP_AKONT', 'AP_AKONT')"
                                        />
                                    
                                       
                                       
                                    </v-col>
                                </v-row>

                                <v-row class="mt-3">
                                    <v-col>
                                        <span class="f-12">Description</span>
                                    </v-col>
                                    <v-col cols="8">
                                        <p 
                                            class="f-12 border-bottom pb-0 h25" 
                                            :class="{ 'text-error': isError}"
                                        >{{selectedItemAP_AKONT.LocalName}}</p>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <!-- /input AP_AKONT -->
                            <v-col cols="12" md="1"></v-col>
                        </v-row>
                            <p v-if="isError" class="text-error f-13">*ข้อมูลไม่ถูกต้อง</p>
                            <div class="text-center">
                                <v-btn @click="MappingAccountGroup" class="bg-orange">Update Data</v-btn>
                            </div>
                        </v-form>
                    </div>
                    <!-- /Relationship Mapping -->
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
                            <v-btn class="bg-blue"  @click="exportToExcel(filteredData, 'ARAccountGroup')">Export</v-btn>
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
                        <!-- Header Template for ARComposeCategory -->
                        <template v-slot:[`header.ARComposeCategory`]="{ header }">
                            <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedARComposeCategory"
                                :select-items="selectOptionsForColumn('ARComposeCategory')"
                                @update:selectedValue="updateSelectedARComposeCategory"
                                @sort="handleSort('ARComposeCategory', $event)"
                                :class="{ active_select: isActive('ARComposeCategory') }"
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
                            <!-- Header Template for Description -->
                        <template v-slot:[`header.DescriptionTwo`]="{ header }">
                            <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedDescriptionTwo"
                                :select-items="selectOptionsForColumn('DescriptionTwo')"
                                @update:selectedValue="updateSelectedDescriptionTwo"
                                @sort="handleSort('DescriptionTwo', $event)"
                                :class="{ active_select: isActive('DescriptionTwo') }"
                            />
                        </template>
                        <!-- Header Template for KTOKK -->
                        <template v-slot:[`header.KTOKK`]="{ header }">
                            <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedKTOKK"
                                :select-items="selectOptionsForColumn('KTOKK')"
                                @update:selectedValue="updateSelectedKTOKK"
                                @sort="handleSort('KTOKK', $event)"
                                :class="{ active_select: isActive('KTOKK') }"
                            />
                        </template>
                        <!-- Header Template for ARAKONT -->
                        <template v-slot:[`header.ARAKONT`]="{ header }">
                            <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedARAKONT"
                                :select-items="selectOptionsForColumn('ARAKONT')"
                                @update:selectedValue="updateSelectedARAKONT"
                                @sort="handleSort('ARAKONT', $event)"
                                :class="{ active_select: isActive('ARAKONT') }"
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
            search: '',
            loading: true,
            selectedItemAccGroup: {},
            selectedItemAccGroupTwo: {},
            selectedItemKTOKK: {},
            selectedItemAR_AKONT: {},
            selectedItemAP_AKONT: {},
            filteredData: [],
            // select export //
            selectedCompanyCode: [], 
            selectedARComposeCategory: [], 
            selectedDescription: [], 
            selectedSystemCode: [], 
            selectedKTOKK: [], 
            selectedDescriptionTwo: [], 
            selectedARAKONT: [], 
            // select export //
            isError: false,
            validationRules: [v => !!v || ''],
            headersData: [
                { text: 'Company Code', align: 'center', sortable: false, value: 'CompanyCode' },
                { text: 'System Code', align: 'center', sortable: false, value: 'SystemCode' },
                { text: 'AR Compose Category', align: 'center', sortable: false, value: 'ARComposeCategory' },
                { text: 'Description', align: 'center', sortable: false, value: 'Description' },
                { text: 'KTOKK', align: 'center', sortable: false, value: 'KTOKK' },
                { text: 'Description', align: 'center', sortable: false, value: 'Description' },
                { text: 'AR_AKONT', align: 'center', sortable: false, value: 'ARAKONT' },
                { text: 'Delete', align: 'center', sortable: false, value: 'Action' },
            ],
            headersExport: [
                { text: 'Company Code', align: 'center', sortable: false, value: 'CompanyCode' },
                { text: 'System Code', align: 'center', sortable: false, value: 'SystemCode' },
                { text: 'AR Compose Category', align: 'center', sortable: false, value: 'ARComposeCategory' },
                { text: 'Description', align: 'center', sortable: false, value: 'Description' },
                { text: 'KTOKK', align: 'center', sortable: false, value: 'KTOKK' },
                { text: 'Description', align: 'center', sortable: false, value: 'Description' },
                { text: 'AR_AKONT', align: 'center', sortable: false, value: 'ARAKONT' },
            ],
        }),

        watch: {
            // filter หน้า Export
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
            selectedARComposeCategory: {
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
            selectedKTOKK: {
                handler() {
                    this.filterData();
                },
                deep: true,
            },
            selectedDescriptionTwo: {
                handler() {
                    this.filterData();
                },
                deep: true,
            },
            selectedARAKONT: {
                handler() {
                    this.filterData();
                },
                deep: true,
            },

        },
        methods: {

            async removeAccountGroup(value){
                console.log(value);

                await this.$swal.fire({
                    title: "Warning",
                    text: "Are you sure you want to delete this item? ",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#52A1DB",
                    cancelButtonColor: "#52A1DB",
                    confirmButtonText: "OK",
                    customClass: {
                        title: 'text-warning'
                    }
                }).then(async(result) => {
                    if (result.isConfirmed) {

                        try {
                            // // เส้น API ArpaymentTerm Remove

                            // let FlagHNActivityPath       =   `/api/SAP/FlagHNActivity?HNActivityCode=${value.Code}&DFLAG=1`

                            // await this.$axios.get(`${FlagHNActivityPath}`)

                            this.$swal.fire({
                                icon: "success",
                                title: "Complete",
                                text: "You data was saved.",
                                customClass: {
                                    title: 'text-success' // Add your custom class here
                                }
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    this.checkMapping()
                                }
                            });

                        } catch (error) {
                            this.$swal.fire({
                                icon: "error",
                                title: "Incomplete",
                                text: "update data not success",
                                customClass: {
                                    title: 'text-error'
                                }
                            });
                        }
                        
                      
                    }
                });
            },

            async checkMapping(){

                if(this.selectedItemAccGroup){

                    this.checkInputData('Account Group', this.$refs.AccountGroupField)
                 
                }else{
                    try {

                        this.loading                = await true
                        let GetArAccountGroupPath    = `/api/SAP/CashAndGL/GetAccGroupID?AccGroup=${this.selectedItemAccGroup}`
                        let response                = await this.$axios.get(GetArAccountGroupPath);
                        this.checkData              = response.data;

                    } catch (error) {
                        this.loading = await false
                        console.error('Error fetching data:', error);
                    }
                }
                
                
            },
            
            async MappingAccountGroup(){

                // เช็ค value
                if(this.$refs.formMapping.validate()){

                    // เช็คค่าใน Table Mapping กับค่าที่จะ Mapping
                    if(this.checkData.length > 0){

                        const AccountGroup              = this.checkData[0].Code
                        const selectedItemAccGroupTwo   = this.selectedItemAccGroupTwo.Code
                        
                        const KTOKK                     = this.checkData[0].KTOKK
                        const selectedItemKTOKK         = this.selectedItemKTOKK.GLNo
                        
                        const AR_AKONT                  = this.checkData[0].AR_AKONT
                        const selectedItemAR_AKONT      = this.selectedItemAR_AKONT.GLNo

                        const AP_AKONT                  = this.checkData[0].AP_AKONT
                        const selectedItemAP_AKONT      = this.selectedItemAP_AKONT.GLNo

                        const selectCompanyCode         = this.$refs.selectCompanyCode.selecItem;
                        const selectSystemCode          = this.$refs.selectSystemCode.selecItem;

                        // เช็คค่า AccountGroup KTOKK AR_AKONT และ AP_AKONT เหมือนกัน จะเข้าเงื่อนไข if
                        const checkRecord = (
                            AccountGroup === selectedItemAccGroupTwo &&
                            KTOKK === selectedItemKTOKK &&
                            AR_AKONT === selectedItemAR_AKONT && 
                            AP_AKONT === selectedItemAP_AKONT
                        );

                        const resultRecord                  = checkRecord ? true : false;
                        const MappingAccountGroupPath       =   `/api/`
                        const fd  = {
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

                         // globalMixin.js
                        this.MappingData(resultRecord, MappingAccountGroupPath, fd)

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

            // Active column fiter export
            isActive(column) {
                if(column === 'CompanyCode'){
                    return this.selectedCompanyCode.length > 0;
                }else if (column === 'SystemCode'){
                    return this.selectedSystemCode.length > 0;
                }else if (column === 'ARComposeCategory') {
                    return this.selectedARComposeCategory.length > 0;
                }else if (column === 'Description') {
                    return this.selectedDescription.length > 0;
                }else if(column === 'KTOKK'){
                    return this.selectedKTOKK.length > 0;
                }else if(column === 'DescriptionTwo'){
                    return this.selectedDescriptionTwo.length > 0;
                }else if(column === 'ARAKONT'){
                    return this.selectedARAKONT.length > 0;
                }
                return false;
            },

            exportToExcel() {
                const datas = this.filteredData.map(item => ({
                    "Company Code": item.CompanyCode,
                    "System Code": item.SystemCode,
                    "AR Compose Category": item.ARComposeCategory,
                    "Description AR Compose Category": item.Description,
                    "KTOKK": item.KTOKK,
                    "Description KTOKK": item.Description,
                    "AR_AKONT": item.AR_AKONT,
                }));
     
                const fileName = 'ARAccountGroup.xlsx';
                const wb = XLSX.utils.book_new();
                const ws = XLSX.utils.json_to_sheet(datas);
                XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

                /* Generate XLSX file and send to client */
                XLSX.writeFile(wb, fileName);
              
            },

            filterData() {

                this.filteredData = this.datasExport.filter(item =>

                    (this.selectedCompanyCode.length === 0 || this.selectedCompanyCode.includes(item.CompanyCode)) &&
                    (this.selectedSystemCode.length === 0 || this.selectedSystemCode.includes(item.SystemCode)) &&
                    (this.selectedARComposeCategory.length === 0 || this.selectedARComposeCategory.includes(item.ARComposeCategory)) &&
                    (this.selectedDescription.length === 0 || this.selectedDescription.includes(item.Description)) &&
                    (this.selectedKTOKK.length === 0 || this.selectedKTOKK.includes(item.KTOKK)) &&
                    (this.selectedDescriptionTwo.length === 0 || this.selectedDescriptionTwo.includes(item.DescriptionTwo)) &&
                    (this.selectedARAKONT.length === 0 || this.selectedARAKONT.includes(item.ARAKONT))
                );
            },

            clearData(){
                this.$refs.formMapping.resetValidation()
                this.$refs.ARComposeCategory.selectedItem   = {}
                this.$refs.KTOKK.selectedItem               = {}
                this.$refs.AR_AKONT.selectedItem            = {}
                this.$refs.AP_AKONT.selectedItem            = {} 
                this.selectedItemAccGroupTwo                = {}
                this.selectedItemKTOKK                      = {}
                this.selectedItemAR_AKONT                   = {}
                this.selectedItemAP_AKONT                   = {}
                this.$refs.selectCompanyCode.selecItem      = null 
                this.$refs.selectSystemCode.selecItem       = null 
                this.isError                                = false
            },

            // update select data export
            updateSelectedARComposeCategory(value){
                this.selectedARComposeCategory = value;
            },

            updateSelectedDescription(value){
                this.selectedADescription = value;
            },

            updateSelectedKTOKK(value){
                this.selectedKTOKK = value;
            },

            updateSelectedDescriptionTwo(value){
                this.selectedDescriptionTwo = value;
            },
            
            updateSelectedARAKONT(value){
                this.selectedARAKONT = value;
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