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
                                    <span>HNReceive Code</span>
                                </v-col>
                                <v-col cols="12" md="6" class="px-0 py-0"></v-col>

                                <v-col cols="12" md="6"  class="text-center">

                                    <InputSearchHN 
                                        ref="StoreMedicineField"
                                        title="HN Receive"
                                        label="HNReceive Code / HNReceive Name" 
                                        code="HNReceive Code" 
                                        name="HNReceive name"
                                        type="Receive" 
                                        @childEvent="getselectedItemStorMedicine"
                                    />
                                    <!-- <InputSearchHN label="HNReceive Code / HNReceive Name" type="Receive"  @childEvent="getselectedItemHNOne"/> -->
                                </v-col>

                                <v-col cols="12" md="6"  align-self="center" class="d-flex justify-space-between align-center">
                                    
                                    <span class="f-12 pr-3">HNReceive Name : {{ selectedItemStorMedicine.LocalName }}</span>
                                    <v-btn @click="checkStoreMedicine" class="bg-orange">Check</v-btn>
                                </v-col>
                            </v-row>
                        </v-container>

                        <div class="border-gray border-b-lg mb-3" style="height: 64px; width: 64px;"></div>
                        <h1 class="f-16 mb-1">Table Mapping</h1>
                        <v-data-table
                            :headers="headersDataHNActivity"
                            :items="dataHNReceive"
                            density="compact"
                            item-key="name"
                            :footer-props="{ 'items-per-page-options': [10, 25, 50, 100] }"
                            class="style-table"
                        >
                            <template v-slot:[`item.Action`]="{ item }">
                                <v-btn density="compact" icon class="bg-red text-white" @click="removeCashGL(item)">
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

                            <v-col cols="12" md="3">
                                <SelectCompanyCode ref="selectCompanyCode"/>
                            </v-col>

                            <v-col cols="12" md="3">
                                <SelectSystemCode ref="selectSystemCode"/>
                            </v-col>

                            <v-col cols="12" md="3">
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
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                 
                            </v-col>

                            <v-col cols="12" md="3">
                                <v-row class="mt-3">
                                    <v-col>
                                        <span class="f-12">Posting Key 2</span>
                                    </v-col>
                                    <v-col cols="8">
                                        <v-text-field
                                            v-model="posting_key2"
                                            :rules="[v => !!v || '']"
                                            label="Text"
                                            dense
                                            outlined
                                            single-line
                                            hide-details="auto"
                                            clearable 
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                 
                            </v-col>

                        </v-row>

                        <div class=" border-bottom pb-0"></div>
                        <p v-if="isError" class="text-error f-13 mt-3">*ข้อมูลไม่ถูกต้อง</p>

                        <v-row class="my-2">  
                            <v-col cols="12" md="2"></v-col>
                            <v-col cols="12" md="4">
                                <h2 class="f-16">HN Receive</h2>
                                <v-row class="mt-3">
                                    <v-col>
                                        <span class="f-12">HNReceive Code</span>
                                    </v-col>
                                    <v-col cols="8">

                                        <InputSearchHN 
                                            title="HN Receive"
                                            label="Text" 
                                            code="HNReceive Code" 
                                            name="HNReceive name"
                                            type="Receive" 
                                            ref="selectHNReceive"
                                            :isError="isError"
                                            @childEvent="getselectedItemHNTwo"
                                        />

                                        <!-- <InputSearchHN label="Text" type="Receive"  @childEvent="getselectedItemHNTwo" /> -->
                                       
                                    </v-col>
                                </v-row>

                                <v-row class="mt-3">
                                    <v-col>
                                        <span class="f-12">HNReceive Name</span>
                                    </v-col>
                                    <v-col cols="8">
                                        <p class="f-12 border-bottom pb-0 h25" :class="{ 'text-error': isError}">{{selectedItemHNTwo.LocalName}}</p>
                                    </v-col>
                                </v-row>

                            </v-col>

                            <v-col cols="12" md="4">
                                <h2 class="f-16">GLSAR Code</h2>
                                <v-row class="mt-3">
                                    <v-col>
                                        <span class="f-12">GLSAR Code</span>
                                    </v-col>
                                    <v-col cols="8">
                                     
                                        <InputSearch 
                                            title="GLSAR"
                                            label="Text" 
                                            code="GLSAR Code" 
                                            name="GLSAR Name" 
                                            type="SapGL"
                                            dataUpdate="GLSAR"
                                            ref="selectGLSAR"
                                            :isError="isError"
                                            @childEvent="getselectedItemGLSAR"
                                            @data-updated="handleDataUpdated"
                                        />

                                    </v-col>
                                </v-row>

                                <v-row class="mt-3">
                                    <v-col>
                                        <span class="f-12">GLSAR Name</span>
                                    </v-col>
                                    <v-col cols="8">
                                        <p class="f-12 border-bottom pb-0 h25 line-height" :class="{ 'text-error': isError}">{{selectedItemGLSAR.GLDes}}</p>
                                    </v-col>
                                    
                                </v-row>
                            </v-col>
                            <v-col cols="12" md="2"></v-col>
                        </v-row>
                        
                        <v-row class="my-2">  
                            <v-col cols="12" md="2"></v-col>
                            <v-col cols="12" md="4">
                                <h2 class="f-16">GLSAP Code</h2>
                                <v-row class="mt-3">
                                    <v-col>
                                        <span class="f-12">GLSAP Code</span>
                                    </v-col>
                                    <v-col cols="8">

                                        <InputSearch 
                                            title="GLSAP"
                                            label="Text" 
                                            code="GLSAP Code" 
                                            name="GLSAP Name" 
                                            type="SapGL"
                                            dataUpdate="GLSAP"
                                            ref="selectGLSAP"
                                            :isError="isError"
                                            @childEvent="getselectedItemGLSAP"
                                            @data-updated="handleDataUpdated"
                                        />

                                    </v-col>
                                </v-row>

                                <v-row class="mt-3">
                                    <v-col>
                                        <span class="f-12">GLSAP Name</span>
                                    </v-col>
                                    <v-col cols="8">
                                        <p class="f-12 border-bottom pb-0 h25 line-height" :class="{ 'text-error': isError}">{{selectedItemGLSAP.GLDes}}</p>
                                    </v-col>
                                </v-row>

                            </v-col>

                            <v-col cols="12" md="4">
                                <h2 class="f-16">SpecialGL Code</h2>
                                <v-row class="mt-3">
                                    <v-col>
                                        <span class="f-12">SpecialGL Code</span>
                                    </v-col>
                                    <v-col cols="8">
                                        <InputSearch 
                                            title="SpecialGL"
                                            label="Text" 
                                            code="SpecialGL Code" 
                                            name="SpecialGL Name"
                                            type="SapGL"
                                            dataUpdate="SpecialGL"
                                            ref="selectSpecialGL"
                                            :isError="isError"
                                            @childEvent="getselectedItemSpecialGL"
                                            @data-updated="handleDataUpdated"
                                        />

                                    </v-col>
                                </v-row>

                                <v-row class="mt-3">
                                    <v-col>
                                        <span class="f-12">SpecialGL Name</span>
                                    </v-col>
                                    <v-col cols="8">
                                        <p class="f-12 border-bottom pb-0 h25 line-height" :class="{ 'text-error': isError}">{{selectedItemSpecialGL.GLDes}}</p>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="12" md="2"></v-col>
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
                            <v-btn class="bg-blue"  @click="exportToExcel(filteredData, 'CashAndGL')">Export</v-btn>
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

                        <!-- Header Template for HNReceiveCode -->
                        <template v-slot:[`header.HNReceiveCode`]="{ header }">
                        <HeaderSelect
                            :header-text="header.text"
                            :selected-value="selectedHNReceiveCode"
                            :select-items="selectOptionsForColumn('HNReceiveCode')"
                            @update:selectedValue="updateSelectedHNReceiveCode"
                            @search="searchCompanies('HNReceiveCode', $event)"
                            @sort="handleSort('HNReceiveCode', $event)"
                        />
                        </template>

                        <!-- Header Template for HNReceive Name -->
                        <template v-slot:[`header.LocalName`]="{ header }">
                        <HeaderSelect
                            :header-text="header.text"
                            :selected-value="selectedHNReceiveName"
                            :select-items="selectOptionsForColumn('LocalName')"
                            @update:selectedValue="updateSelectedHNReceiveName"
                            @search="searchCompanies('LocalName', $event)"
                            @sort="handleSort('LocalName', $event)"
                        />
                        </template>

                        <!-- Header Template for EnglishName -->
                        <template v-slot:[`header.EnglishName`]="{ header }">
                        <HeaderSelect
                            :header-text="header.text"
                            :selected-value="selectedEnglishName"
                            :select-items="selectOptionsForColumn('EnglishName')"
                            @update:selectedValue="updateSelectedEnglishName"
                            @search="searchCompanies('EnglishName', $event)"
                            @sort="handleSort('EnglishName', $event)"
                        />
                        </template>

                         <!-- Header Template for GLSARCode -->
                         <template v-slot:[`header.GLSARCode`]="{ header }">
                            <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedGLSARCode"
                                :select-items="selectOptionsForColumn('GLSARCode')"
                                @update:selectedValue="updateSelectedGLSARCode"
                                @search="searchCompanies('GLSARCode', $event)"
                                @sort="handleSort('GLSARCode', $event)"
                            />
                        </template>

                         <!-- Header Template for GLSARName -->
                         <template v-slot:[`header.GLSARName`]="{ header }">
                            <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedGLSARName"
                                :select-items="selectOptionsForColumn('GLSARName')"
                                @update:selectedValue="updateSelectedGLSARName"
                                @search="searchCompanies('GLSARName', $event)"
                                @sort="handleSort('GLSARName', $event)"
                            />
                        </template>

                         <!-- Header Template for GLSAPCode -->
                         <template v-slot:[`header.GLSAPCode`]="{ header }">
                            <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedGLSAPCode"
                                :select-items="selectOptionsForColumn('GLSAPCode')"
                                @update:selectedValue="updateSelectedGLSAPCode"
                                @search="searchCompanies('GLSAPCode', $event)"
                                @sort="handleSort('GLSAPCode', $event)"
                            />
                        </template>

                         <!-- Header Template for GLSAPName -->
                         <!-- <template v-slot:[`header.GLSAPName`]="{ header }">
                            <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedGLSAPName"
                                :select-items="selectOptionsForColumn('GLSAPName')"
                                @update:selectedValue="updateSelectedGLSAPName"
                                @search="searchCompanies('GLSAPName', $event)"
                            />
                        </template> -->

                         <!-- Header Template for SpecialGL -->
                         <template v-slot:[`header.SpecialGL`]="{ header }">
                        <HeaderSelect
                            :header-text="header.text"
                            :selected-value="selectedSpecialGL"
                            :select-items="selectOptionsForColumn('SpecialGL')"
                            @update:selectedValue="updateSelectedSpecialGL"
                            @search="searchCompanies('SpecialGL', $event)"
                            @sort="handleSort('SpecialGL', $event)"
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
// import * as XLSX from 'xlsx';
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
        search: '',
        valid:true,
        loading: true,
        dataHNReceive : [],
        selectedItemStorMedicine: {},
        selectedItemHNTwo: {},
        selectedItemGLSAR:{},
        selectedItemGLSAP: {},
        selectedItemSpecialGL: {},
        // datasExport : [],
        filteredData: [],
        selectedCompanyCode: [],
        selectedSystemCode: [],
        selectedHNReceiveCode: [],
        selectedHNReceiveName: [],
        // selectedEnglishName: [],
        selectedGLSARCode: [],
        selectedGLSARName: [],
        selectedGLSAPCode: [],
        // selectedGLSAPName: [],
        selectedSpecialGL: [],
        posting_key: null,
        posting_key2: null,
        headersDataHNActivity: [
            { text: 'Company Code', align: 'left', sortable: false, value: 'CompanyCode' },
            { text: 'System Code', align: 'left', sortable: false, value: 'SystemCode' },
            { text: 'HNReceive Code', align: 'left', sortable: false, value: 'HNReceiveCode' },
            { text: 'HNReceive Name', align: 'left', sortable: false, value: 'LocalName' },
            // { text: 'English Name', align: 'left', sortable: false, value: 'EnglishName' },
            { text: 'GLSAR Code', align: 'left', sortable: false, value: 'GLSARCode' },
            { text: 'GLSAR Name', align: 'left', sortable: false, value: 'GLSARName' },
            { text: 'GLSAP Code', align: 'left', sortable: false, value: 'GLSAPCode' },
            // { text: 'Key2Description', align: 'left', sortable: false, value: 'Key2Description' },
            { text: 'SpecialGL', align: 'left', sortable: false, value: 'SpecialGL' },
            { text: 'Posting Key', align: 'left', sortable: false, value: 'PostingKey' },
            { text: 'Posting Key2', align: 'left', sortable: false, value: 'PostingKey2' },
            { text: 'Delete', align: 'center', sortable: false, value: 'Action' },
        ],
        headersExport: [
            { text: 'Company Code', align: 'left', sortable: false, value: 'CompanyCode' },
            { text: 'System Code', align: 'left', sortable: false, value: 'SystemCode' },
            { text: 'HNReceive Code', align: 'left', sortable: false, value: 'HNReceiveCode' },
            { text: 'HNReceive Name', align: 'left', sortable: false, value: 'LocalName' },
            // { text: 'English Name', align: 'left', sortable: false, value: 'EnglishName' },
            { text: 'GLSAR Code', align: 'left', sortable: false, value: 'GLSARCode' },
            { text: 'GLSAR Name', align: 'left', sortable: false, value: 'GLSARName' },
            { text: 'GLSAP Code', align: 'left', sortable: false, value: 'GLSAPCode' },
            // { text: 'GLSAP Name', align: 'left', sortable: false, value: 'GLSAPName' },
            { text: 'SpecialGL', align: 'left', sortable: false, value: 'SpecialGL' },
    
        ],
     
        isError: false
    
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

        selectedHNReceiveCode: {
            handler() {
                this.filterData();
            },
            deep: true,
        },

        selectedHNReceiveName: {
            handler() {
                this.filterData();
            },
            deep: true,
        },

        // selectedEnglishName: {
        //     handler() {
        //         this.filterData();
        //     },
        //     deep: true,
        // },

        selectedGLSARCode: {
            handler() {
                this.filterData();
            },
            deep: true,
        },

        selectedGLSARName: {
            handler() {
                this.filterData();
            },
            deep: true,
        },

        selectedGLSAPCode: {
            handler() {
                this.filterData();
            },
            deep: true,
        },

        // selectedGLSAPName: {
        //     handler() {
        //         this.filterData();
        //     },
        //     deep: true,
        // },

        selectedSpecialGL: {
            handler() {
                this.filterData();
            },
            deep: true,
        },


      
    },

    methods: {
        async getExportStoreMedecine(){
            try {
                this.loading        = await true
                let StoreMedecinePath = '/api/SAP/StoreMedecine'
                let response        = await this.$axios.get(StoreMedecinePath);
                setTimeout(() => {
                    this.loading = false;
                    this.datasExport = response.data;
                    this.filteredData = this.datasExport.slice();
                   
                }, 500);
            } catch (error) {
                this.loading = await false
                console.error('Error fetching data:', error);
            }
        },
        async removeCashGL(){

            await this.$swal.fire({
                title: "Warning",
                text: "Are you sure you want to delete this item? ",
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
                    console.log(result.isConfirmed);
                    // let fd  = {
                    //     "companyCode"       : selectCompanyCode,
                    //     "systemCode"        : selectSystemCode,
                    //     "hnActivityCode"    : this.selectedItemHNTwo.Code,
                    //     "localName"         : this.selectedItemHNTwo.LocalName,
                    //     "englishName"       : this.selectedItemHNTwo.EnglishName,
                    //     "glsapCodeOPD"      : this.selectedItemGLOPD.GLNo,
                    //     "glsapNameOPD"      : this.selectedItemGLOPD.GLDes,
                    //     "glsapCodeIPD"      : this.selectedItemGLIPD.GLNo,
                    //     "glsapNameIPD"      : this.selectedItemGLIPD.GLDes,
                    //     "postingKey"        : this.posting_key
                    // }
                    // let MappingActivityGLPath       =   `/api/SAP/MappingActivityGL`
                    // let response                    =    await axios.post(`${MappingActivityGLPath}`, fd)
                    // console.log(response);
                    // console.log(fd);

                    // // if(response){
                    //     Swal.fire({
                    //         icon: "success",
                    //         title: "Complete",
                    //         text: "You data was saved.",
                    //         customClass: {
                    //             title: 'text-success' // Add your custom class here
                    //         }
                    //     });
                    // // }

            
                }
            });
        },

        async checkStoreMedicine(){

            if(this.selectedItemStorMedicine){
                this.checkInputData('StoreMedicine', this.$refs.StoreMedicineField)
            }else{
                try {
                    this.loading                = await true
                    let GetTmCashAndGLIDPath     = `/api/SAP/CashAndGL/GetStoreMedicineFieldID?StoreMedicineFieldCode=${this.selectedItemStorMedicine.Code}`
                    let response                = await this.$axios.get(GetTmCashAndGLIDPath);
                    this.dataHNReceive         = response.data;
                  
                } catch (error) {
                    this.loading = await false
                    console.error('Error fetching data:', error);
                }
            }
           
        },
        
        async MappingCashGL(){

         
            // เช็ค value
            if(this.$refs.formMapping.validate()){

                // เช็คค่า dataHNReceive ใน Table ที่จะ Mapping
                if(this.dataHNReceive.length > 0){

        

                    const HNReceive = this.dataHNReceive[0].HNReceiveCode
                    const selectedHNReceive = this.selectedItemHNTwo.Code

                    
                    const GLSAR = this.dataHNReceive[0].GLSARCode
                    const selectedItemGLSAR = this.selectedItemGLSAR.GLNo

                    const GLSAP = this.dataHNReceive[0].GLSAPCode
                    const selectedItemGLSAP = this.selectedItemGLSAP.GLNo

                    const selectCompanyCode   = this.$refs.selectCompanyCode.selecItem;
                    const selectSystemCode    = this.$refs.selectSystemCode.selecItem;

                    // เช็คค่า HNReceive ในตารางต้องตรงกับ selectedHNReceive ที่เลือก หรือ GLSAR และ GLSAP ข้อมูลต้องไม่เหมือนกัน
                    if(HNReceive !== selectedHNReceive || GLSAR === selectedItemGLSAR && GLSAP === selectedItemGLSAP){
                        this.$swal.fire({
                            icon: "error",
                            title: "Incomplete",
                            text: "Unable to update . Please check data agian.",
                            customClass: {
                                title: 'text-error' // Add your custom class here
                            }
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    this.isError = true
                                }
                            });

                    }else{
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
                                    "hnReceiveCode": this.dataHNReceive[0].HNReceiveCode === null ? '' : this.dataHNReceive[0].HNReceiveCode,
                                    "localName": this.dataHNReceive[0].LocalName === null ? '' : this.dataHNReceive[0].LocalName,
                                    "englishName": this.dataHNReceive[0].EnglishName === null ? '' : this.dataHNReceive[0].EnglishName,
                                    "glsarCode": this.selectedItemGLSAR.GLNo,
                                    "glsarName": this.selectedItemGLSAR.GLDes,
                                    "postingKey": this.posting_key,
                                    "postingKey2": this.posting_key2,
                                    "glsapCode": this.selectedItemGLSAP.GLNo,
                                    "glsapName": this.selectedItemGLSAP.GLDes,
                                    "key2Description": "",
                                    "specialGL":this.selectedItemSpecialGL.GLNo,
                                    // "specialGL":this.selectedItemSpecialGL.GLDes,
                                }
                                try {
                                    
                                    const MappingCashGLPath       =   `/api/SAP/CashAndGL/MappingCashGL`
                                    await this.$axios.post(`${MappingCashGLPath}`, fd)

                                    
                                
                                    this.$swal.fire({
                                        icon: 'success',
                                        title: 'Complete',
                                        text: 'Your data was saved.',
                                        customClass: {
                                        title: 'text-success', // Example of adding custom class
                                        },
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            this.clearData(); // Call method to clear data
                                            this.checkHNReceive()
                                        }
                                    });

                                } catch (error) {
                                    console.log(error);
                                    this.$swal.fire({
                                        icon: "error",
                                        title: "Incomplete",
                                        text: "Unable to update . Please check data agian.",
                                        customClass: {
                                            title: 'text-error' // Add your custom class here
                                        }
                                    });
                                }

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

        handleTabClick(tab) {
            switch (tab.name) {
                case "Create/Change":
                    break;
                case "Export":
                    this.getExportStoreMedecine()
                    break;
                default:
                    // Default action
                    break;
            }
            // Add custom logic here, such as updating data or calling methods
        },

       
        getselectedItemStorMedicine(data) {
              this.selectedItemStorMedicine = data;
        },
        getselectedItemHNTwo(data) {
              this.selectedItemHNTwo = data;
        },
        getselectedItemGLSAR(data) {
              this.selectedItemGLSAR = data;
        },
    
        getselectedItemGLSAP(data){
            this.selectedItemGLSAP = data;
        },
        getselectedItemSpecialGL(data){
            this.selectedItemSpecialGL = data;
        },
        // updateSelectedCompanyCode(value) {
        //     this.selectedCompanyCode = value;
        // },
        // updateSelectedSystemCode(value) {
        //     this.selectedSystemCode = value;
        // },
        updateSelectedHNReceiveCode(value) {
            this.selectedHNReceiveCode = value;
        },
        updateSelectedHNReceiveName(value) {
            this.selectedHNReceiveName = value;
        },
        // updateSelectedEnglishName(value) {
        //     this.selectedEnglishName = value;
        // },
        updateSelectedGLSARCode(value) {
            this.selectedGLSARCode = value;
        },
        updateSelectedGLSARName(value) {
            this.selectedGLSARName = value;
        },
        updateSelectedGLSAPCode(value) {
            this.selectedGLSAPCode = value;
        },
        // updateSelectedGLSAPName(value) {
        //     this.selectedGLSAPName = value;
        // },
        updateSelectedSpecialGL(value) {
            this.selectedSpecialGL = value;
        },
       
        // searchCompanies(columnName, searchTerm) {
        //     if(columnName === 'CompanyCode'){
        //         this.searchCompanyCode = searchTerm;
        //     }else if (columnName === 'SystemCode') {
        //         this.searchSystemCode = searchTerm;
        //     }else if (columnName === 'HNReceiveCode') {
        //         this.searchHNReceiveCode = searchTerm;
        //     } else if (columnName === 'LocalName') {
        //         this.searchLocalName = searchTerm;
        //     // } else if (columnName === 'EnglishName') {
        //     //     this.searchEnglishName = searchTerm;
        //     } else if (columnName === 'GLSARCode') {
        //         this.searchGLSARCode = searchTerm;
        //     } else if (columnName === 'GLSARName') {
        //         this.searchGLSARName = searchTerm;
        //     } else if (columnName === 'GLSAPCode') {
        //         this.searchGLSAPCode = searchTerm; 
        //     // } else if (columnName === 'GLSAPName') {
        //     //     this.searchGLSAPName = searchTerm;  
        //     } else if (columnName === 'SpecialGL') {
        //         this.searchSpecialGL = searchTerm;  
        //     }

        //     this.filterData();
        // }, 
        
        filterData() {


            this.filteredData = this.datasExport.filter(item =>

            (this.selectedCompanyCode.length === 0 || this.selectedCompanyCode.includes(item.CompanyCode)) &&
            (this.selectedSystemCode.length === 0 || this.selectedSystemCode.includes(item.SystemCode)) &&
            (this.selectedHNReceiveCode.length === 0 || this.selectedHNReceiveCode.includes(item.HNReceiveCode)) &&
            (this.selectedHNReceiveName.length === 0 || this.selectedHNReceiveName.includes(item.LocalName)) &&
            // (this.selectedEnglishName.length === 0 || this.selectedEnglishName.includes(item.EnglishName)) &&
            (this.selectedGLSARCode.length === 0 || this.selectedGLSARCode.includes(item.GLSARCode)) &&
            (this.selectedGLSARName.length === 0 || this.selectedGLSARName.includes(item.GLSARName)) &&
            (this.selectedGLSAPCode.length === 0 || this.selectedGLSAPCode.includes(item.GLSAPCode)) &&
            // (this.selectedGLSAPName.length === 0 || this.selectedGLSAPName.includes(item.GLSAPName)) &&
            (this.selectedSpecialGL.length === 0 || this.selectedSpecialGL.includes(item.SpecialGL))
            
            );
        },
        clearData(){
            this.$refs.formMapping.resetValidation()
            this.$refs.selectHNReceive.selectedItem = {}
            this.$refs.selectGLSAR.selectedItem = {},
            this.$refs.selectGLSAP.selectedItem = {},
            this.$refs.selectSpecialGL.selectedItem = {},
            this.$refs.selectCompanyCode.selecItem = null 
            this.$refs.selectSystemCode.selecItem = null 
            this.selectedItemHNTwo = {},
            this.selectedItemGLSAR = {},
            this.selectedItemGLSAP = {},
            this.selectedItemSpecialGL = {},
            this.posting_key = null,
            this.posting_key2 = null,
            this.isError = false
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

    .line-height{
        line-height: 1.8;
    }
   
    
</style>