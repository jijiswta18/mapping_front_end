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
                                    <span>Account Group</span>
                                </v-col>
                                <v-col cols="12" md="6" class="px-0 py-0"></v-col>

                                <v-col cols="12" md="6" class="text-center">
                                    <InputSearchHN 
                                        title="AR Compose Category"
                                        label="AR Compose Category" 
                                        code="AR Compose Category" 
                                        name="Description"
                                        type="Term Of Payment" 
                                        @childEvent="getselectedItemHNOne"
                                    />
                                  
                                </v-col>

                                <v-col cols="12" md="6"  class="d-flex justify-space-between align-center">
                                    
                                    <span class="f-12 pr-3">AR Compose Category Name : {{ selectedItemHNOne.LocalName }}</span>
                                    <!-- <v-btn @click="checkHNReceive(selectedItemHNOne.Code)" class="bg-orange">Check</v-btn> -->
                                    <v-btn @click="greetUser" class="bg-orange">Check</v-btn>
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
                                <SelectCompanyCode ref="selectCompanyCode"/>
                         
                            
                            </v-col>

                            <v-col cols="12" md="4">
                                <SelectSystemCode ref="selectSystemCode"/>
                            </v-col>

                            <v-col cols="12" md="2"></v-col>
                         

                        </v-row>

                        <div class=" border-bottom pb-0"></div>

                        <v-row class="my-2">  
                            
                            <v-col cols="12" md="1"></v-col>
                         
                            <v-col cols="12" md="5">
                                <h2 class="f-16">AR Compose Category</h2>
                                <v-row class="mt-3">
                                    <v-col cols="12" md="4" >
                                        <span class="f-12">AR Compose Category</span>
                                    </v-col>
                                    <v-col cols="12" md="8">

                                        <InputSearchHN 
                                            title="AR Compose Category"
                                            label="AR Compose Category" 
                                            code="AR Compose Category" 
                                            name="Description"
                                            type="Term Of Payment" 
                                            @childEvent="getselectedItemHNOne"
                                        />

                                      

                                       
                                    </v-col>
                                </v-row>

                                <v-row class="mt-3">
                                    <v-col cols="12" md="4">
                                        <span class="f-12">Description</span>
                                    </v-col>
                                    <v-col cols="12" md="8">
                                        <p class="f-12 border-bottom pb-0 h25">{{selectedTermPayment.LocalName}}</p>
                                    </v-col>
                                </v-row>

                            </v-col>

                            <v-col cols="12" md="5">
                                <h2 class="f-16">KTOKK</h2>
                                <v-row class="mt-3">
                                    <v-col cols="12" md="4">
                                        <span class="f-12">KTOKK</span>
                                    </v-col>
                                    <v-col cols="12" md="8">

                                        <InputSearch 
                                            title="KTOKK"
                                            label="KTOKK" 
                                            code="KTOKK" 
                                            name="Description"
                                            type="KTOKK" 
                                            @childEvent="getselectedItemHNOne"
                                        />

                                       
                                    </v-col>
                                </v-row>

                                <v-row class="mt-3">
                                    <v-col cols="12" md="4">
                                        <span class="f-12">Description</span>
                                    </v-col>
                                    <v-col cols="12" md="8">
                                        <p class="f-12 border-bottom pb-0 h25">{{selectedTermPaymentSAP.GLDes}}</p>
                                    </v-col>
                                    
                                </v-row>
                            </v-col>
                            <v-col cols="12" md="1"></v-col>
                        
                        </v-row>

                        <div class=" border-bottom pb-0"></div>

                        <v-row class="my-2">  

                            <v-col cols="12" md="1"></v-col>
                         
                            <v-col cols="12" md="5">
                                <h2 class="f-16">AR_AKONT</h2>
                                <v-row class="mt-3">
                                    <v-col cols="12" md="4">
                                        <span class="f-12">AR_AKONT</span>
                                    </v-col>
                                    <v-col cols="12" md="8">

                                        <InputSearch 
                                            title="AR_AKONT"
                                            label="AR_AKONT" 
                                            code="AR_AKONT" 
                                            name="Description"
                                            type="AR_AKONT" 
                                            @childEvent="getselectedItemHNOne"
                                        />
                                    
                                       
                                    </v-col>
                                </v-row>

                                <v-row class="mt-3">
                                    <v-col cols="12" md="4">
                                        <span class="f-12">Description</span>
                                    </v-col>
                                    <v-col cols="12" md="8">
                                        <p class="f-12 border-bottom pb-0 h25">{{selectedTermPayment.LocalName}}</p>
                                    </v-col>
                                </v-row>

                            </v-col>

                            <v-col cols="12" md="5">
                                <h2 class="f-16">AP_AKONT</h2>
                                <v-row class="mt-3">
                                    <v-col cols="12" md="4">
                                        <span class="f-12">AP_AKONT</span>
                                    </v-col>
                                    <v-col cols="12" md="8">

                                        <InputSearch 
                                            title="AP_AKONT"
                                            label="AP_AKONT" 
                                            code="AP_AKONT" 
                                            name="Description"
                                            type="AP_AKONT" 
                                            @childEvent="getselectedItemHNOne"
                                        />
                                    
                                       
                                       
                                    </v-col>
                                </v-row>

                                <v-row class="mt-3">
                                    <v-col cols="12" md="4">
                                        <span class="f-12">Description</span>
                                    </v-col>
                                    <v-col cols="12" md="8">
                                        <p class="f-12 border-bottom pb-0 h25">{{selectedTermPayment.LocalName}}</p>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="12" md="1"></v-col>
                        
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
                            <v-btn class="bg-blue"  @click="exportToExcel(filteredData)">Export</v-btn>
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
                    <template v-slot:[`header.HNActivityCode`]="{ header }">
                        <div>
                        {{ header.text }}

                        <v-menu
                            v-model="menu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            :return-value.sync="selectedItem"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                        >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                v-bind="attrs"
                                v-on="on"
                                id="menu-activator"
                                class="btn-with-icon"
                                text
                            >
                                <i class="fas fa-caret-down"></i>
                            </v-btn>
                        </template>

                        <v-list>
                        
                                <v-list-item
                                    v-for="(item, index) in dropdownOptions"
                                    :key="index"
                                    @click="selectItem(item)"
                                >
                                    <v-checkbox v-model="selectedItems" :label="item.HNActivityCode" :value="item"></v-checkbox>
                                </v-list-item>
                            
                          
                        </v-list>
                        
                        </v-menu>

                           

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
// import * as XLSX from 'xlsx';
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
        dataTermPayment : [],
        selectedItemHNOne: {},
        selectedTermPayment: {},
        selectedTermPaymentSAP: {},
        datasExport : [],
        filteredData: [],
        SelectHNActivity:[],
        posting_key: null,
        posting_key2: null,
        headersData: [
            { text: 'Company Code', align: 'left', sortable: false, value: 'CompanyCode' },
            { text: 'System Code', align: 'left', sortable: false, value: 'SystemCode' },
            { text: 'AR Compose Category', align: 'left', sortable: false, value: 'ARComposeCategory' },
            { text: 'Description', align: 'left', sortable: false, value: 'Description' },
            { text: 'KTOKK', align: 'left', sortable: false, value: 'KTOKK' },
            { text: 'Description', align: 'left', sortable: false, value: 'Description' },
            { text: 'AR_AKONT', align: 'left', sortable: false, value: 'ARAKONT' },
            // { text: 'Delete', align: 'center', sortable: false, value: 'Action' },
        ],
        headersExport: [
            { text: 'Company Code', align: 'left', sortable: false, value: 'CompanyCode' },
            { text: 'System Code', align: 'left', sortable: false, value: 'SystemCode' },
            { text: 'AR Compose Category', align: 'left', sortable: false, value: 'ARComposeCategory' },
            { text: 'Description', align: 'left', sortable: false, value: 'Description' },
            { text: 'KTOKK', align: 'left', sortable: false, value: 'KTOKK' },
            { text: 'Description', align: 'left', sortable: false, value: 'Description' },
            { text: 'AR_AKONT', align: 'left', sortable: false, value: 'ARAKONT' },
        
    
        ],
    
    }),

   
    methods: {
      
        handleTabClick(tab) {
            switch (tab.name) {
                case "Create/Change":
                    break;
                case "Export":
                    this.getExportAccountGroup()
                    break;
                default:
                    // Default action
                    break;
            }

        },
        async getExportAccountGroup(){
            try {
                this.loading        = await true
                let ActivityGLPath = '/api/SAP/AccountGroup'
                let response        = await axios.get(ActivityGLPath);
                setTimeout(() => {
                    this.loading = false;
                    this.datasExport = response.data;
                    this.filteredData = this.datasExport.slice();
                }, 300);
            } catch (error) {
                this.loading = await false
                // console.error('Error fetching data:', error);
            }
        },
        // exportToExcel() {
        //     const wb = XLSX.utils.book_new();
        //     const ws = XLSX.utils.json_to_sheet(this.filteredData);
        //     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        //     /* generate XLSX file and send to client */
        //     XLSX.writeFile(wb, 'TMHNActivity.xlsx');
        // },

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

        async checkHNReceive(code){

            try {
                this.loading                = await true
                let GetTmCashAndGLIDPath     = `/api/SAP/CashAndGL/GetTmCashAndGLID?HNReceiveCode=${code}`
                let response                = await axios.get(GetTmCashAndGLIDPath);
                this.dataTermPayment         = response.data;

                // await setTimeout(() => {
                //     this.loading = false;
                //     this.datasExport = response.data;
                // }, 300);
            } catch (error) {
                this.loading = await false
                console.error('Error fetching data:', error);
            }
        },
        
        async MappingCashGL(){

            const selectCompanyCode   = this.$refs.selectCompanyCode.selecItem;
            const selectSystemCode    = this.$refs.selectSystemCode.selecItem;

            if(this.$refs.formMapping.validate()){

                try {

                    if(this.dataTermPayment.length > 0){

                        await Swal.fire({
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
                                await axios.post(`${MappingCashGLPath}`, fd)
                           

                                // if(response){
                                    Swal.fire({
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
                         Swal.fire({
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
                    Swal.fire({
                        icon: "error",
                        title: "Incomplete",
                        text: "Unable to update . Please check data agian.",
                        customClass: {
                            title: 'text-error' // Add your custom class here
                        }
                    });
                }

            }else{
                Swal.fire({
                    icon: "error",
                    title: "Incomplete",
                    text: "Unable to update . Please check data agian.",
                    customClass: {
                        title: 'text-error' // Add your custom class here
                    }
                });
            }
        },
        getselectedItemHNOne(data) {
              this.selectedItemHNOne = data;
        },
        getselectedTermPayment(data) {
              this.selectedTermPayment = data;
        
        },
    
        getselectedTermPaymentSAP(data){
            this.selectedTermPaymentSAP = data;
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