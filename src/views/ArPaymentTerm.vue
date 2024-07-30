<template>
    <div>

        <v-tabs v-model="tab" class="mb-2">
          <v-tab v-for="(tab, index) in tabs" :key="index" @click="handleTabClick(tab, `/api/SAP/PaymentTerm`)">{{ tab.name }}</v-tab>
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
                                    <span>Term of Payment</span>
                                </v-col>
                                <v-col cols="12" md="6" class="px-0 py-0"></v-col>

                                <v-col cols="12" md="6" class="text-center">
                                    <InputSearchHN 
                                        ref="TermPaymentField"
                                        title="Term Of Payment"
                                        label="Term Of Payment / Term Of Payment Description" 
                                        code="Term Of Payment" 
                                        name="Term Of Payment Des."
                                        type="Term Of Payment" 
                                        dataUpdate="TermPayment"
                                        @childEvent="getselectedTermPayment"
                                        @data-updated="handleDataUpdated"
                                    />
                                </v-col>

                                <v-col cols="12" md="6"  align-self="center" class="d-flex justify-space-between align-center">
                                    
                                    <span class="f-12 pr-3">Term of Payment Des. : {{ selectedItemHNOne.LocalName }}</span>
                                    <v-btn @click="checkTermPayment" class="bg-orange">Check</v-btn>
                                
                                </v-col>
                            </v-row>
                        </v-container>

                        <div class="border-gray border-b-lg mb-3" style="height: 64px; width: 64px;"></div>
                        <h1 class="f-16 mb-1">Table Mapping</h1>
                        <v-data-table
                            :headers="headersDataHNActivity"
                            :items="checkData"
                            density="compact"
                            item-key="name"
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

                            <v-col cols="12" md="2" class="d-xs-none"></v-col>

                            <v-col cols="12" md="4">
                                <SelectSystemCode ref="selectSystemCode"/>
                            
                            </v-col>

                            <v-col cols="12" md="4">
                                <SelectCompanyCode ref="selectCompanyCode"/>
                            </v-col>

                            <v-col cols="12" md="2" class="d-xs-none"></v-col>
                         

                        </v-row>

                        <div class=" border-bottom pb-0"></div>

                        <v-row class="my-2">  
                         
                            <v-col cols="12" md="6">
                                <h2 class="f-16">Term of Payment</h2>
                                <v-row class="mt-3">
                                    <v-col>
                                        <span class="f-12">Term of Payment</span>
                                    </v-col>
                                    <v-col cols="8">

                                        <InputSearchHN 
                                            title="Term Of Payment"
                                            label="Text" 
                                            code="Term Of Payment" 
                                            name="Term Of Payment Des."
                                            type="Term Of Payment" 
                                            dataUpdate="TermPayment2"
                                            @data-updated="handleDataUpdated"
                                            @childEvent="getselectedTermPayment2"
                                        />
                                       
                                    </v-col>
                                </v-row>

                                <v-row class="mt-3">
                                    <v-col>
                                        <span class="f-12">Term of Payment Description</span>
                                    </v-col>
                                    <v-col cols="8">
                                        <p class="f-12 border-bottom pb-0 h25">{{selectedTermPayment.LocalName}}</p>
                                    </v-col>
                                </v-row>

                            </v-col>
                            <!-- <div class=" border-right"></div> -->
                            <v-col cols="12" md="6">
                                <h2 class="f-16">Term of Payment in SAP</h2>
                                <v-row class="mt-3">
                                    <v-col>
                                        <span class="f-12">Term of Payment in SAP</span>
                                    </v-col>
                                    <v-col cols="8">
                                        <InputSearch 
                                            title="Term of Payment in SAP"  
                                            label="Text" 
                                            code="Term Of Payment" 
                                            name="Term Of Payment Des."
                                            type="TermPaymentSAP"
                                            dataUpdate="TermPaymentSAP"
                                            ref="GL_OPD"
                                            @childEvent="getselectedTermPaymentSAP" 
                                            @data-updated="handleDataUpdated"
                                        />
                                    </v-col>
                                </v-row>

                                <v-row class="mt-3">
                                    <v-col>
                                        <span class="f-12">Description</span>
                                    </v-col>
                                    <v-col cols="8">
                                        <p class="f-12 border-bottom pb-0 h25">{{selectedTermPaymentSAP.GLDes}}</p>
                                    </v-col>
                                    
                                </v-row>
                            </v-col>
                        
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
                            <v-btn class="bg-blue"  @click="exportToExcel(filteredData, 'ARPaymentTerm')">Export</v-btn>
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

                         <!-- Header Template for TermOfPayment -->
                         <template v-slot:[`header.TermOfPayment`]="{ header }">
                            <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedTermPayment"
                                :select-items="selectOptionsForColumn('TermOfPayment')"
                                @update:selectedValue="updateSelectedTermPayment"
                                @search="searchCompanies('TermOfPayment', $event)"
                                @sort="handleSort('TermOfPayment', $event)"
                            />
                        </template>

                         <!-- Header Template for TermOfPaymentDes -->
                         <template v-slot:[`header.TermOfPaymentDes`]="{ header }">
                            <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedTermPaymentDes"
                                :select-items="selectOptionsForColumn('TermOfPaymentDes')"
                                @update:selectedValue="updateSelectedTermPaymentDes"
                                @search="searchCompanies('TermOfPaymentDes', $event)"
                                @sort="handleSort('TermOfPaymentDes', $event)"
                            />
                        </template>

                          <!-- Header Template for TermOfPaymentSAP -->
                          <template v-slot:[`header.TermOfPaymentSAP`]="{ header }">
                            <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedTermPaymentSAP"
                                :select-items="selectOptionsForColumn('TermOfPaymentSAP')"
                                @update:selectedValue="updateSelectedTermPaymentSAP"
                                @search="searchCompanies('TermOfPaymentSAP', $event)"
                                @sort="handleSort('TermOfPaymentSAP', $event)"
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
            selectedItemTermPayment: {},
            selectedItemTermPayment2: {},
            selectedItemTermPaymentSAP: {},
            filteredData: [],
            selectedCompanyCode: [], 
            selectedSystemCode: [], 
            selectedTermPayment: [], 
            selectedTermPaymentDes: [], 
            selectedTermPaymentSAP: [], 
            selectedDescription: [], 
            headersDataHNActivity: [
                { text: 'System Code', align: 'left', sortable: false, value: 'SystemCode' },
                { text: 'Term of payment', align: 'left', sortable: false, value: 'TermOfPayment' },
                { text: 'Term of payment Des.', align: 'left', sortable: false, value: 'TermOfPaymentDes' },
                { text: 'Company Code', align: 'left', sortable: false, value: 'CompanyCode' },
                { text: 'Term of payment in SAP', align: 'left', sortable: false, value: 'TermOfPaymentSAP' },
                { text: 'Description', align: 'left', sortable: false, value: 'Description' },
                { text: 'Delete', align: 'center', sortable: false, value: 'Action' },
            ],
            headersExport: [
                { text: 'System Code', align: 'left', sortable: false, value: 'SystemCode' },
                { text: 'Term of payment', align: 'left', sortable: false, value: 'TermOfPayment' },
                { text: 'Term of payment Des.', align: 'left', sortable: false, value: 'TermOfPaymentDes' },
                { text: 'Company Code', align: 'left', sortable: false, value: 'CompanyCode' },
                { text: 'Term of payment in SAP', align: 'left', sortable: false, value: 'TermOfPaymentSAP' },
                { text: 'Description', align: 'left', sortable: false, value: 'Description' },
        
            ],
        
        }),


        methods: {

            removeHNActivity(value){
                console.log(value);
            },
            
            async checkTermPayment(){
                if(this.selectedItemTermPayment){

                    this.checkInputData('Term of Payment', this.$refs.TermPaymentField)

                }else{
                    try {
                        this.loading                = await true
                        let GetTmCashAndGLIDPath    = `/api/SAP/CashAndGL/GetTermPaymentID?TermPayment=${this.selectedItemTermPayment}`
                        let response                = await this.$axios.get(GetTmCashAndGLIDPath);
                        this.checkData              = response.data

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
            // getselectedItemHNOne(data) {
            //       this.selectedItemHNOne = data;
            // },
            // getselectedTermPayment(data) {
            //       this.selectedItemTermPayment = data;
            // },
            // getselectedTermPayment2(data) {
            //       this.selectedItemTermPayment2 = data;
            // },
        
            // getselectedTermPaymentSAP(data){
            //     this.selectedItemTermPaymentSAP = data;
            // },

            updateSelectedTermPayment(value) {
                this.SelectedTermPayment = value;
            },
            updateSelectedTermPaymentDes(value) {
                this.selectedTermPaymentDes = value;
            },
            updateSelectedTermPaymentSAP(value) {
                this.selectedTermPaymentSAP = value;
            },
            updateSelectedDescription(value) {
                this.selectedDescription = value;
            },

            filterData() {

                this.filteredData = this.datasExport.filter(item =>

                (this.selectedCompanyCode.length === 0 || this.selectedCompanyCode.includes(item.CompanyCode)) &&
                (this.selectedSystemCode.length === 0 || this.selectedSystemCode.includes(item.SystemCode)) &&
                (this.selectedTermPayment.length === 0 || this.selectedTermPayment.includes(item.TermOfPayment)) &&
                (this.selectedTermPaymentDes.length === 0 || this.selectedTermPaymentDes.includes(item.TermOfPaymentDes)) &&
                (this.selectedTermPaymentSAP.length === 0 || this.selectedTermPaymentSAP.includes(item.TermOfPaymentSAP)) &&
                (this.selectedDescription.length === 0 || this.selectedDescription.includes(item.Description))
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