<template>

    <div>
        <v-tabs v-model="tab" class="mb-2">
          <v-tab v-for="(tab, index) in tabs" :key="index" @click="handleTabClick(tab, `/api/SAP/CashAndGL`)">{{ tab.name }}</v-tab>
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
                                    <span>HNReceive Code</span>
                                </v-col>
                                <v-col cols="12" md="6" class="px-0 py-0"></v-col>

                                <v-col cols="12" md="6"  class="text-center">
                                    <InputSearchHN 
                                        ref="HNReceiveField"
                                        title="HN Receive"
                                        label="HNReceive Code / HNReceive Name" 
                                        code="HNReceive Code" 
                                        name="HNReceive name"
                                        type="Receive" 
                                        :rules="validationRules"
                                        @childEvent="getselectedItemHNOne"
                                        @data-updated="handleClearData('selectedItemHNOne', 'HNReceiveCode')"
                                    />
                                </v-col>

                                <v-col cols="12" md="6"  align-self="center" class="d-flex justify-space-between align-center">
                                    
                                    <span class="f-12 pr-3">HNReceive Name : {{ selectedItemHNOne.LocalName }}</span>
                                    
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
                            :items="dataHNReceive"
                            density="compact"
                            item-key="name"
                            hide-default-footer
                            class="style-table"
                        >
                            <template v-slot:[`item.Action`]="{ item }">
                                <v-btn density="compact" icon class="bg-red text-white icon-delete" @click="removeCashGL(item)">
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
                            <v-col cols="12" md="6" lg="3">
                                <SelectCompanyCode ref="selectCompanyCode"/>
                            </v-col>

                            <!-- select System Code -->
                            <v-col cols="12" md="6" lg="3">
                                <SelectSystemCode ref="selectSystemCode"/>
                            </v-col>

                            <!-- input Posting Key -->
                            <v-col cols="12" md="6" lg="3">
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

                            <!-- input Posting Key 2 -->
                            <v-col cols="12" md="6" lg="3">
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
                                            @keyup="handleInput('posting_key2')"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                 
                            </v-col>

                        </v-row>

                        <div class=" border-bottom pb-0"></div>
                        <v-row class="my-2">  
                            <v-col cols="12"  lg="2" class="d-xs-none"></v-col>

                            <!-- input HNReceive Code -->
                            <v-col cols="12" md="6" lg="4">
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
                                             :rules="validationRules"
                                            @childEvent="getselectedItemHNTwo"
                                            @data-updated="handleClearData('selectedItemHNTwo', 'HNReceiveCode')"
                                        />

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

                            <!-- input GLSAR Code -->
                            <v-col cols="12" md="6" lg="4">
                                <h2 class="f-16">GLSAR Code</h2>
                                <v-row class="mt-3">
                                    <v-col>
                                        <span class="f-12">GLSAR Code</span>
                                    </v-col>
                                    <v-col cols="8">
                                     
                                        <InputSearch 
                                            :rules="validationRules"
                                            title="GLSAR"
                                            label="Text" 
                                            code="GLSAR Code" 
                                            name="GLSAR Name" 
                                            type="SapGL"
                                            ref="selectGLSAR"
                                            :isError="isError"
                                            @childEvent="getselectedItemGLSAR"
                                            @data-updated="handleClearData('selectedItemGLSAR', 'GLSAR')"
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
                            <v-col cols="12"  lg="2" class="d-xs-none"></v-col>
                        </v-row>

                        <v-row class="my-2">  
                            <v-col cols="12" lg="2" class="d-xs-none"></v-col>

                            <!-- input GLSAP Code -->
                            <v-col cols="12" md="6" lg="4">
                                <h2 class="f-16">GLSAP Code</h2>
                                <v-row class="mt-3">
                                    <v-col>
                                        <span class="f-12">GLSAP Code</span>
                                    </v-col>
                                    <v-col cols="8">

                                        <InputSearch 
                                            :rules="validationRules"
                                            title="GLSAP"
                                            label="Text" 
                                            code="GLSAP Code" 
                                            name="GLSAP Name" 
                                            type="SapGL"
                                            ref="selectGLSAP"
                                            :isError="isError"
                                            @childEvent="getselectedItemGLSAP"
                                            @data-updated="handleClearData('selectedItemGLSAP', 'GLSAP')"
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

                            <!-- input SpecialGL Code -->
                            <v-col cols="12" md="6" lg="4">
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
                                            ref="selectSpecialGL"
                                            :isError="isError"
                                            @childEvent="getselectedItemSpecialGL"
                                            @data-updated="handleClearData('selectedItemSpecialGL', 'SpecialGL')"
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
                            
                            <v-col cols="12"  lg="2" class="d-xs-none"></v-col>
                        </v-row>
                       
                        <p v-if="isError" class="text-error f-13 mt-3">*ข้อมูลไม่ถูกต้อง</p>
                        <div class="text-center">
                            <v-btn @click="MappingCashGL" class="bg-orange">Update Data</v-btn>
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
                        <v-col><h2 class="f-16">Table Mapping</h2></v-col>
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
                        <template v-slot:[`item.UpdateDateTime`]="{ item }">{{ item.UpdateDateTime == null ? '' : formatDate(item.UpdateDateTime)}}</template>
                        
                        <!-- Header Template for CompanyCode -->
                        <template v-slot:[`header.CompanyCode`]="{ header }">
                            <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedCompanyCode"
                                :select-items="selectOptionsForColumn('CompanyCode')"
                                @update:selectedValue="updateSelectedCompanyCode"
                                @search="searchCompanies('CompanyCode', $event)"
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
                            @search="searchCompanies('SystemCode', $event)"
                            @sort="handleSort('SystemCode', $event)"
                            :class="{ active_select: isActive('SystemCode') }"
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
                            :class="{ active_select: isActive('HNReceiveCode') }"
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
                            :class="{ active_select: isActive('LocalName') }"
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
                                :class="{ active_select: isActive('GLSARCode') }"
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
                                :class="{ active_select: isActive('GLSARName') }"
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
                                :class="{ active_select: isActive('GLSAPCode') }"
                            />
                        </template>

                        

                         <!-- Header Template for GLSAPName -->
                         <template v-slot:[`header.GLSAPName`]="{ header }">
                            <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedGLSAPName"
                                :select-items="selectOptionsForColumn('GLSAPName')"
                                @update:selectedValue="updateSelectedGLSAPName"
                                @search="HeaderSelect>searchCompanies('GLSAPName', $event)"
                                :class="{ active_select: isActive('GLSAPName') }"
                            />
                        </template>

                         <!-- Header Template for SpecialGL -->
                         <template v-slot:[`header.SpecialGL`]="{ header }">
                        <HeaderSelect
                            :header-text="header.text"
                            :selected-value="selectedSpecialGL"
                            :select-items="selectOptionsForColumn('SpecialGL')"
                            @update:selectedValue="updateSelectedSpecialGL"
                            @search="searchCompanies('SpecialGL', $event)"
                            @sort="handleSort('SpecialGL', $event)"
                            :class="{ active_select: isActive('SpecialGL') }"
                        />
                        </template>

                          <!-- Header Template for SpecialGLName -->
                          <template v-slot:[`header.SpecialGLName`]="{ header }">
                            <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedSpecialGLName"
                                :select-items="selectOptionsForColumn('SpecialGLName')"
                                @update:selectedValue="updateSelectedSpecialGLName"
                                @search="searchCompanies('SpecialGLName', $event)"
                                @sort="handleSort('SpecialGLName', $event)"
                                :class="{ active_select: isActive('SpecialGLName') }"
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

                        <template v-slot:[`header.PostingKey2`]="{ header }">
                            <HeaderSelect
                                :header-text="header.text"
                                :selected-value="selectedPostingKey2"
                                :select-items="selectOptionsForColumn('PostingKey2')"
                                @update:selectedValue="updateSelectedPostingKey2"
                                @sort="handleSort('PostingKey2', $event)"
                                :class="{ active_select: isActive('PostingKey2') }"
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

        components: {
            SelectCompanyCode, 
            SelectSystemCode, 
            InputSearch, 
            InputSearchHN, 
            HeaderSelect
        },

        data: () => ({
            tab: null,
            tabs: [{ name: 'Create/Change' },{ name: 'Export' }],
            menu: false,
            search: '',
            valid:true,
            loading: true,
            dataHNReceive : [],
            selectedItemHNOne: {},
            selectedItemHNTwo: {},
            selectedItemGLSAR:{},
            selectedItemGLSAP: {},
            selectedItemSpecialGL: {},
            filteredData: [],
            // select export //
            selectedCompanyCode: [],
            selectedSystemCode: [],
            selectedHNReceiveCode: [],
            selectedHNReceiveName: [],
            selectedGLSARCode: [],
            selectedGLSARName: [],
            selectedGLSAPCode: [],
            selectedGLSAPName: [],
            selectedSpecialGL: [],
            selectedSpecialGLName: [],
            selectedPostingKey: [],
            selectedPostingKey2: [],
            selectedDate: [],
            posting_key: null,
            posting_key2: null,
            // select export //
            isError: false,
            validationRules: [v => !!v || ''],
            headersDataHNActivity: [
                { text: 'Company Code', align: 'center', sortable: false, value: 'CompanyCode' },
                { text: 'System Code', align: 'center', sortable: false, value: 'SystemCode' },
                { text: 'HNReceive Code', align: 'center', sortable: false, value: 'HNReceiveCode' },
                { text: 'HNReceive Name', align: 'center', sortable: false, value: 'LocalName' },
                { text: 'GLSAR Code', align: 'center', sortable: false, value: 'GLSARCode' },
                { text: 'GLSAR Name', align: 'center', sortable: false, value: 'GLSARName' },
                { text: 'GLSAP Code', align: 'center', sortable: false, value: 'GLSAPCode' },
                { text: 'GLSAP Name', align: 'center', sortable: false, value: 'GLSAPName' },
                { text: 'SpecialGL', align: 'center', sortable: false, value: 'SpecialGL' },
                { text: 'SpecialGL Name', align: 'center', sortable: false, value: 'SpecialGLName' },
                { text: 'Posting Key', align: 'center', sortable: false, value: 'PostingKey' },
                { text: 'Posting Key2', align: 'center', sortable: false, value: 'PostingKey2' },
                { text: 'Delete', align: 'center', sortable: false, value: 'Action' },
            ],
            headersExport: [
                { text: 'Company Code', align: 'center', sortable: false, value: 'CompanyCode' },
                { text: 'System Code', align: 'center', sortable: false, value: 'SystemCode' },
                { text: 'HNReceive Code', align: 'center', sortable: false, value: 'HNReceiveCode' },
                { text: 'HNReceive Name', align: 'center', sortable: false, value: 'LocalName' },
                { text: 'GLSAR Code', align: 'center', sortable: false, value: 'GLSARCode' },
                { text: 'GLSAR Name', align: 'center', sortable: false, value: 'GLSARName' },
                { text: 'GLSAP Code', align: 'center', sortable: false, value: 'GLSAPCode' },
                { text: 'GLSAP Name', align: 'center', sortable: false, value: 'GLSAPName' },
                { text: 'SpecialGL', align: 'center', sortable: false, value: 'SpecialGL' },
                { text: 'SpecialGL Name', align: 'center', sortable: false, value: 'SpecialGLName' },
                { text: 'Posting Key', align: 'center', sortable: false, value: 'PostingKey' },
                { text: 'Posting Key2', align: 'center', sortable: false, value: 'PostingKey2' },
                { text: 'Update Date Time', align: 'center', sortable: false, value: 'UpdateDateTime' },
        
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

            selectedGLSAPName: {
                handler() {
                    this.filterData();
                },
                deep: true,
            },

            selectedSpecialGL: {
                handler() {
                    this.filterData();
                },
                deep: true,
            },

            selectedSpecialGLName: {
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

            selectedPostingKey2: {
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
            updateSelectedHNReceiveCode(value) {
                this.selectedHNReceiveCode = value;
            },

            updateSelectedHNReceiveName(value) {
                this.selectedHNReceiveName = value;
            },

            updateSelectedGLSARCode(value) {
                this.selectedGLSARCode = value;
            },

            updateSelectedGLSARName(value) {
                this.selectedGLSARName = value;
            },

            updateSelectedGLSAPCode(value) {
                this.selectedGLSAPCode = value;
            },

            updateSelectedGLSAPName(value) {
                this.selectedGLSAPName = value;
            },

            updateSelectedSpecialGL(value) {
                this.selectedSpecialGL = value;
            },

            updateSelectedSpecialGLName(value) {
                this.selectedSpecialGLName = value;
            },

            updateSelectedPostingKey(value) {
                this.selectedPostingKey = value;
            },
            
            updateSelectedPostingKey2(value) {
                this.selectedPostingKey2 = value;
            },
            
            updateSelectedDate(value) {
                this.selectedDate = value;
            },

            // Active column fiter export
            isActive(column) {
                if(column === 'CompanyCode'){
                    return this.selectedCompanyCode.length > 0;
                }else if (column === 'SystemCode'){
                    return this.selectedSystemCode.length > 0;
                }else if (column === 'HNReceiveCode') {
                    return this.selectedHNReceiveCode.length > 0;
                }else if (column === 'LocalName') {
                    return this.selectedHNReceiveName.length > 0;
                }else if(column === 'GLSARCode'){
                    return this.selectedGLSARCode.length > 0;
                }else if(column === 'GLSARName'){
                    return this.selectedGLSARName.length > 0;
                }else if (column === 'GLSAPCode'){
                    return this.selectedGLSAPCode.length > 0;
                }else if (column === 'GLSAPName'){
                    return this.selectedGLSAPName.length > 0;
                }else if(column === 'SpecialGL'){
                    return this.selectedSpecialGL.length > 0;
                }else if(column === 'SpecialGLName'){
                    return this.selectedSpecialGLName.length > 0;
                }else if(column === 'PostingKey'){
                    return this.selectedPostingKey.length > 0;
                }else if(column === 'PostingKey2'){
                    return this.selectedPostingKey2.length > 0;
                }
                return false;
            },

            exportToExcel() {
                const datas = this.filteredData.map(item => ({
                    "Company Code": item.CompanyCode,
                    "System Code": item.SystemCode,
                    "HNReceive Code": item.HNReceiveCode,
                    "HNReceive Name": item.LocalName,
                    "GLSAR Code": item.GLSARCode,
                    "GLSAR Name": item.GLSARName,
                    "GLSAP Code": item.GLSAPCode,
                    "GLSAP Name": item.GLSAPName,
                    "SpecialGL": item.SpecialGL,
                    "SpecialGL Name": item.SpecialGLName,
                    "Posting Key": item.PostingKey,
                    "Posting Key2": item.PostingKey2,
                }));

                
                const fileName = 'CashAndGL.xlsx';
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
                (this.selectedHNReceiveCode.length === 0 || this.selectedHNReceiveCode.includes(item.HNReceiveCode)) &&
                (this.selectedHNReceiveName.length === 0 || this.selectedHNReceiveName.includes(item.LocalName)) &&
                (this.selectedGLSARCode.length === 0 || this.selectedGLSARCode.includes(item.GLSARCode)) &&
                (this.selectedGLSARName.length === 0 || this.selectedGLSARName.includes(item.GLSARName)) &&
                (this.selectedGLSAPCode.length === 0 || this.selectedGLSAPCode.includes(item.GLSAPCode)) &&
                (this.selectedGLSAPName.length === 0 || this.selectedGLSAPName.includes(item.GLSAPName)) &&
                (this.selectedSpecialGL.length === 0 || this.selectedSpecialGL.includes(item.SpecialGL)) &&
                (this.selectedSpecialGLName.length === 0 || this.selectedSpecialGLName.includes(item.SpecialGLName)) &&
                (this.selectedPostingKey.length === 0 || this.selectedPostingKey.includes(item.PostingKey)) &&
                (this.selectedPostingKey2.length === 0 || this.selectedPostingKey2.includes(item.PostingKey2)) &&
                (this.selectedDate.length === 0 || this.selectedDate.includes(item.UpdateDateTime))
                );
            },

            clearData(){
                this.$refs.formMapping.resetValidation()
                this.$refs.selectHNReceive.resetValidation()
                this.$refs.selectHNReceive.clearTextField()
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

            async removeCashGL(value){

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

                        try {
                            let FlagHNReceivePath       =   `/api/SAP/FlagCashAndGL?HNReceiveCode=${value.HNReceiveCode}&DFLAG=1`
                            await this.$axios.get(`${FlagHNReceivePath}`)

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

                    this.checkInputData('HNReceive Code', this.$refs.HNReceiveField)
                
                }else{
                    try {
                        this.loading                = await true
                        let GetTmCashAndGLIDPath    = `/api/SAP/CashAndGL/GetTmCashAndGLID?HNReceiveCode=${this.selectedItemHNOne.Code}`
                        let response                = await this.$axios.get(GetTmCashAndGLIDPath);
                        this.dataHNReceive          = response.data;


                    } catch (error) {
                        this.loading = await false
                        console.error('Error fetching data:', error);
                    }
                }

            },

            async MappingCashGL(){

                // เช็ค value
                if(this.$refs.formMapping.validate()){

                    // เช็คค่าใน Table Mapping กับค่าที่จะ Mapping
                    if(this.dataHNReceive.length > 0){

                        const HNReceive             = this.dataHNReceive[0].HNReceiveCode
                        const selectedHNReceive     = this.selectedItemHNTwo.Code

                        const GLSAR                 = this.dataHNReceive[0].GLSARCode
                        const selectedItemGLSAR     = this.selectedItemGLSAR.GLNo

                        const GLSAP                 = this.dataHNReceive[0].GLSAPCode
                        const selectedItemGLSAP     = this.selectedItemGLSAP.GLNo
                        
                        const SpecialGL             = this.dataHNReceive[0].SpecialGL
                        const selectedItemSpecialGL  = this.selectedItemSpecialGL.GLNo

                        const selectCompanyCode     = this.$refs.selectCompanyCode.selecItem;
                        const selectSystemCode      = this.$refs.selectSystemCode.selecItem;

                         // เช็คค่า HNActivity GLSAPCodeIPD และ GLSAPCodeOPD เหมือนกัน จะเข้าเงื่อนไข if
                        const checkRecord = (

                            HNReceive === selectedHNReceive &&
                            GLSAR === selectedItemGLSAR &&
                            GLSAP === selectedItemGLSAP && 
                            SpecialGL === selectedItemSpecialGL

                        );

                        const resultRecord = checkRecord ? true : false;

                        const MappingCashGLPath     = `/api/SAP/CashAndGL/MappingCashGL`

                        const fd  = {
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
                            "specialGL":this.selectedItemSpecialGL.GLNo === undefined ? '' : this.selectedItemSpecialGL.GLNo,
                            "specialGLName": this.selectedItemSpecialGL.GLDes === undefined ? '' : this.selectedItemSpecialGL.GLDes,
                            // "specialGL":this.selectedItemSpecialGL.GLDes,
                        }

                         // globalMixin.js
                        this.MappingData(resultRecord, MappingCashGLPath, fd)

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