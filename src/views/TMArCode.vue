<template>
  <v-data-table
    :headers="headersExport"
    :items="filteredData"
    :loading="loading"
    density="compact"
    item-key="CompanyCode"
    :footer-props="{ 'items-per-page-options': [10, 25, 50, 100] }"
    class="style-table"
  >
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
          <template v-slot:prepend-item>
            <v-list-item>
              <v-list-item-content>
                <v-text-field
                  v-model="searchHNActivityCode"
                  placeholder="Search"
                  dense
                  outlined
                  single-line
                  clearable
                  @input="searchCompanies('HNActivityCode')"
                  append-icon="mdi-magnify"
                  class="input-search"
                ></v-text-field>
              </v-list-item-content>
            </v-list-item>
            <v-divider class="mt-2"></v-divider>
          </template>
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
          <template v-slot:prepend-item>
            <v-list-item>
              <v-list-item-content>
                <v-text-field
                  v-model="searchHNActivityName"
                  placeholder="Search"
                  dense
                  outlined
                  single-line
                  clearable
                  @input="searchCompanies('LocalName')"
                  append-icon="mdi-magnify"
                  class="input-search"
                ></v-text-field>
              </v-list-item-content>
            </v-list-item>
            <v-divider class="mt-2"></v-divider>
          </template>
        </v-select>
      </div>
    </template>

  </v-data-table>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      datasExport: [], // Original data array fetched from API
      filteredData: [], // Array to hold filtered data
      selectedHNActivity: [], // Selected HNActivityCode options
      selectedHNActivityName: [], // Selected LocalName options
      headersExport: [
        { text: 'Company Code', align: 'left', sortable: false, value: 'CompanyCode' },
        { text: 'System Code', align: 'left', sortable: false, value: 'SystemCode' },
        { text: 'HNActivity Code', align: 'left', sortable: false, value: 'HNActivityCode' },
        { text: 'HNActivity Name', align: 'left', sortable: false, value: 'LocalName' },
        { text: 'GL OPD Code', align: 'left', sortable: false, value: 'GLSAPCodeOPD' },
        { text: 'GL OPD Name', align: 'left', sortable: false, value: 'GLSAPNameOPD' },
        { text: 'GL IPD Code', align: 'left', sortable: false, value: 'GLSAPCodeIPD' },
        { text: 'GL IPD Name', align: 'left', sortable: false, value: 'GLSAPNameIPD' },
      ],
      loading: true,
      searchHNActivityCode: '', // Search term for HNActivity Code
      searchHNActivityName: '', // Search term for HNActivity Name
    };
  },
  created() {
    this.getExportActivityGL();
  },
  watch: {
    // Watcher for selectedHNActivity changes
    selectedHNActivity: {
      handler() {
        this.filterData();
      },
      deep: true,
    },
    // Watcher for selectedHNActivityName changes
    selectedHNActivityName: {
      handler() {
        this.filterData();
      },
      deep: true,
    },
  },
  methods: {
    // Method to fetch data from API
    async getExportActivityGL() {
      try {
        this.loading = true;
        let ActivityGLPath = '/api/SAP/ActivityGL';
        let response = await axios.get(ActivityGLPath);
        this.datasExport = response.data;
        this.filteredData = this.datasExport.slice(); // Initialize filteredData with fetched data
        this.loading = false;
      } catch (error) {
        console.error('Error fetching data:', error);
        this.loading = false;
        // Optionally, handle error and show UI feedback
      }
    },

    // Method to filter options based on search term and column name
    selectOptionsForColumn(columnName) {
      let filteredOptions = this.datasExport;

      // Filter options based on search term
      if (columnName === 'HNActivityCode' && this.searchHNActivityCode) {
        const searchTermLowerCase = this.searchHNActivityCode.toLowerCase();
        filteredOptions = filteredOptions.filter(item =>
          item[columnName].toLowerCase().includes(searchTermLowerCase)
        );
      } else if (columnName === 'LocalName' && this.searchHNActivityName) {
        const searchTermLowerCase = this.searchHNActivityName.toLowerCase();
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

    // Method to filter data based on selected options
    filterData() {
      this.filteredData = this.datasExport.filter(item =>
        (this.selectedHNActivity.length === 0 || this.selectedHNActivity.includes(item.HNActivityCode)) &&
        (this.selectedHNActivityName.length === 0 || this.selectedHNActivityName.includes(item.LocalName))
        // Add other filters as needed
      );
    },

    // Method to handle search input changes and filter accordingly
    searchCompanies(columnName) {
      if (columnName === 'HNActivityCode') {
        this.searchHNActivityCode = this.searchHNActivityCode.toLowerCase();
      } else if (columnName === 'LocalName') {
        this.searchHNActivityName = this.searchHNActivityName.toLowerCase();
      }
      this.filterData();
    },
  },
};
</script>

<style scoped>
.custom-v-select {
  margin: 0;
  padding: 0;
  display: inline-flex; /* Adjusted display property */
  flex: none;
}
::v-deep .custom-v-select .v-select__selections {
  display: none !important;
}
::v-deep .custom-v-select .v-input__append-inner {
  background-color: #ababab;
  cursor: pointer;
  padding: 0;
  margin: 0;
  border-radius: 4px;
}
::v-deep .v-text-field > .v-input__control > .v-input__slot:before {
  border-style: none;
}
::v-deep .custom-v-select .v-menu__content{
  min-width: 250px!important;
}
</style>
