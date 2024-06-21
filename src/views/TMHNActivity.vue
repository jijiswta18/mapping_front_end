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

                                <v-col class="text-center">

                                    <InputSearchHN 
                                        title="HN Activity"
                                        label="HNActivity Code / HNActivity Name" 
                                        code="HNActivity Code" 
                                        name="HNActivity name"
                                        type="Activity" 
                                        @childEvent="getselectedItemHNOne"
                                    />

                                    <!-- <InputSearchHN label="HNActivity Code / HNActivity Name" type="Activity"  @childEvent="getselectedItemHNOne"/> -->
                                </v-col>

                                <v-col class="d-flex justify-space-between align-center">
                                    
                                    <span class="f-16">HNActivity Name : {{ selectedItemHNOne.LocalName }}</span>
                                    <v-btn @click="checkHNActivity" class="bg-orange">Check</v-btn>
                                    <!-- <v-btn @click="checkHNActivity(selectedItemHNOne.Code)" class="bg-orange">Check</v-btn> -->
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

                        <v-form
                            ref="formMapping"
                            v-model="valid"
                            lazy-validation
                        
                        >

                     
                        <v-row class="mb-3">

                            <v-col md="4" sm="12">
                                <SelectCompanyCode ref="selectCompanyCode"/>
                            </v-col>

                            <v-col md="4" sm="12">
                                <SelectSystemCode ref="selectSystemCode"/>
                            </v-col>

                            <v-col md="4" sm="12">
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
                            
                            <v-col md="4" sm="12">
                                <h2 class="f-16">HN Activity</h2>
                                <v-row class="mt-3">
                                    <v-col>
                                        <span class="f-12">HNActivity Code</span>
                                    </v-col>
                                    <v-col cols="8">

                                        <!-- <InputSearchHN label="HNActivity Code / HNActivity Name" type="Activity"  @childEvent="getselectedItemHNOne"/> -->

                                        <InputSearchHN 
                                            title="HN Activity"
                                            label="Text" 
                                            code="HNActivity Code" 
                                            name="HNActivity name"
                                            type="Activity" 
                                            @childEvent="getselectedItemHNTwo"
                                        />

                                        <!-- <InputSearchHN label="Text" @childEvent="getselectedItemHNTwo" type="Activity" ref="HNActivity"/> -->
                                    </v-col>
                                </v-row>

                                <v-row class="mt-3">
                                    <v-col>
                                        <span class="f-12">HNActivity Name</span>
                                    </v-col>
                                    <v-col cols="8">
                                        <p class="f-12 border-bottom pb-0 h25">{{selectedItemHNTwo.LocalName}}</p>
                                    </v-col>
                                </v-row>

                            </v-col>
                          
                            <v-col md="4" sm="12">
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
                                            ref="inputFieldRef" 
                                            @childEvent="getselectedItemGLOPD"
                                        />

                                        <!-- <InputSearch @childEvent="getselectedItemGLOPD" type="OPD"  ref="GL_OPD"/> -->
                                    </v-col>
                                </v-row>

                                <v-row class="mt-3">
                                    <v-col>
                                        <span class="f-12">GL Name</span>
                                    </v-col>
                                    <v-col cols="8">
                                        <p class="f-12 border-bottom pb-0 h25">{{selectedItemGLOPD.GLDes}}</p>
                                    </v-col>
                                </v-row>

                            </v-col>

                            <v-col md="4" sm="12" >
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
                                            @childEvent="getselectedItemGLIPD"
                                        />

                                        <!-- <InputSearch @childEvent="getselectedItemGLIPD" type="IPD" ref="GL_IPD"/> -->
                                    </v-col>
                                </v-row>

                                <v-row class="mt-3">
                                    <v-col>
                                        <span class="f-12">GL Name</span>
                                    </v-col>
                                    <v-col cols="8">
                                        <p class="f-12 border-bottom pb-0 h25">{{selectedItemGLIPD.GLDes}}</p>
                                    </v-col>
                                </v-row>
                                
                            
                            </v-col>

                        </v-row>
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
                        <!-- Header Template for CompanyCode -->
                        <template v-slot:[`header.CompanyCode`]="{ header }">
                        <div class="d-flex align-center justify-space-between">
                            <span class="text-back mr-1">{{ header.text }}</span>
                            <v-select
                                v-model="selectedCompanyCode"
                                :items="selectOptionsForColumn('CompanyCode')"
                                multiple
                                hide-details
                                class="custom-v-select"
                            >
                            </v-select>

            
                        </div>
                        </template>

                        <!-- Header Template for SystemCode -->
                        <template v-slot:[`header.SystemCode`]="{ header }">
                        <div class="d-flex align-center justify-space-between">
                            <span class="text-back mr-1">{{ header.text }}</span>
                            <v-select
                            v-model="selectedSystemCode"
                            :items="selectOptionsForColumn('SystemCode')"
                            multiple
                            hide-details
                            class="custom-v-select"
                            >
                            </v-select>
                        </div>
                        </template>

                        <!-- Header Template for HNActivity Code -->
                        <template v-slot:[`header.HNActivityCode`]="{ header }">
                        <div class="d-flex align-center justify-space-between">
                            <span class="text-back mr-1">{{ header.text }}</span>
                            <v-select
                            v-model="selectedHNActivity"
                            :items="selectOptionsForColumn('HNActivityCode')"
                            multiple
                            hide-details
                            class="custom-v-select"
                            >

                            </v-select>
                        </div>
                        </template>

                        <!-- Header Template for HNActivity Name -->
                        <template v-slot:[`header.LocalName`]="{ header }">
                        <div class="d-flex align-center justify-space-between">
                            <span class="text-back mr-1">{{ header.text }}</span>
                            <v-select
                            v-model="selectedHNActivityName"
                            :items="selectOptionsForColumn('LocalName')"
                            multiple
                            hide-details
                            class="custom-v-select"
                            >
                            </v-select>
                        </div>
                        </template>

                        <!-- Header Template for GLSAPCodeOPD -->
                        <template v-slot:[`header.GLSAPCodeOPD`]="{ header }">
                        <div class="d-flex align-center justify-space-between">
                            <span class="text-back mr-1">{{ header.text }}</span>
                            <v-select
                            v-model="selectedGLOPDCode"
                            :items="selectOptionsForColumn('GLSAPCodeOPD')"
                            multiple
                            hide-details
                            class="custom-v-select"
                            >
                            </v-select>
                        </div>
                        </template>

                        <!-- Header Template for GLSAPNameOPD -->
                        <template v-slot:[`header.GLSAPNameOPD`]="{ header }">
                        <div class="d-flex align-center justify-space-between">
                            <span class="text-back mr-1">{{ header.text }}</span>
                            <v-select
                            v-model="selectedGLOPDName"
                            :items="selectOptionsForColumn('GLSAPNameOPD')"
                            multiple
                            hide-details
                            class="custom-v-select"
                            >
                            </v-select>
                        </div>
                        </template>

                        <!-- Header Template for GLSAPCodeIPD -->
                        <template v-slot:[`header.GLSAPCodeIPD`]="{ header }">
                        <div class="d-flex align-center justify-space-between">
                            <span class="text-back mr-1">{{ header.text }}</span>
                            <v-select
                            v-model="selectedGLIPDCode"
                            :items="selectOptionsForColumn('GLSAPCodeIPD')"
                            multiple
                            hide-details
                            class="custom-v-select"
                            >
                            </v-select>
                        </div>
                        </template>

                        <!-- Header Template for GLSAPNameIPD -->
                        <template v-slot:[`header.GLSAPNameIPD`]="{ header }">
                        <div class="d-flex align-center justify-space-between">
                            <span class="text-back mr-1">{{ header.text }}</span>
                            <v-select
                            v-model="selectedGLIPDName"
                            :items="selectOptionsForColumn('GLSAPNameIPD')"
                            multiple
                            hide-details
                            class="custom-v-select"
                            >
                            </v-select>
                        </div>
                        </template>

                    </v-data-table>

                </v-card>
            </v-tab-item>
        </v-tabs-items>

    </div>


