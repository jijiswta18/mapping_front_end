<template>

    <div>
        <v-tabs v-model="tab" class="mb-2">
          <v-tab v-for="(tab, index) in tabs" :key="index" @click="handleTabClick(tab, `/api/SAP/ActivityGL`)">{{ tab.name }}</v-tab>
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
                                    <span>HNActivity</span>
                                </v-col>
                                <v-col cols="12" md="6" class="px-0 py-0"></v-col>
                                <v-col cols="12" md="6" class="text-center">
                                  
                                    <InputSearchHN 
                                        ref="HNActivityField"
                                        title="HN Activity"
                                        label="HNActivity Code / HNActivity Name" 
                                        code="HNActivity Code" 
                                        name="HNActivity name"
                                        type="Activity" 
                                        :rules="validationRules"
                                        @childEvent="getselectedItemHNOne"
                                        @data-updated="handleClearData('selectedItemHNOne', 'HNActivityCode')"
                                    />

                                </v-col>
                                <v-col cols="12" md="6"  class="d-flex justify-space-between align-center">
                                    
                                    <span class="f-12 pr-3">HNActivity Name : {{ selectedItemHNOne.LocalName }}</span>
                                    <v-btn @click="checkMapping" class="bg-orange">Check</v-btn>

                                </v-col>
                            </v-row>
                        </v-container>
                        <!-- /Check -->
                        
                        <div class="border-gray border-b-lg mb-3" style="height: 64px; width: 64px;"></div>
                        
                        <!-- Table Mapping -->
                        <h1 class="f-16 mb-1">Table Mapping</h1>
                        <v-data-table
                            :headers="headersDataHNActivity"
                            :items="dataHNActivity"
                            density="compact"
                            item-key="name"
                            class="style-table"
                            hide-default-footer
                        >
                            <template v-slot:[`item.Action`]="{ item }">
                                <v-btn density="compact" icon class="bg-red text-white icon-delete" @click="removeHNActivity(item)">
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
                                <!-- select Company Code -->
                                <v-col cols="12" md="4">
                                    <SelectCompanyCode ref="selectCompanyCode"/>
                                </v-col>
                                
                                <!-- select System Code -->
                                <v-col cols="12" md="4">
                                    <SelectSystemCode ref="selectSystemCode"/>
                                </v-col>

                                <!-- input Posting Key -->
                                <v-col cols="12" md="4">
                                    <v-row class="mt-3">
                                        <v-col>
                                            <span class="f-12">Posting Key</span>
                                        </v-col>
                                        <v-col cols="8">
                                            <v-text-field
                                                v-model="posting_key"
                                                :rules="[v => !!v || '']"
                                                label="Text"
                                                dense
                                                outlined
                                                single-line
                                                hide-details="auto"
                                                clearable 
                                                @keyup="handleInput('posting_key')"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row> 
                                </v-col>
                            </v-row>
                            <div class=" border-bottom pb-0"></div>
                            <v-row class="my-2">
                                <!-- input HNActivity Code -->
                                <v-col cols="12" md="4">
                                    <h2 class="f-16">HN Activity</h2>
                                    <v-row class="mt-3">
                                        <v-col>
                                            <span class="f-12">HNActivity Code</span>
                                        </v-col>
                                        <v-col cols="8">
                                            <InputSearchHN 
                                                title="HN Activity"
                                                label="Text" 
                                                code="HNActivity Code" 
                                                name="HNActivity name"
                                                type="Activity"
                                                ref="selectHNActivity"
                                                :isError="isError" 
                                                :rules="validationRules"
                                                @childEvent="getselectedItemHNTwo"
                                                @data-updated="handleClearData('selectedItemHNTwo', 'HNActivityCode')"
                                            />
                                        </v-col>
                                    </v-row>
                                    <v-row class="mt-3">
                                        <v-col>
                                            <span class="f-12">HNActivity Name</span>
                                        </v-col>
                                        <v-col cols="8">
                                            <p class="f-12 border-bottom pb-0 h25 line-height" :class="{ 'text-error': isError}">{{selectedItemHNTwo.LocalName}}</p>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            
                                <!-- input G/L Account OPD -->
                                <v-col cols="12" md="4">
                                    <h2 class="f-16">G/L Account OPD</h2>
                                    <v-row class="mt-3">
                                        <v-col>
                                            <span class="f-12">GL Code</span>
                                        </v-col>
                                        <v-col cols="8">

                                            <InputSearch 
                                                :rules="validationRules"
                                                title="G/L Account OPD"
                                                label="Text" 
                                                code="GL OPD Code" 
                                                name="GL OPD Name" 
                                                ref="slectGLOPD" 
                                                type="SapGL"
                                                :isError="isError"
                                                @childEvent="getselectedItemGLOPD"
                                                @data-updated="handleClearData('selectedItemGLOPD', 'SapGL')"
                                            />

                                        </v-col>
                                    </v-row>

                                    <v-row class="mt-3">
                                        <v-col>
                                            <span class="f-12">GL Name</span>
                                        </v-col>
                                        <v-col cols="8">
                                            <p 
                                                class="f-12 border-bottom pb-0 h25 line-height"
                                                :class="{ 'text-error': isError}"
                                            >
                                                {{selectedItemGLOPD.GLDes}}
                                            </p>
                                        </v-col>
                                    </v-row>

                                </v-col>

                                <!-- input G/L Account IPD -->
                                <v-col cols="12" md="4">
                                    <h2 class="f-16">G/L Account IPD</h2>
                                    <v-row class="mt-3">
                                        <v-col>
                                            <span class="f-12">GL Code</span>
                                        </v-col>
                                        <v-col cols="8">

                                            <InputSearch 
                                                :rules="validationRules"
                                                title="G/L Account IPD"
                                                label="Text" 
                                                code="GL IPD Code" 
                                                name="GL IPD Name" 
                                                type="SapGL"
                                                ref="slectGLIPD" 
                                                :isError="isError"
                                                @childEvent="getselectedItemGLIPD"
                                                @data-updated="handleClearData('selectedItemGLIPD', 'SapGL')"
                                            />

                                        </v-col>
                                    </v-row>

                                    <v-row class="mt-3">
                                        <v-col>
                                            <span class="f-12">GL Name</span>
                                        </v-col>
                                        <v-col cols="8">
                                            <p 
                                                class="f-12 border-bottom pb-0 h25 line-height"
                                                :class="{ 'text-error': isError}"
                                            >
                                                {{selectedItemGLIPD.GLDes}}
                                            </p>
                                        </v-col>
                                    </v-row>
                                    
                                
                                </v-col>
                            </v-row>
                            <p v-if="isError" class="text-error f-13">*ข้อมูลไม่ถูกต้อง</p>
                            <div class="text-center">
                                <v-btn @click="MappingActivityGL" class="bg-orange">Update Data</v-btn>
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
                    <v-row class="py-3 align-center">
                        <v-col><h2 class="f-16"> Table Mapping</h2></v-col>
                        <v-col class="text-right">
                            <v-btn class="bg-blue"  @click="exportToExcel">Export</v-btn>
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
                        <template v-slot:[`item.UpdateDateTime`]="{ item }">{{ item.UpdateDateTime == null ? '' : formatDate(item.UpdateDateTime)}}</template>

                        <!-- Header Template for CompanyCode -->
                        <template v-slot:[`header.CompanyCode`]="{ header }">
                            <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedCompanyCode"
                                :select-items="selectOptionsForColumn('CompanyCode')"
                                @update:selectedValue="updateSelectedCompanyCode"
                                @sort="handleSort('CompanyCode', $event)"
                           
                                :class="{ active_select:  currentTab === 'Create/Change' && isActive('CompanyCode') }"
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

                        <!-- Header Template for HNActivity Code -->
                        <template v-slot:[`header.HNActivityCode`]="{ header }">
                            <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedHNActivity"
                                :select-items="selectOptionsForColumn('HNActivityCode')"
                                @update:selectedValue="updateSelectedHNActivity"
                                @sort="handleSort('HNActivityCode', $event)"
                                :class="{ active_select: isActive('HNActivityCode') }"
                            />
                        </template>

                        <!-- Header Template for HNActivity Name -->
                        <template v-slot:[`header.LocalName`]="{ header }">
                            <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedHNActivityName"
                                :select-items="selectOptionsForColumn('LocalName')"
                                @update:selectedValue="updateSelectedHNActivityName"
                                @sort="handleSort('LocalName', $event)"
                                :class="{ active_select: isActive('LocalName') }"
                            />
                        </template>

                        <!-- Header Template for GLSAPCodeOPD -->
                        <template v-slot:[`header.GLSAPCodeOPD`]="{ header }">
                            <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedGLOPDCode"
                                :select-items="selectOptionsForColumn('GLSAPCodeOPD')"
                                @update:selectedValue="updateSelectedGLOPDCode"
                                @sort="handleSort('GLSAPCodeOPD', $event)"
                                :class="{ active_select: isActive('GLSAPCodeOPD') }"
                            />
                        </template>

                        <!-- Header Template for GLSAPNameOPD -->
                        <template v-slot:[`header.GLSAPNameOPD`]="{ header }">
                            <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedGLOPDName"
                                :select-items="selectOptionsForColumn('GLSAPNameOPD')"
                                @update:selectedValue="updateSelectedGLOPDName"
                                @sort="handleSort('GLSAPNameOPD', $event)"
                                :class="{ active_select: isActive('GLSAPNameOPD') }"
                            />
                        </template>

                        <!-- Header Template for GLSAPCodeIPD -->
                        <template v-slot:[`header.GLSAPCodeIPD`]="{ header }">
                            <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedGLIPDCode"
                                :select-items="selectOptionsForColumn('GLSAPCodeIPD')"
                                @update:selectedValue="updateSelectedGLIPDCode"
                                @sort="handleSort('GLSAPCodeIPD', $event)"
                                :class="{ active_select: isActive('GLSAPCodeIPD') }"
                            />
                        </template>

                        <!-- Header Template for GLSAPNameIPD -->
                        <template v-slot:[`header.GLSAPNameIPD`]="{ header }">
                            <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedGLIPDName"
                                :select-items="selectOptionsForColumn('GLSAPNameIPD')"
                                @update:selectedValue="updateSelectedGLIPDName"
                                @sort="handleSort('GLSAPNameIPD', $event)"
                                :class="{ active_select: isActive('GLSAPNameIPD') }"
                            />
                        </template>

                        <!-- Header Template for Posting Key -->
                        <template v-slot:[`header.PostingKey`]="{ header }">
                            <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedPostingKey"
                                :select-items="selectOptionsForColumn('PostingKey')"
                                @update:selectedValue="updateSelectedPostingKey"
                                @sort="handleSort('PostingKey', $event)"
                                :class="{ active_select: isActive('PostingKey') }"
                            />
                        </template>

                        <!-- Header Template for UpdateDateTime -->
                        <template v-slot:[`header.UpdateDateTime`]="{ header }">
                            <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedDate"
                                :select-items="selectOptionsForColumn('UpdateDateTime')"
                                @update:selectedValue="updateSelectedDate"
                                @sort="handleSort('UpdateDateTime', $event)"
                                :class="{ active_select: isActive('UpdateDateTime') }"
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
            dataHNActivity : [],
            selectedItemHNOne: {},
            selectedItemHNTwo: {},
            selectedItemGLIPD:{},
            selectedItemGLOPD: {},
            posting_key: null,
            filteredData: [],
            // select export //
            selectedHNActivity: [], 
            selectedHNActivityName: [], 
            selectedGLOPDCode: [],
            selectedGLOPDName: [],
            selectedGLIPDCode: [],
            selectedGLIPDName: [],
            selectedPostingKey: [],
            selectedDate: [],
            // select export //
            isError: false,
            validationRules: [v => !!v || ''],
            headersDataHNActivity: [
                { text: 'Company Code', align: 'center', sortable: false, value: 'CompanyCode' },
                { text: 'System Code', align: 'center', sortable: false, value: 'SystemCode' },
                { text: 'HNActivity Code', align: 'center', sortable: false, value: 'Code' },
                { text: 'HNActivity Name', align: 'center', sortable: false, value: 'LocalName' },
                { text: 'GL OPD Code', align: 'center', sortable: false, value: 'GLSAPCodeOPD' },
                { text: 'GL OPD Name', align: 'center', sortable: false, value: 'GLSAPNameOPD' },
                { text: 'GL IPD Code', align: 'center', sortable: false, value: 'GLSAPCodeIPD' },
                { text: 'GL IPD  Name', align: 'center', sortable: false, value: 'GLSAPNameIPD' },
                { text: 'Posting Key', align: 'center', sortable: false, value: 'PostingKey' },
                { text: 'Delete', align: 'center', sortable: false, value: 'Action' },
            ],
            headersExport: [
                { text: 'Company Code', align: 'center', sortable: false, value: 'CompanyCode' },
                { text: 'System Code', align: 'center', sortable: false, value: 'SystemCode' },
                { text: 'HNActivity Code', align: 'center', sortable: false, value: 'HNActivityCode' },
                { text: 'HNActivity Name', align: 'center', sortable: false, value: 'LocalName' },
                { text: 'GL OPD Code', align: 'center', sortable: false, value: 'GLSAPCodeOPD' },
                { text: 'GL OPD Name', align: 'center', sortable: false, value: 'GLSAPNameOPD' },
                { text: 'GL IPD Code', align: 'center', sortable: false, value: 'GLSAPCodeIPD' },
                { text: 'GL IPD  Name', align: 'center', sortable: false, value: 'GLSAPNameIPD' },
                { text: 'Posting Key', align: 'center', sortable: false, value: 'PostingKey' },
                { text: 'Update Date Time', align: 'center', sortable: false, value: 'UpdateDateTime' },
            ]
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

            selectedHNActivity: {
                handler() {
                    this.filterData(); 
                },
                deep: true,
            },

            selectedHNActivityName: {
                handler() {
                    this.filterData();
                },
                deep: true,
            },

            selectedGLOPDCode: {
                handler() {
                    this.filterData();
                },
                deep: true,
            },

            selectedGLOPDName: {
                handler() {
                    this.filterData();
                },
                deep: true,
            },

            selectedGLIPDCode: {
                handler() {
                    this.filterData();
                },
                deep: true,
            },

            selectedGLIPDName: {
                handler() {
                    this.filterData();
                },
                deep: true,
            },

            selectedPostingKey: {
                handler() {
                    this.filterData();
                },
                deep: true,
            },

            selectedDate: {
                handler() {
                    this.filterData();
                },
                deep: true,
            },

        },

        methods: {
            /* search select table export */
            updateSelectedHNActivity(value) {
                this.selectedHNActivity = value;
            },

            updateSelectedHNActivityName(value) {
                this.selectedHNActivityName = value;
            },

            updateSelectedGLOPDCode(value) {
                this.selectedGLOPDCode = value;
            },

            updateSelectedGLOPDName(value) {
                this.selectedGLOPDName = value;
            },

            updateSelectedGLIPDCode(value) {
                this.selectedGLIPDCode = value;
            },

            updateSelectedGLIPDName(value) {
                this.selectedGLIPDName = value;
            },

            updateSelectedPostingKey(value) {          
                this.selectedPostingKey = value;
            },

            updateSelectedDate(value){
                this.selectedDate = value;
            },

            // Active column fiter export
            isActive(column) {

                if(column === 'CompanyCode'){
                    return this.selectedCompanyCode.length > 0;
                }else if (column === 'SystemCode'){
                    return this.selectedSystemCode.length > 0;
                }else if (column === 'HNActivityCode') {
                    return this.selectedHNActivity.length > 0;
                }else if (column === 'LocalName') {
                    return this.selectedHNActivityName.length > 0;
                }else if(column === 'GLSAPCodeOPD'){
                    return this.selectedGLOPDCode.length > 0;
                }else if(column === 'GLSAPNameOPD'){
                    return this.selectedGLOPDName.length > 0;
                }else if (column === 'GLSAPCodeIPD'){
                    return this.selectedGLIPDCode.length > 0;
                }else if (column === 'GLSAPNameIPD'){
                    return this.selectedGLIPDName.length > 0;
                }else if(column === 'PostingKey'){
                    return this.selectedPostingKey.length > 0;
                }
                return false;
            },

            exportToExcel() {
                const datas = this.filteredData.map(item => ({
                    "Company Code": item.CompanyCode,
                    "System Code": item.SystemCode,
                    "HNActivity Code": item.HNActivityCode,
                    "HNActivity Name": item.LocalName,
                    "GL OPD Code": item.GLSAPCodeOPD,
                    "GL OPD Name": item.GLSAPNameOPD,
                    "GL IPD Code": item.GLSAPCodeIPD,
                    "GL IPD Name": item.GLSAPNameIPD,
                    "Posting Key": item.PostingKey,
                }));

                const fileName = 'TMHNActivity.xlsx';
                const wb = XLSX.utils.book_new();
                const ws = XLSX.utils.json_to_sheet(datas);
                XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

                /* Generate XLSX file and send to client */
                XLSX.writeFile(wb, fileName);

            },

            clearData(){
                this.$refs.formMapping.resetValidation()
                this.$refs.selectHNActivity.resetValidation()
                this.$refs.selectHNActivity.clearTextField()
                this.$refs.slectGLOPD.selectedItem = {},
                this.$refs.slectGLIPD.selectedItem = {},
                this.$refs.selectCompanyCode.selecItem = null 
                this.$refs.selectSystemCode.selecItem = null 
                this.selectedItemHNTwo = {},
                this.selectedItemGLIPD = {},
                this.selectedItemGLOPD = {},
                this.posting_key = null,
                this.isError = false
            },

            filterData() {

                this.filteredData = this.datasExport.filter(item =>

                    (this.selectedCompanyCode.length === 0 || this.selectedCompanyCode.includes(item.CompanyCode)) &&
                    (this.selectedSystemCode.length === 0 || this.selectedSystemCode.includes(item.SystemCode)) &&
                    (this.selectedHNActivity.length === 0 || this.selectedHNActivity.includes(item.HNActivityCode)) &&
                    (this.selectedHNActivityName.length === 0 || this.selectedHNActivityName.includes(item.LocalName)) &&
                    (this.selectedGLOPDCode.length === 0 || this.selectedGLOPDCode.includes(item.GLSAPCodeOPD)) &&
                    (this.selectedGLOPDName.length === 0 || this.selectedGLOPDName.includes(item.GLSAPNameOPD)) &&
                    (this.selectedGLIPDCode.length === 0 || this.selectedGLIPDCode.includes(item.GLSAPCodeIPD)) &&
                    (this.selectedGLIPDName.length === 0 || this.selectedGLIPDName.includes(item.GLSAPNameIPD)) &&
                    (this.selectedPostingKey.length === 0 || this.selectedPostingKey.includes(item.PostingKey)) &&
                    (this.selectedDate.length === 0 || this.selectedDate.includes(item.UpdateDateTime))
                );


           
            },

            async removeHNActivity(value){

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
                            let FlagHNActivityPath       =   `/api/SAP/FlagHNActivity?HNActivityCode=${value.Code}&DFLAG=1`

                            await this.$axios.get(`${FlagHNActivityPath}`)

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

                if(this.selectedItemHNOne && !this.selectedItemHNOne.Code){    
                    
                    this.checkInputData('HNACtivity', this.$refs.HNActivityField)
                
                }else{
                    try {
                    this.loading                = await true
                    let GetTmActivityIDPath     = `/api/SAP/GetTmActivityID?HNActivityCode=${this.selectedItemHNOne.Code}`
                    let response                = await this.$axios.get(GetTmActivityIDPath);
                    this.dataHNActivity         = response.data;   
                    
                    } catch (error) {
                        this.loading = await false
                        console.error('Error fetching data:', error);
                    }
                }

            },

            async MappingActivityGL(){

                // เช็ค value ใน ฟอร์ม Relationship Mapping
                if(this.$refs.formMapping.validate()){
                    // เช็คค่า dataHNActivity ใน Table ที่จะ Mapping
                    if(this.dataHNActivity.length > 0){

                        const HNActivity = this.dataHNActivity[0].Code
                        const selectedHNActivity = this.selectedItemHNTwo.Code

                        const GLSAPCodeIPD = this.dataHNActivity[0].GLSAPCodeIPD
                        const selectedItemGLIPD = this.selectedItemGLIPD.GLNo

                        const GLSAPCodeOPD = this.dataHNActivity[0].GLSAPCodeOPD
                        const selectedItemGLOPD = this.selectedItemGLOPD.GLNo
                    
                        const selectCompanyCode   = this.$refs.selectCompanyCode.selecItem;
                        const selectSystemCode    = this.$refs.selectSystemCode.selecItem;
                        
                        // เช็คค่า HNActivity GLSAPCodeIPD และ GLSAPCodeOPD เหมือนกัน จะเข้าเงื่อนไข if
                        const checkRecord = (
                            HNActivity === selectedHNActivity &&
                            GLSAPCodeIPD === selectedItemGLIPD &&
                            GLSAPCodeOPD === selectedItemGLOPD 

                        );

                        const resultRecord = checkRecord ? true : false;

                        const MappingActivityGLPath     = `/api/SAP/MappingActivityGL`

                        const fd  = {
                            "companyCode"       : selectCompanyCode != null ? selectCompanyCode : this.dataHNActivity[0].companyCode,
                            "systemCode"        : selectSystemCode!= null ? selectSystemCode : this.dataHNActivity[0].systemCode,
                            "hnActivityCode"    : this.selectedItemHNTwo.Code,
                            "localName"         : this.selectedItemHNTwo.LocalName,
                            "englishName"       : this.selectedItemHNTwo.EnglishName != null ? this.selectedItemHNTwo.EnglishName : "",
                            "glsapCodeOPD"      : this.selectedItemGLOPD.GLNo,
                            "glsapNameOPD"      : this.selectedItemGLOPD.GLDes,
                            "glsapCodeIPD"      : this.selectedItemGLIPD.GLNo,
                            "glsapNameIPD"      : this.selectedItemGLIPD.GLDes,
                            "postingKey"        : this.posting_key != null ? this.posting_key : this.dataHNActivity[0].postingKey
                        }

                         // globalMixin.js
                        this.MappingData(resultRecord, MappingActivityGLPath, fd)
                        
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
                        text: "Unable to update. Please check data again.",
                        customClass: {
                            title: 'text-error' // Add your custom class here
                        }
                    })

                }
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
   
    .custom-v-select{
        margin: 0;
        padding: 0;
        display: ruby;
        flex: none;
    }

    .line-height{
        line-height: 1.8;
    }

    ::v-deep .custom-v-select .v-select__selections {
        display: none!important;
    }

    ::v-deep .custom-v-select .v-input__append-inner {
        background-color: #ABABAB;
        cursor: pointer;
        padding: 0;
        margin: 0;
        border-radius: 4px;
    }

    ::v-deep .v-text-field > .v-input__control > .v-input__slot:before {
      border-style: none;
    }

    ::v-deep .dialog-search{
        height: 550px!important;
    }
    


</style>