<template>

    <div>
        <v-tabs v-model="tab" class="mb-2">
          <v-tab v-for="(tab, index) in tabs" :key="index" @click="handleTabClick(tab, `/api/SAP/StoreMedicine`)">{{ tab.name }}</v-tab>
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
                                    <span>Store Medicine</span>
                                </v-col>
                                <v-col cols="12" md="6" class="px-0 py-0"></v-col>

                                <v-col cols="12" md="6"  class="text-center">

                                    <InputSearchHN 
                                        ref="StoreMedicineField"
                                        title="Active Status"
                                        label="Store Medicine Code / Store Medicine Name" 
                                        code="Store Medicine Code" 
                                        name="Store Medicine Name"
                                        type="ActiveStatus" 
                                        @childEvent="getselectedItemStorMedicine"
                                    />

                                </v-col>

                                <v-col cols="12" md="6"  align-self="center" class="d-flex justify-space-between align-center">
                                    
                                    <span class="f-12 pr-3">Store Medicine Name : {{ selectedItemStorMedicine.LocalName }}</span>
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
                            hide-default-footer
                        >
                            <template v-slot:[`item.Action`]="{ item }">
                                <v-btn density="compact" icon class="bg-red text-white" @click="removeCashGL(item)">
                                    <v-icon>mdi-close</v-icon>
                                </v-btn>
                            </template>
                        </v-data-table>
                    </div>

                    <div class="box-relationship-mapping">
                        <h1 class="f-20 mb-1 mt-4">Relationship Mapping</h1>
                        <div class="border border-b-lg " style="height: 64px; width: 64px;"></div>

                        <v-form
                            ref="formMapping"
                            v-model="valid"
                            lazy-validation
                        >

                     
                        <v-row class="mb-3">

                            <v-col cols="12" md="2" class="d-xs-none"></v-col>

                            <v-col cols="12" md="4">
                                <SelectCompanyCode ref="selectCompanyCode"/>


                            </v-col>

                            <v-col cols="12" md="4">
                                <SelectSystemCode ref="selectSystemCode"/>
                            </v-col>

                            <v-col cols="12" md="2" class="d-xs-none"></v-col>


                        </v-row>


                        <div class=" border-bottom pb-0"></div>
                        <p v-if="isError" class="text-error f-13 mt-3">*ข้อมูลไม่ถูกต้อง</p>

                        <v-container>
                          
                            <v-row class="my-2">  
                               <v-col cols="12" class="pt-0">
                                    <h2 class="f-16">Store Medicine SAP</h2>
                               </v-col>
                                <v-col cols="12" md="6">
                                
                                    <v-row >
                                        <v-col>
                                            <span class="f-12">Store Medicine Code</span>
                                        </v-col>
                                        <v-col cols="8">

                                        
                                        <InputSearchHN 
                                            ref="selectStoreMedicine"
                                            title="Active Status"
                                            label="Text" 
                                            code="Store Medicine Code" 
                                            name="Store Medicine Name"
                                            type="ActiveStatus" 
                                            @childEvent="getselectedItemStorMedicine"
                                        />
                                        </v-col>
                                    </v-row>
                                </v-col>

                                <v-col cols="12" md="4">

                                    <v-row >
                                        <v-col>
                                            <span class="f-12">Local Name</span>
                                        </v-col>
                                        <v-col cols="8">
                                            <p class="f-12 border-bottom pb-0 h25 line-height" :class="{ 'text-error': isError}">{{selectedItemStorMedicine.GLDes}}</p>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <span class="f-12">English Name</span>
                                        </v-col>
                                        <v-col cols="8">
                                            <p class="f-12 border-bottom pb-0 h25 line-height" :class="{ 'text-error': isError}">{{selectedItemStorMedicine.GLDes}}</p>
                                        </v-col>
                                        
                                    </v-row>
                                </v-col>
                                <v-col cols="12" md="2"></v-col>
                            </v-row>
                        </v-container>
                       
                        <p v-if="isError" class="text-error f-13 mt-3">*ข้อมูลไม่ถูกต้อง</p>
                            <div class="text-center">
                                <v-btn class="bg-orange">Update Data</v-btn>
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
                            <v-btn class="bg-blue"  @click="exportToExcel(filteredData, 'StoreMedicine')">Export</v-btn>
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
               
                      

                        <!-- Header Template for Store Medicine Code -->
                        <template v-slot:[`header.StoreMedicineCode`]="{ header }">
                        <HeaderSelect
                            :header-text="header.text"
                            :selected-value="selectedStoreMedicine"
                            :select-items="selectOptionsForColumn('StoreMedicineCode')"
                            @update:selectedValue="updateSelectedStoreMedicine"
                            @search="searchCompanies('StoreMedicineCode', $event)"
                            @sort="handleSort('StoreMedicineCode', $event)"
                        />
                        </template>

                        <!-- Header Template for Local Name -->
                        <template v-slot:[`header.LocalName`]="{ header }">
                        <HeaderSelect
                            :header-text="header.text"
                            :selected-value="selectedLocalName"
                            :select-items="selectOptionsForColumn('LocalName')"
                            @update:selectedValue="updateSelectedLocalName"
                            @search="searchCompanies('LocalName', $event)"
                            @sort="handleSort('LocalName', $event)"
                        />
                        </template>

                         <!-- Header Template for English Name -->
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

                    </v-data-table>
                </v-card>
            </v-tab-item>
        </v-tabs-items>

    </div>
    
