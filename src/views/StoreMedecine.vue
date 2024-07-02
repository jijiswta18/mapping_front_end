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
                                    <span>Store Medecine</span>
                                </v-col>
                                <v-col cols="12" md="6" class="px-0 py-0"></v-col>
                                <v-col cols="12" md="6" class="text-center">
                                  
                                    <InputSearchHN 
                                        title="Store Medecine"
                                        label="Store Medecine" 
                                        code="Store Medecine" 
                                        name="Store Medecine"
                                        type="StoreMedecine" 
                                    />

                                </v-col>

                                <v-col cols="12" md="6"  class="d-flex justify-space-between align-center">
                                    
                                    <span class="f-12 pr-3">Store Medecine : </span>
                                    <v-btn class="bg-orange">Check</v-btn>

                                </v-col>
                            </v-row>
                        </v-container>

                        <div class="border-gray border-b-lg mb-3" style="height: 64px; width: 64px;"></div>
                        <h1 class="f-16 mb-1">Table Mapping</h1>
                      
                       
                    </div>

                    <div class="box-relationship-mapping">
                        <h1 class="f-20 mb-1">Relationship Mapping</h1>
                        <div class="border border-b-lg " style="height: 64px; width: 64px;"></div>

                        <v-form ref="formMapping" v-model="valid" lazy-validation>

                     
                      
                        </v-form>

                    
                    </div>
                </v-card>
              </v-tab-item>
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
                                <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedCompanyCode"
                                :select-items="selectOptionsForColumn('CompanyCode', datasExport)"
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
                                :select-items="selectOptionsForColumn('SystemCode', datasExport)"
                                @update:selectedValue="updateSelectedSystemCode"
                                @search="searchCompanies('SystemCode', $event)"
                                @sort="handleSort('SystemCode', $event)"
                            />
                        </template>

                    </v-data-table>
                </v-card>
                </v-tab-item>

        </v-tabs-items>
   </div>
</template>
<script>

import HeaderSelect from '@/components/HeaderSelect.vue';
import InputSearchHN from '@/components/InputSearchHN.vue';
export default{
    components:{
        InputSearchHN,
        HeaderSelect
    },
    data: () => ({
        tab: null, // Selected tab
        tabs: [
            { name: 'Create/Change' },
            { name: 'Export' },
        ],
        valid:true,
        loading: true,
        datasExport : [],
        filteredData: [],
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
    },
    methods: {
        handleTabClick(tab) {
            switch (tab.name) {
                case "Create/Change":
                    break;
                case "Export":
                    // this.getExport('/api/SAP/CashAndGL')
                    // console.log('==========',this.datasExport);
                    this.getExportArPaymentTerm()
                    break;
                default:
                    // Default action
                    break;
            }
        },
        async getExportArPaymentTerm(){
            try {
                this.loading        = await true
                let ActivityGLPath = '/api/SAP/CashAndGL'
                let response        = await this.$axios.get(ActivityGLPath);
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
        searchCompanies(columnName, searchTerm) {
            if(columnName === 'CompanyCode'){
                this.searchCompanyCode = searchTerm;
            }else if (columnName === 'SystemCode') {
                this.searchSystemCode = searchTerm;
            }else if (columnName === 'HNReceiveCode') {
                this.searchHNReceiveCode = searchTerm;
            } else if (columnName === 'LocalName') {
                this.searchHNReceiveName = searchTerm;
            // } else if (columnName === 'EnglishName') {
            //     this.searchEnglishName = searchTerm;
            } else if (columnName === 'GLSARCode') {
                this.searchGLSARCode = searchTerm;
            } else if (columnName === 'GLSARName') {
                this.searchGLSARName = searchTerm;
            } else if (columnName === 'GLSAPCode') {
                this.searchGLSAPCode = searchTerm; 
            // } else if (columnName === 'GLSAPName') {
            //     this.searchGLSAPName = searchTerm;  
            } else if (columnName === 'SpecialGL') {
                this.searchSpecialGL = searchTerm;  
            }

            this.filterData();
        }, 
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
      
    }
}
</script>