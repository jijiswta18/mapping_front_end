<template>
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

    <!-- Header Template for HNActivity Code -->
    <template v-slot:[`header.HNActivityCode`]="{ header }">
      <HeaderSelect
        :header-text="header.text"
        :selected-value="selectedHNActivity"
        :select-items="selectOptionsForColumn('HNActivityCode')"
        @update:selectedValue="updateSelectedHNActivity"
        @search="searchCompanies('HNActivityCode', $event)"
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
      />
    </template>

   
  </v-data-table>
</template>

<script>
import HeaderSelect from '@/components/HeaderSelect.vue';
// import axios from 'axios';

export default {
  components: {
    HeaderSelect,
  },
  data() {
    return {
      datasExport: [],
      filteredData: [],
      selectedCompanyCode: [], 
      selectedSystemCode: [], 
      selectedHNActivity: [],
      selectedHNActivityName: [],
      selectedGLOPDCode: [],
      selectedGLOPDName: [],
      selectedGLIPDCode: [],
      selectedGLIPDName: [],
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
      loading: false,
      searchCompanyCode: '', 
      searchSystemCode: '', 
      searchHNActivityCode: '', 
      searchHNActivityName: '', 
      searchGLOPDCode: '',
      searchGLOPDName: '',
      searchGLIPDCode: '',
      searchGLIPDName: '',
    };
  },
  mounted() {
    this.getExportActivityGL();
  },
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
    async getExportActivityGL() {
      try {
        this.loading = true;
        let ActivityGLPath = '/api/SAP/ActivityGL';
        let response = await this.$axios.get(ActivityGLPath);
        this.datasExport = response.data;
        this.filteredData = this.datasExport.slice();
        this.loading = false;
      } catch (error) {
        this.loading = false;
        console.error('Error fetching data:', error);
      }
    },
    selectOptionsForColumn(columnName) {
      let filteredOptions = this.datasExport;
      let searchTerm = '';

      // Determine which search term to use based on the column name
      switch (columnName) {
        case 'CompanyCode':
          searchTerm = this.searchCompanyCode;
          break;
        case 'SystemCode':
          searchTerm = this.searchSystemCode;
          break;
        case 'HNActivityCode':
          searchTerm = this.searchHNActivityCode;
          break;
        case 'LocalName':
          searchTerm = this.searchHNActivityName;
          break;
        case 'GLSAPCodeOPD':
          searchTerm = this.searchGLOPDCode;
          break;
        case 'GLSAPNameOPD':
          searchTerm = this.searchGLOPDName;
          break;
        case 'GLSAPCodeIPD':
          searchTerm = this.searchGLIPDCode;
          break;
        case 'GLSAPNameIPD':
          searchTerm = this.searchGLIPDName;
          break;
        // Add more cases for other columns if needed
        default:
          searchTerm = '';
          break;
      }

      if (searchTerm) {
        const searchTermLowerCase = searchTerm.toLowerCase();
        filteredOptions = filteredOptions.filter(item =>
          item[columnName].toLowerCase().includes(searchTermLowerCase)
        );
      }

      const allValues = filteredOptions.map(item => ({
        text: item[columnName],
        value: item[columnName],
      }));

      // Remove duplicates based on 'value'
      const uniqueValues = allValues.filter((value, index, self) =>
        index === self.findIndex(t => t.value === value.value)
      );

      return uniqueValues;
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
    updateSelectedCompanyCode(value) {
      this.selectedCompanyCode = value;
    },
    updateSelectedSystemCode(value) {
      this.selectedSystemCode = value;
    },
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
   
    searchCompanies(columnName, searchTerm) {
      if(columnName === 'CompanyCode'){
        this.searchCompanyCode = searchTerm;
      }else if (columnName === 'SystemCode') {
        this.searchSystemCode = searchTerm;
      }else if (columnName === 'HNActivityCode') {
        this.searchHNActivityCode = searchTerm;
      } else if (columnName === 'LocalName') {
        this.searchHNActivityName = searchTerm;
      } else if (columnName === 'GLSAPCodeOPD') {
        this.searchGLOPDCode = searchTerm;
        
      } else if (columnName === 'GLSAPNameOPD') {
        this.searchGLOPDName = searchTerm;
        
      } else if (columnName === 'GLSAPCodeIPD') {
        this.searchGLIPDCode = searchTerm;
        
      } else if (columnName === 'GLSAPNameIPD') {
        this.searchGLIPDName = searchTerm;
        
      }
      this.filterData();
    },
  },
};
</script>

<style scoped>
/* Your scoped styles */
</style>