</template>

<script>
    import SelectCompanyCode from '@/components/SelectCompanyCode.vue';
    import SelectSystemCode from '@/components/SelectSystemCode.vue';
    import InputSearchHN from '@/components/InputSearchHN.vue';
    import HeaderSelect from '@/components/HeaderSelect.vue';
    export default{
        components: {SelectCompanyCode, SelectSystemCode, InputSearchHN, HeaderSelect},
        data: () => ({
            tab: null,
            tabs: [{ name: 'Create/Change' },{ name: 'Export' }],
            search: '',
            loading: true,
            dataHNReceive : [],
            selectedItemStorMedicine: {},
            filteredData: [],
            selectedCompanyCode: [],
            selectedSystemCode: [],
            selectedStoreMedicine: [],
            selectedLocalName: [],
            selectedEnglishName: [],
            headersDataHNActivity: [
                { text: 'Store Medicine Code', align: 'center', sortable: false, value: 'StoreMedicineCode' },
                { text: 'Local Name', align: 'center', sortable: false, value: 'LocalName' },
                { text: 'English Name', align: 'center', sortable: false, value: 'EnglishName' },
                { text: 'Delete', align: 'center', sortable: false, value: 'Action' },
            ],

            headersExport: [
                { text: 'Store Medicine Code', align: 'center', sortable: false, value: 'StoreMedicineCode' },
                { text: 'Local Name', align: 'center', sortable: false, value: 'LocalName' },
                { text: 'English Name', align: 'center', sortable: false, value: 'EnglishName' },
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

            selectedStoreMedicine: {
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

            selectedEnglishName: {
                handler() {
                    this.filterData();
                },
                deep: true,
            },

        },

        methods: {

            isActive(column) {
                if(column === 'StoreMedicineCode'){
                    return this.selectedStoreMedicine.length > 0;
                }else if (column === 'LocalName'){
                    return this.selectedLocalName.length > 0;
                }else if (column === 'EnglishName') {
                    return this.selectedEnglishName.length > 0;
                }
                return false;
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
                    this.checkInputData('Store Medicine', this.$refs.StoreMedicineField)
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

            getselectedItemStorMedicine(data) {
                this.selectedItemStorMedicine = data;
            },

            updateSelectedStoreMedicine(value) {
                this.selectedStoreMedicine = value;
            },

            updateSelectedLocalName(value) {
                this.selectedLocalName = value;
            },
        
            updateSelectedEnglishName(value) {
                this.selectedEnglishName = value;
            },
        
            filterData() {
                this.filteredData = this.datasExport.filter(item =>
                (this.selectedCompanyCode.length === 0 || this.selectedCompanyCode.includes(item.CompanyCode)) &&
                (this.selectedSystemCode.length === 0 || this.selectedSystemCode.includes(item.SystemCode)) &&
                (this.selectedStoreMedicine.length === 0 || this.selectedStoreMedicine.includes(item.StoreMedicineCode)) &&
                (this.selectedLocalName.length === 0 || this.selectedLocalName.includes(item.LocalName)) &&
                (this.selectedEnglishName.length === 0 || this.selectedEnglishName.includes(item.EnglishName))
                );
            },

            clearData(){
                this.$refs.formMapping.resetValidation()
                this.$refs.StoreMedicineField.selectedItem = {}
                this.$refs.selectStoreMedicine.selectedItem = {},
                this.$refs.selectCompanyCode.selecItem = null 
                this.$refs.selectSystemCode.selecItem = null 
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