</template>
<script>
import axios from "axios";
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import SelectCompanyCode from '@/components/SelectCompanyCode.vue';
import SelectSystemCode from '@/components/SelectSystemCode.vue';
import InputSearch from '@/components/InputSearch.vue';
import InputSearchHN from '@/components/InputSearchHN.vue';
export default{
    components: {SelectCompanyCode, SelectSystemCode, InputSearch, InputSearchHN},
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
        dataHNActivity : [],
        selectedItemHNOne: {},
        selectedItemHNTwo: {},
        selectedItemGLIPD:{},
        selectedItemGLOPD: {},
        datasExport : [],
        filteredData: [],
        selectedCompanyCode: [], 
        selectedSystemCode: [], 
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
        selectOptionsForColumn(columnName) {

            // Extract all values from datasExport for the specified column
            const allValues = this.datasExport.map(item => item[columnName]);

            // Filter unique values using a Set
            const uniqueValues = [...new Set(allValues)];

            // Map unique values to select options
            return uniqueValues.map(value => ({
            text: value,
            value: value.toLowerCase(), // Optionally transform to lowercase or format as needed
            }));
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
            console.log('Clicked on tab:', tab);
            // Add custom logic here, such as updating data or calling methods
        },

        async getExportActivityGL(){
            try {
                this.loading        = await true
                let ActivityGLPath = '/api/SAP/ActivityGL'
                let response        = await axios.get(ActivityGLPath);
                await setTimeout(() => {
                    this.loading = false;
                    this.datasExport = response.data;
                    this.filteredData = this.datasExport.slice();
                
                   
                }, 300);
            } catch (error) {
                this.loading = await false
                console.error('Error fetching data:', error);
            }
        },
        exportToExcel() {
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(this.filterData);
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

            /* generate XLSX file and send to client */
            XLSX.writeFile(wb, 'TMHNActivity.xlsx');
        },

        async removeHNActivity(value){
            console.log(value);
            await Swal.fire({
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
            try {
                this.loading                = await true
                let GetTmActivityIDPath     = `/api/SAP/GetTmActivityID?HNActivityCode=${this.selectedItemHNOne.Code}`
                let response                = await axios.get(GetTmActivityIDPath);
                this.dataHNActivity         = response.data;

                console.log(this.dataHNActivity);
                // await setTimeout(() => {
                //     this.loading = false;
                //     this.datasExport = response.data;
                // }, 300);
            } catch (error) {
                this.loading = await false
                console.error('Error fetching data:', error);
            }
        },
        
        async MappingActivityGL(){

            const selectCompanyCode   = this.$refs.selectCompanyCode.selecItem;
            const selectSystemCode    = this.$refs.selectSystemCode.selecItem;

            // เช็ค value
            if(this.$refs.formMapping.validate()){

                const GLSAPCodeIPD = this.dataHNActivity[0].GLSAPCodeIPD
                const selectedItemGLIPD = this.selectedItemGLIPD.GLNo

                const GLSAPCodeOPD = this.dataHNActivity[0].GLSAPCodeOPD
                const selectedItemGLOPD = this.selectedItemGLOPD.GLNo
                
                // เช็คค่า value ที่่เลือกว่าเหมือนข้อมูที่มีอยู่
                if(GLSAPCodeIPD === selectedItemGLIPD && GLSAPCodeOPD === selectedItemGLOPD){

                    Swal.fire({
                        icon: "error",
                        title: "Incomplete",
                        text: "Unable to update . Please check data agian.",
                        customClass: {
                            title: 'text-error' // Add your custom class here
                        }
                    });

                }else{

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

                    console.log(fd);

                    try {
                     

                            const MappingActivityGLPath       =   `/api/SAP/MappingActivityGL`
                            const response                    =    await axios.post(`${MappingActivityGLPath}`, fd)
                            console.log(response);
                        
                            

                            Swal.fire({
                                icon: "success",
                                title: "Complete",
                                text: "You data was saved.",
                                customClass: {
                                    title: 'text-success' // Add your custom class here
                                }
                            });

                            this.checkHNActivity()


                    } catch (error) {
                        Swal.fire({
                            icon: "error",
                            title: "Incomplete",
                            text: "Unable to update . Please check data agian.",
                            customClass: {
                                title: 'text-error' // Add your custom class here
                            }
                        });
                    }
                }

            }else{
            
                Swal.fire({
                    icon: "error",
                    title: "Incomplete",
                    text: "Unable to update. Please check data again.",
                    customClass: {
                        title: 'text-error' // Add your custom class here
                    }
                })


                // const inputSearchElement = this.$refs.inputFieldRef.$el;

                // Example: Add red border style to the InputSearch component
                // inputSearchElement.style.borderColor = 'red';

                // this.$refs.inputFieldRef.setTextFieldError();
                // .then((result) => {

                //     console.log(result);
                //     if (result.isConfirmed) {
                //         // User clicked "OK"
                //         this.$nextTick(() => {
                //         this.$refs.inputFieldRef.setTextFieldError();
                //         });
                //     }
                // });
            }
        },
        getselectedItemHNOne(data) {
              this.selectedItemHNOne = data;
        },
        getselectedItemHNTwo(data) {
            
           
              this.selectedItemHNTwo = data;
              console.log(this.selectedItemHNTwo);
        },
        getselectedItemGLOPD(data){
            this.selectedItemGLOPD = data;
            console.log(this.selectedItemGLOPD);

        },
        getselectedItemGLIPD(data){


            this.selectedItemGLIPD = data;
            console.log('this.$refs.GL_IPD',this.$refs.GL_IPD);
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
    
    
</style>