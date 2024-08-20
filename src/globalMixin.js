// globalMixin.js

import Vue from 'vue';
Vue.mixin({

  data: () => ({
    tab: null, // Selected tab
    tabs: [
        { name: 'Create/Change' },
        { name: 'Export' },
    ],
    valid:true,
    checkData: [],
    selectedItemHNOne: {},
    datasExport : [],
    selectedCompanyCode: [], 
    selectedSystemCode: [], 
    currentTab: null
  }),

  methods: {

    // เปิด get select data dailog
      /* Payment Term */
    getselectedTermPayment(data) {
      this.selectedItemTermPayment = data;
    },

    getselectedTermPayment2(data) {
      this.selectedItemTermPayment2 = data;
    },

    getselectedTermPaymentSAP(data){
        this.selectedItemTermPaymentSAP = data;
    },

    /* Account Group */
    getselectedItemAccGroup(data) {
      this.selectedItemAccGroup = data;
    },

    getselectedItemAccGroupTwo(data) {
        this.selectedItemAccGroupTwo = data;
    },

    getselectedItemKTOKK(data) {
        this.selectedItemKTOKK = data;
    },

    getselectedItemAR_AKONT(data){
        this.selectedItemAR_AKONT = data;
    },

    getselectedItemAP_AKONT(data){
        this.selectedItemAP_AKONT = data;
    },

    /* Activity / CashAndGL */
    getselectedItemHNOne(data) {
        this.selectedItemHNOne = data;
    },
    /* Activity / CashAndGL */
    getselectedItemHNTwo(data) {
        this.selectedItemHNTwo = data;
    },
    getselectedItemGLOPD(data){
        this.selectedItemGLOPD = data;
    },
    getselectedItemGLIPD(data){
        this.selectedItemGLIPD = data;
    },

    /* CashAndGL */
    getselectedItemGLSAR(data) {
      this.selectedItemGLSAR = data;
    },

    getselectedItemGLSAP(data){
        this.selectedItemGLSAP = data;
    },
    getselectedItemSpecialGL(data){
        this.selectedItemSpecialGL = data;
    },

    /* Employee Status */
    getselectedItemEmpStatus(data) {
      this.selectedItemEmpStatus = data;
    },

    getselectedItemActiveStatusSSB(data) {
      this.selectedItemActiveStatusSSB = data;

    },

    getselectedItemActiveStatusSAP(data){
        this.selectedItemActiveStatusSAP = data;
    },

    // ปิด get select data dailog

    updateSelectedSystemCode(value) {
      this.selectedSystemCode = value;
    },

    updateSelectedCompanyCode(value) {
      this.selectedCompanyCode = value;
    },

    formatDate(value) {
      return this.$moment(value).format("DD-MM-YYYY HH:mm:ss")
    },

    selectOptionsForColumn(columnName) {
      let filteredOptions = this.filteredData;
      // let filteredOptions = this.datasExport;

      let searchTerm = '';
    
      switch (columnName) {

        case columnName:
          searchTerm = this[columnName];
        break;
        default:
        searchTerm = '';
        break;

    
      }
    
      if (searchTerm) {
        const searchTermLowerCase = searchTerm.toLowerCase();
        filteredOptions = filteredOptions.filter(item =>
            item[columnName]?.toLowerCase()?.includes(searchTermLowerCase)
        );
      }

      const allValues = filteredOptions.map(item => ({
        text: item[columnName],
        value: item[columnName],
      })).filter(value => value.value != null && value.value !== '');
 
      // const allValues = filteredOptions.map(item => ({
      //     text: item[columnName],
      //     value: item[columnName],
      // }));

      // Remove duplicates based on 'value'
      const uniqueValues = allValues.filter((value, index, self) =>
          index === self.findIndex(t => t.value === value.value)
      );


      return uniqueValues;
    },

    // sort ASC / DESC
    handleSort(column, desc) {
      this.sortColumn = column;
      this.sortDesc = desc;
      this.sortData(column, desc);
    },

    // sort ASC / DESC
    sortData(column, sortOrder) {
        // Clone the array to avoid mutating the original data
        let sortedData = [...this.filteredData];

        sortedData.sort((a, b) => {
            // Extract values from objects
            let valueA = a[column];
            let valueB = b[column];

            // Handle undefined or null values
            if (valueA === undefined || valueA === null) return -1;
            if (valueB === undefined || valueB === null) return 1;

            // Compare values based on sort order
            if (sortOrder === 'asc') {
            // Ascending order
            if (valueA > valueB) return 1;
            if (valueA < valueB) return -1;
            } else if (sortOrder === 'desc') {
            // Descending order
            if (valueA > valueB) return -1;
            if (valueA < valueB) return 1;
            }

            return 0; // Values are equal
        });

        // Update filteredData with the sorted array
        
        this.filteredData = sortedData;
    },


    // funtion clear input
    handleClearData(value, field) {

      switch(field){
        case field: 
        this[value] = {}
      }

    },

    // function Click Tab
    handleTabClick(tab, url) {
      this.currentTab = tab.name;
      switch (tab.name) {
        case "Create/Change":
            break;
        case "Export":
            this.getExportData(`${url}`)
          
            break;
        default:
            // Default action
            break;
      }
    },
  
    // function Check input 
    checkInputData(title, inputField){
      this.$swal.fire({
          icon: 'warning',
          title: `กรุณาเลือก ${title}` ,
      // text: message
      }).then(() => {
          const input = inputField.$el.querySelector('input');
          input.focus();
      });
    },

    // function Check ตัวอักษร
    handleInput(field) {
      if (this[field] !== null && this[field] !== undefined) {
        this[field] = this[field].replace(/[^0-9]/g, '');
      }
    },
  

    // API Data Export
    async getExportData(url){
   
      
      try {
        this.loading        = await true
        let response        = await this.$axios.get(`${url}`);
        setTimeout(() => {
            this.loading = false;
            this.datasExport = response.data;

            // this.filteredData = [...this.datasExport];
            this.filteredData = this.datasExport.slice();

            // this.filteredData = this.filteredData.map(item => ({
            //   ...item,
            //   UpdateDateTime: this.formatDate(item.UpdateDateTime) // Assuming each item has a 'date' field
            // }));
            
            // console.log(this.filteredData);
            
        }, 300);
      } catch (error) {
        this.loading = await false
      }
    },

    // API Mapping
    async MappingData(checkRecord, MappingPath, data){

      // ข้อมูลใน Table Mapping ซ้ำกับค่าที่จะ Map ทุกกรณี
      if(checkRecord){
        this.$swal.fire({
          icon: "error",
          title: "Incomplete",
          text: "Record already exists",
          customClass: {
              title: 'text-error'
          }
        }).then((result) => {
            if (result.isConfirmed) {
                this.isError = true
            }
        });
      }else{
          await this.$swal.fire({
              title: "Warning",
              text: 'Record already exists. "Are you sure you want to save?"',
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#52A1DB",
              cancelButtonColor: "#52A1DB",
              confirmButtonText: "OK",
              customClass: {
                  title: 'text-warning'
              }
          }).then(async(result) => {
              if (result.isConfirmed) {
                  try {
                      // API
                      await this.$axios.post(`${MappingPath}`, data)

                      this.$swal.fire({
                          icon: 'success',
                          title: 'Complete',
                          text: 'Your data was saved.',
                          customClass: {
                          title: 'text-success',
                          },
                      }).then((result) => {
                          if (result.isConfirmed) {
                              this.clearData();
                              this.checkMapping()
                          }
                      });

                  } catch (error) {
                      this.$swal.fire({
                          icon: "error",
                          title: "Incomplete",
                          text: "Unable to update . Please check data agian.",
                          customClass: {
                              title: 'text-error'
                          }
                      });
                  }

              }

          });
      }
    },


  }

});
