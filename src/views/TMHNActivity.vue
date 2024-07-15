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
                                    <span>HNACtivity</span>
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
                                        dataUpdate="ActivityOne"
                                        @childEvent="getselectedItemHNOne"
                                        @data-updated="handleDataUpdated"

                                    />

                                </v-col>

                                <v-col cols="12" md="6"  class="d-flex justify-space-between align-center">
                                    
                                    <span class="f-12 pr-3">HNActivity Name : {{ selectedItemHNOne.LocalName }}</span>
                                    <v-btn @click="checkHNActivity" class="bg-orange">Check</v-btn>

                                </v-col>
                            </v-row>
                        </v-container>

                        <div class="border-gray border-b-lg mb-3" style="height: 64px; width: 64px;"></div>
                        <h1 class="f-16 mb-1">Table Mapping</h1>
                      
                        <v-data-table
                            :headers="headersDataHNActivity"
                            :items="dataHNActivity"
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

                        <v-form ref="formMapping" v-model="valid" lazy-validation>

                     
                        <v-row class="mb-3">

                            <v-col cols="12" md="4">
                                <SelectCompanyCode ref="selectCompanyCode"/>
                            </v-col>

                            <v-col cols="12" md="4">
                                <SelectSystemCode ref="selectSystemCode"/>
                            </v-col>

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
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                 
                            </v-col>

                        </v-row>

                        <div class=" border-bottom pb-0"></div>

                
                        <v-row class="my-2">
                            
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
                                            dataUpdate="ActivityTwo"
                                            ref="selectHNActivity"
                                            :isError="isError" 
                                            @childEvent="getselectedItemHNTwo"
                                            @data-updated="handleDataUpdated"
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
                          
                            <v-col cols="12" md="4">
                                <h2 class="f-16">G/L Account OPD</h2>
                                <v-row class="mt-3">
                                    <v-col>
                                        <span class="f-12">GL Code</span>
                                    </v-col>
                                    <v-col cols="8">

                                        <InputSearch 
                                            title="G/L Account OPD"
                                            label="Text" 
                                            code="GL OPD Code" 
                                            name="GL OPD Name" 
                                            ref="slectGLOPD" 
                                            type="SapGL"
                                            dataUpdate="G/L OPD"
                                            :isError="isError"
                                            @childEvent="getselectedItemGLOPD"
                                            @data-updated="handleDataUpdated"
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

                            <v-col cols="12" md="4">
                                <h2 class="f-16">G/L Account IPD</h2>
                                <v-row class="mt-3">
                                    <v-col>
                                        <span class="f-12">GL Code</span>
                                    </v-col>
                                    <v-col cols="8">

                                        <InputSearch 
                                            title="G/L Account IPD"
                                            label="Text" 
                                            code="GL IPD Code" 
                                            name="GL IPD Name" 
                                            type="SapGL"
                                            dataUpdate="G/L IPD"
                                            ref="slectGLIPD" 
                                            :isError="isError"
                                            @childEvent="getselectedItemGLIPD"
                                            @data-updated="handleDataUpdated"
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
                        <v-btn @click="MappingActivityGL" class="bg-orange" block>Update Data</v-btn>
                        </v-form>

                    
                    </div>
                </v-card>
            </v-tab-item>

            <!-- Export -->
            <v-tab-item>
                <v-card outlined class="mx-auto style-card" color="surface-variant">
                    <h1 class="f-20">Export</h1>
                    <div class="border border-b-lg " style="height: 64px; width: 64px;"></div>
                    <v-row class="py-3 align-center">
                        <v-col>
                            <h2 class="f-16">
                                Table Mapping
                            </h2>
                        </v-col>

                        <v-col class="text-right">
                            <v-btn class="bg-blue"  @click="exportToExcel(filteredData, 'TMHNActivity')">Export</v-btn>
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
                                @search="searchCompanies('CompanyCode', $event)"
                                @sort="handleSort('CompanyCode', $event)"
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
                                @sort="handleSort('SystemCode', $event)"
                            />
                        </template>

                        <!-- Header Template for HNActivity Code -->
                        <template v-slot:[`header.HNActivityCode`]="{ header }">
                            <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedHNActivity"
                                :select-items="selectOptionsForColumn('HNActivityCode')"
                                @update:selectedValue="updateSelectedHNActivity"
                                @search="searchCompanies('HNActivityCode', $event)"
                                @sort="handleSort('HNActivityCode', $event)"
                            />
                        </template>

                        <!-- Header Template for HNActivity Name -->
                        <template v-slot:[`header.LocalName`]="{ header }">
                            <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedHNActivityName"
                                :select-items="selectOptionsForColumn('LocalName')"
                                @update:selectedValue="updateSelectedHNActivityName"
                                @search="searchCompanies('LocalName', $event)"
                                @sort="handleSort('LocalName', $event)"
                            />
                        </template>

                        <!-- Header Template for GLSAPCodeOPD -->
                        <template v-slot:[`header.GLSAPCodeOPD`]="{ header }">

                            <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedGLOPDCode"
                                :select-items="selectOptionsForColumn('GLSAPCodeOPD')"
                                @update:selectedValue="updateSelectedGLOPDCode"
                                @search="searchCompanies('GLSAPCodeOPD', $event)"
                                @sort="handleSort('GLSAPCodeOPD', $event)"
                            />
                        </template>

                        <!-- Header Template for GLSAPNameOPD -->
                        <template v-slot:[`header.GLSAPNameOPD`]="{ header }">
                            <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedGLOPDName"
                                :select-items="selectOptionsForColumn('GLSAPNameOPD')"
                                @update:selectedValue="updateSelectedGLOPDName"
                                @search="searchCompanies('GLSAPNameOPD', $event)"
                                @sort="handleSort('GLSAPNameOPD', $event)"
                            />
                        </template>

                        <!-- Header Template for GLSAPCodeIPD -->
                        <template v-slot:[`header.GLSAPCodeIPD`]="{ header }">
                            <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedGLIPDCode"
                                :select-items="selectOptionsForColumn('GLSAPCodeIPD')"
                                @update:selectedValue="updateSelectedGLIPDCode"
                                @search="searchCompanies('GLSAPCodeIPD', $event)"
                                @sort="handleSort('GLSAPCodeIPD', $event)"
                            />
                        </template>

                        <!-- Header Template for GLSAPNameIPD -->
                        <template v-slot:[`header.GLSAPNameIPD`]="{ header }">
                            <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedGLIPDName"
                                :select-items="selectOptionsForColumn('GLSAPNameIPD')"
                                @update:selectedValue="updateSelectedGLIPDName"
                                @search="searchCompanies('GLSAPNameIPD', $event)"
                                @sort="handleSort('GLSAPNameIPD', $event)"
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
export default{
    components: {SelectCompanyCode, SelectSystemCode, InputSearch, InputSearchHN, HeaderSelect},
    data: () => ({
        tab: null,
        tabs: [{ name: 'Create/Change' },{ name: 'Export' }],
        // menu: false,
        selectedItem: null,
        search: '',
        selectedItems: [],
        // scrollTo: null,
        valid:true,
        loading: true,
        dataHNActivity : [],
        selectedItemHNOne: {},
        selectedItemHNTwo: {},
        selectedItemGLIPD:{},
        selectedItemGLOPD: {},
        // datasExport : [],
        filteredData: [],
        // selectedCompanyCode: [], 
        // selectedSystemCode: [], 
        selectedHNActivity: [], 
        selectedHNActivityName: [], 
        selectedGLOPDCode: [],
        selectedGLOPDName: [],
        selectedGLIPDCode: [],
        selectedGLIPDName: [],
        posting_key: null,
        headersDataHNActivity: [
            { text: 'Company Code', align: 'left', sortable: false, value: 'CompanyCode' },
            { text: 'System Code', align: 'left', sortable: false, value: 'SystemCode' },
            { text: 'HNActivity Code', align: 'left', sortable: false, value: 'Code' },
            { text: 'HNActivity Name', align: 'left', sortable: false, value: 'LocalName' },
            { text: 'GL OPD Code', align: 'left', sortable: false, value: 'GLSAPCodeOPD' },
            { text: 'GL OPD Name', align: 'left', sortable: false, value: 'GLSAPNameOPD' },
            { text: 'GL IPD Code', align: 'left', sortable: false, value: 'GLSAPCodeIPD' },
            { text: 'GL IPD  Name', align: 'left', sortable: false, value: 'GLSAPNameIPD' },
            { text: 'Posting Key', align: 'left', sortable: false, value: 'PostingKey' },
            { text: 'Delete', align: 'center', sortable: false, value: 'Action' },
        ],
        headersExport: [
            { text: 'Company Code', align: 'left', sortable: false, value: 'CompanyCode' },
            { text: 'System Code', align: 'left', sortable: false, value: 'SystemCode' },
            { text: 'HNActivity Code', align: 'left', sortable: false, value: 'HNActivityCode' },
            { text: 'HNActivity Name', align: 'left', sortable: false, value: 'LocalName' },
            { text: 'GL OPD Code', align: 'left', sortable: false, value: 'GLSAPCodeOPD' },
            { text: 'GL OPD Name', align: 'left', sortable: false, value: 'GLSAPNameOPD' },
            { text: 'GL IPD Code', align: 'left', sortable: false, value: 'GLSAPCodeIPD' },
            { text: 'GL IPD  Name', align: 'left', sortable: false, value: 'GLSAPNameIPD' },
        ],
      
        isError: false

        // classGLSAPCodeIPD: false,
        // classGLSAPCodeOPD: false
    
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
    },

    methods: {
        async getExportActivityGL(){
            try {
                this.loading        = await true
                let ActivityGLPath = '/api/SAP/ActivityGL'
                let response        = await this.$axios.get(ActivityGLPath);
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
        async removeHNActivity(value){
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
        async checkHNActivity(){
          
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
                    
                    // เช็คค่า HNActivity ในตารางต้องตรงกับ selectedHNActivity ที่เลือก หรือ GLSAPCodeIPD และ GLSAPCodeOPD ข้อมูลต้องไม่เหมือนกัน
                    if(HNActivity !== selectedHNActivity || GLSAPCodeIPD === selectedItemGLIPD && GLSAPCodeOPD === selectedItemGLOPD){

                        this.$swal.fire({
                            icon: "error",
                            title: "Incomplete",
                            text: "Unable to update . Please check data agian.",
                            customClass: {
                                title: 'text-error' // Add your custom class here
                            }
                        }).then((result) => {
                                        if (result.isConfirmed) {

                                            // GLSAPCodeOPD === selectedItemGLOPD ? this.classGLSAPCodeOPD = true  : false
                                            // GLSAPCodeIPD === selectedItemGLIPD ? this.classGLSAPCodeIPD = true  : false
                                            this.isError = true

                        //                     if(GLSAPCodeOPD === selectedItemGLOPD){
                        //     this.classGLSAPCodeOPD = true 
                        // }

                        // if(GLSAPCodeIPD === selectedItemGLIPD){
                        //     this.classGLSAPCodeIPD = true 
                        // }
                    
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

                                "companyCode"       : selectCompanyCode != null ? selectCompanyCode : this.dataHNActivity[0].companyCode,
                                "systemCode"        : selectSystemCode!= null ? selectSystemCode : this.dataHNActivity[0].systemCode,
                                "hnActivityCode"    : this.selectedItemHNTwo.Code,
                                "localName"         : this.selectedItemHNTwo.LocalName,
                                "englishName"       : this.selectedItemHNTwo.EnglishName,
                                "glsapCodeOPD"      : this.selectedItemGLOPD.GLNo,
                                "glsapNameOPD"      : this.selectedItemGLOPD.GLDes,
                                "glsapCodeIPD"      : this.selectedItemGLIPD.GLNo,
                                "glsapNameIPD"      : this.selectedItemGLIPD.GLDes,
                                "postingKey"        : this.posting_key != null ? this.posting_key : this.dataHNActivity[0].postingKey
                                }

                                try {


                                    const MappingActivityGLPath       =   `/api/SAP/MappingActivityGL`
                                    await this.$axios.post(`${MappingActivityGLPath}`, fd)

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
                                            this.checkHNActivity()
                                        }
                                    });
                                
                                
                                
                                } catch (error) {

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


        filterData() {

            this.filteredData = this.datasExport.filter(item =>

            (this.selectedCompanyCode.length === 0 || this.selectedCompanyCode.includes(item.CompanyCode)) &&
            (this.selectedSystemCode.length === 0 || this.selectedSystemCode.includes(item.SystemCode)) &&
            (this.selectedHNActivity.length === 0 || this.selectedHNActivity.includes(item.HNActivityCode)) &&
            (this.selectedHNActivityName.length === 0 || this.selectedHNActivityName.includes(item.LocalName)) &&
            (this.selectedGLOPDCode.length === 0 || this.selectedGLOPDCode.includes(item.GLSAPCodeOPD)) &&
            (this.selectedGLOPDName.length === 0 || this.selectedGLOPDName.includes(item.GLSAPNameOPD)) &&
            (this.selectedGLIPDCode.length === 0 || this.selectedGLIPDCode.includes(item.GLSAPCodeIPD)) &&
            (this.selectedGLIPDName.length === 0 || this.selectedGLIPDName.includes(item.GLSAPNameIPD))
            );
        },

        handleTabClick(tab) {
            switch (tab.name) {
                case "Create/Change":
                    break;
                case "Export":
                    this.getExportActivityGL()
                    break;
                default:
                    // Default action
                    break;
            }
        },
        
        getselectedItemHNOne(data) {
              this.selectedItemHNOne = data;
        },
        getselectedItemHNTwo(data) {
            this.selectedItemHNTwo = data;
        },
        getselectedItemGLOPD(data){
            this.selectedItemGLOPD = data;
        },
        getselectedItemGLIPD(data){
            this.selectedItemGLIPD = data;
        },
       
        // updateSelectedCompanyCode(value) {
        //     this.selectedCompanyCode = value;
        // },
        // updateSelectedSystemCode(value) {
        //     this.selectedSystemCode = value;
        // },
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
      
        clearData(){
            this.$refs.formMapping.resetValidation()
            this.$refs.selectHNActivity.selectedItem = {}
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
   
    .custom-v-select{
        margin: 0;
        padding: 0;
        display: ruby;
        flex: none;
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
    
    .line-height{
        line-height: 1.8;
    }
    
</style>