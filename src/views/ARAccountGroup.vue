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
                                        dataUpdate="AccountGroup"
                                        @childEvent="getselectedItemAccGroup"
                                        @data-updated="handleDataUpdated"
                                    />
                                  
                                </v-col>

                                <v-col cols="12" md="6"  class="d-flex justify-space-between align-center">
                                    
                                    <span class="f-12 pr-3">AR Compose Category Name : {{ selectedItemHNOne.LocalName }}</span>
                                    <v-btn @click="checkAccountGroup" class="bg-orange">Check</v-btn>
                                </v-col>
                            </v-row>
                        </v-container>

                        <div class="border-gray border-b-lg mb-3" style="height: 64px; width: 64px;"></div>
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

                        <v-row class="my-2">  
                            
                            <v-col cols="12" md="1"></v-col>
                         
                            <v-col cols="12" md="5">
                                <h2 class="f-16">AR Compose Category</h2>
                                <v-row class="mt-3">
                                    <v-col>
                                        <span class="f-12">AR Compose Category</span>
                                    </v-col>
                                    <v-col cols="8">
                                        <InputSearchHN 
                                            title="AR Compose Category"
                                            label="AR Compose Category" 
                                            code="AR Compose Category" 
                                            name="Description"
                                            type="Term Of Payment" 
                                            dataUpdate="AccountGroup2"
                                            @childEvent="getselectedItemAccGroup2"
                                        />

                                      

                                       
                                    </v-col>
                                </v-row>

                                <v-row class="mt-3">
                                    <v-col>
                                        <span class="f-12">Description</span>
                                    </v-col>
                                    <v-col cols="8">
                                        <p class="f-12 border-bottom pb-0 h25">{{selectedItemAccGroup2.LocalName}}</p>
                                    </v-col>
                                </v-row>

                            </v-col>

                            <v-col cols="12" md="5">
                                <h2 class="f-16">KTOKK</h2>
                                <v-row class="mt-3">
                                    <v-col>
                                        <span class="f-12">KTOKK</span>
                                    </v-col>
                                    <v-col cols="8">

                                        <InputSearch 
                                            title="KTOKK"
                                            label="Text" 
                                            code="KTOKK" 
                                            name="Description"
                                            type="KTOKK" 
                                            dataUpdate="KTOKK"
                                            @data-updated="handleDataUpdated"
                                            @childEvent="getselectedItemKTOKK"
                                        />

                                       
                                    </v-col>
                                </v-row>

                                <v-row class="mt-3">
                                    <v-col>
                                        <span class="f-12">Description</span>
                                    </v-col>
                                    <v-col cols="8">
                                        <p class="f-12 border-bottom pb-0 h25">{{selectedItemKTOKK.GLDes}}</p>
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
                                    <v-col>
                                        <span class="f-12">AR_AKONT</span>
                                    </v-col>
                                    <v-col cols="8">

                                        <InputSearch 
                                            title="AR_AKONT"
                                            label="Text" 
                                            code="AR_AKONT" 
                                            name="Description"
                                            type="AR_AKONT" 
                                            dataUpdate="AR_AKONT"
                                            @childEvent="getselectedItemAR_AKONT"
                                            @data-updated="handleDataUpdated"
                                        />
                                    
                                       
                                    </v-col>
                                </v-row>

                                <v-row class="mt-3">
                                    <v-col>
                                        <span class="f-12">Description</span>
                                    </v-col>
                                    <v-col cols="8">
                                        <p class="f-12 border-bottom pb-0 h25">{{selectedItemAR_AKONT.LocalName}}</p>
                                    </v-col>
                                </v-row>

                            </v-col>

                            <v-col cols="12" md="5">
                                <h2 class="f-16">AP_AKONT</h2>
                                <v-row class="mt-3">
                                    <v-col>
                                        <span class="f-12">AP_AKONT</span>
                                    </v-col>
                                    <v-col cols="8">

                                        <InputSearch 
                                            title="AP_AKONT"
                                            label="Text" 
                                            code="AP_AKONT" 
                                            name="Description"
                                            type="AP_AKONT" 
                                            dataUpdate="AP_AKONT"
                                            @childEvent="getselectedItemAP_AKONT"
                                            @data-updated="handleDataUpdated"
                                        />
                                    
                                       
                                       
                                    </v-col>
                                </v-row>

                                <v-row class="mt-3">
                                    <v-col>
                                        <span class="f-12">Description</span>
                                    </v-col>
                                    <v-col cols="8">
                                        <p class="f-12 border-bottom pb-0 h25">{{selectedItemAP_AKONT.LocalName}}</p>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="12" md="1"></v-col>
                        
                        </v-row>
                        
                            <div class="text-center">
                                <v-btn @click="MappingCashGL" class="bg-orange">Update Data</v-btn>
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
                        <!-- Header Template for ARComposeCategory -->
                        <template v-slot:[`header.ARComposeCategory`]="{ header }">
                            <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedARComposeCategory"
                                :select-items="selectOptionsForColumn('ARComposeCategory')"
                                @update:selectedValue="updateSelectedARComposeCategory"
                                @search="searchCompanies('ARComposeCategory', $event)"
                                @sort="handleSort('ARComposeCategory', $event)"
                            />
                        </template>
                         <!-- Header Template for Description -->
                        <template v-slot:[`header.Description`]="{ header }">
                            <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedDescription"
                                :select-items="selectOptionsForColumn('Description')"
                                @update:selectedValue="updateSelectedDescription"
                                @search="searchCompanies('Description', $event)"
                                @sort="handleSort('Description', $event)"
                            />
                        </template>
                            <!-- Header Template for Description -->
                        <template v-slot:[`header.DescriptionTwo`]="{ header }">
                            <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedDescriptionTwo"
                                :select-items="selectOptionsForColumn('DescriptionTwo')"
                                @update:selectedValue="updateSelectedDescriptionTwo"
                                @search="searchCompanies('DescriptionTwo', $event)"
                                @sort="handleSort('DescriptionTwo', $event)"
                            />
                        </template>
                        <!-- Header Template for KTOKK -->
                        <template v-slot:[`header.KTOKK`]="{ header }">
                            <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedKTOKK"
                                :select-items="selectOptionsForColumn('KTOKK')"
                                @update:selectedValue="updateSelectedKTOKK"
                                @search="searchCompanies('KTOKK', $event)"
                                @sort="handleSort('KTOKK', $event)"
                            />
                        </template>
                        <!-- Header Template for ARAKONT -->
                        <template v-slot:[`header.ARAKONT`]="{ header }">
                            <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedARAKONT"
                                :select-items="selectOptionsForColumn('ARAKONT')"
                                @update:selectedValue="updateSelectedARAKONT"
                                @search="searchCompanies('ARAKONT', $event)"
                                @sort="handleSort('ARAKONT', $event)"
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
            search: '',
            loading: true,
            selectedItemAccGroup: {},
            selectedItemAccGroup2: {},
            selectedItemKTOKK: {},
            selectedItemAR_AKONT: {},
            selectedItemAP_AKONT: {},
            filteredData: [],
            selectedCompanyCode: [], 
            selectedARComposeCategory: [], 
            selectedDescription: [], 
            selectedSystemCode: [], 
            selectedKTOKK: [], 
            selectedDescriptionTwo: [], 
            selectedARAKONT: [], 
            headersData: [
                { text: 'Company Code', align: 'left', sortable: false, value: 'CompanyCode' },
                { text: 'System Code', align: 'left', sortable: false, value: 'SystemCode' },
                { text: 'AR Compose Category', align: 'left', sortable: false, value: 'ARComposeCategory' },
                { text: 'Description', align: 'left', sortable: false, value: 'Description' },
                { text: 'KTOKK', align: 'left', sortable: false, value: 'KTOKK' },
                { text: 'Description', align: 'left', sortable: false, value: 'Description' },
                { text: 'AR_AKONT', align: 'left', sortable: false, value: 'ARAKONT' },
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

            // getselectedItemAccGroup(data) {
            //     this.selectedItemAccGroup = data;
            // },
            // getselectedItemAccGroup2(data) {
            //     this.selectedItemAccGroup2 = data;
            // },

            // getselectedItemKTOKK(data) {
            //     this.selectedItemKTOKK = data;
            
            // },
        
            // getselectedItemAR_AKONT(data){
            //     this.selectedItemAR_AKONT = data;
            // },

            // getselectedItemAP_AKONT(data){
            //     this.selectedItemAP_AKONT = data;
            // },


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

            async checkAccountGroup(){

                if(this.selectedItemAccGroup){

                    this.checkInputData('Account Group', this.$refs.AccountGroupField)
                 
                }else{
                    try {
                        this.loading                = await true
                        let GetTmCashAndGLIDPath    = `/api/SAP/CashAndGL/GetAccGroupID?AccGroup=${this.selectedItemAccGroup}`
                        let response                = await this.$axios.get(GetTmCashAndGLIDPath);
                        this.checkData              = response.data;
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

                        if(this.checkData.length > 0){

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