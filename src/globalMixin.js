// globalMixin.js

import Vue from 'vue';
// import * as XLSX from 'xlsx';
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

    searchCompanyCode: '',
    searchSystemCode: '',
    searchDescription: '',
    searchLocalName: '', 

    // HNActivity
    // searchHNActivityCode: '', 
    
    // searchGLOPDCode: '',
    // searchGLOPDName: '',
    // searchGLIPDCode: '',
    // searchGLIPDName: '',
    HNActivityCode: '', 
    
    GLOPDCode: '',
    GLOPDName: '',
    GLIPDCode: '',
    GLIPDName: '',

    //CashAndGL
    searchHNReceiveCode: '', 
    searchHNReceiveName: '', 
    searchGLSARCode: '',
    searchGLSARName: '',
    searchGLSAPCode: '',
    searchGLSAPName: '',
    searchSpecialGL: '',
    searchSpecialGLName: '',
    searchPostingKey: '',

    // ArPaymentTerm
    searchTermPayment: '', 
    searchTermPaymentDes: '', 
    searchTermPaymentSAP: '',

    // ARAccountGroup
    searchDescriptionTwo: '',
    searchARComposeCategory: '', 
    searchKTOKK: '',
    searchARAKONT: '',

    // EmployeeStatus
    searchActiveStatusCode: '',
    searchSTAT2: '',


    selectedCompanyCode: [], 
    selectedSystemCode: [], 



  }),

  methods: {

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

    getselectedItemAccGroup2(data) {
        this.selectedItemAccGroup2 = data;
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

    /* Activity */
    getselectedItemHNOne(data) {
        this.selectedItemHNOne = data;
    },
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

    updateSelectedSystemCode(value) {
      this.selectedSystemCode = value;
    },

    updateSelectedCompanyCode(value) {
      this.selectedCompanyCode = value;
    },

    // exportToExcel(value, file_name) {
    //     const fileName = file_name + '.xlsx'
    //     const wb = XLSX.utils.book_new();
    //     const ws = XLSX.utils.json_to_sheet(value);
    //     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    //     /* generate XLSX file and send to client */
    //     XLSX.writeFile(wb, fileName);
    // },

    selectOptionsForColumn(columnName) {
      let filteredOptions = this.datasExport;

      let searchTerm = '';

      console.log(columnName);
      // Determine which search term to use based on the column name
      switch (columnName) {

        case columnName:
          searchTerm = this[columnName];
        break;

   


        // case 'SystemCode':
        //   searchTerm = this.searchSystemCode;
        // break;

        // case 'LocalName': // HNActivity, CashAndGL
        //   searchTerm = this.searchLocalName;
        // break;

        // case 'Description': // ArPaymentTerm
        //   searchTerm = this.searchDescription;
        // break;

        // case 'HNActivityCode': // HNActivity
        //   searchTerm = this.searchHNActivityCode;
        // break;
        
        // case 'GLSAPCodeOPD': // HNActivity
        //   searchTerm = this.searchGLOPDCode;
        // break;
      
        // case 'GLSAPNameOPD': // HNActivity
        //   searchTerm = this.searchGLOPDName;
        // break;
        
        // case 'GLSAPCodeIPD': // HNActivity
        //   searchTerm = this.searchGLIPDCode;
        // break;
        
        // case 'GLSAPNameIPD': // HNActivity
        //   searchTerm = this.searchGLIPDName;
        // break;
        
        // case 'HNReceiveCode': // CashAndGL
        //   searchTerm = this.searchHNReceiveCode;
        // break;
        
        // case 'GLSARCode': // CashAndGL
        //   searchTerm = this.searchGLSARCode;
        // break;
        
        // case 'GLSARName': // CashAndGL
        //   searchTerm = this.searchGLSARName;
        // break;
        
        // case 'GLSAPCode': // CashAndGL
        //   searchTerm = this.searchGLSAPCode;
        // break;

        // case 'GLSAPName': // CashAndGL
        // searchTerm = this.searchGLSAPName;
        // break;
        
        // case 'SpecialGL': // CashAndGL
        //   searchTerm = this.searchSpecialGL;
        // break;
        // case 'SpecialGLName': // CashAndGL
        //   searchTerm = this.searchSpecialGLName;
        // break;

        // case 'TermOfPayment': // ArPaymentTerm
        //   searchTerm = this.searchTermPayment;
        // break;

        // case 'TermOfPaymentDes': // ArPaymentTerm
        //   searchTerm = this.searchTermPaymentDes;
        // break;

        // case 'TermOfPaymentSAP': // ArPaymentTerm
        //   searchTerm = this.searchTermPaymentSAP;
        // break;
      
        // case 'ARComposeCategory': // ARAccountGroup
        //   searchTerm = this.searchARComposeCategory;
        // break;

        // case 'KTOKK': // ARAccountGroup
        //   searchTerm = this.searchKTOKK;
        // break;

        // case 'DescriptionTwo': // ARAccountGroup
        //   searchTerm = this.searchDescriptionTwo;
        // break;

        // case 'ARAKONT': // ARAccountGroup
        //   searchTerm = this.searchARAKONT;
        // break;

        // case 'ActiveStatusCode': // EmployeeStatus
        //   searchTerm = this.searchActiveStatusCode;
        // break;

        // case 'STAT2': // EmployeeStatus
        //   searchTerm = this.searchSTAT2;
        // break;

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
      }));

      // Remove duplicates based on 'value'
      const uniqueValues = allValues.filter((value, index, self) =>
          index === self.findIndex(t => t.value === value.value)
      );


      return uniqueValues;
    },

    
    // searchCompanies(columnName, searchTerm) {

    //   switch (columnName) {

        
    //     // case columnName:
    //     //   searchTerm = this[columnName];
    //     // break;

    //     case 'CompanyCode':
    //       this.searchCompanyCode = searchTerm;
    //     break;
    //     case 'SystemCode':
    //       this.searchSystemCode = searchTerm;
    //     break;
    //     case 'LocalName': // HNActivity, CashAndGL
    //       this.searchLocalName = searchTerm;
    //     break;
    //     case 'Description': 
    //       searchTerm = this.searchDescription;
    //     break;

    //     case 'HNActivityCode': // HNActivity
    //       this.searchHNActivityCode = searchTerm;
    //     break;
        
    //     case 'GLSAPCodeOPD': // HNActivity
    //       this.searchGLOPDCode = searchTerm;
    //     break;
      
    //     case 'GLSAPNameOPD': // HNActivity
    //       this.searchGLOPDName = searchTerm;
    //     break;
        
    //     case 'GLSAPCodeIPD': // HNActivity
    //       this.searchGLIPDCode = searchTerm; 
    //     break;
        
    //     case 'GLSAPNameIPD': // HNActivity
    //       this.searchGLIPDName = searchTerm;  
    //     break;
        
    //     case 'HNReceiveCode': // CashAndGL
    //       this.searchHNReceiveCode = searchTerm ;
    //     break;
        
    //     case 'GLSARCode': // CashAndGL
    //       this.searchGLSARCode = searchTerm;
    //     break;
        
    //     case 'GLSARName': // CashAndGL
    //       this.searchGLSARName = searchTerm;
    //     break;
        
    //     case 'GLSAPCode': // CashAndGL
    //       this.searchGLSAPCode = searchTerm;
    //     break;

    //     case 'GLSAPName': // CashAndGL
    //     this.searchGLSAPName = searchTerm;
    //     break;
      
    //     case 'SpecialGL': // CashAndGL
    //       this.searchSpecialGL = searchTerm;
    //     break;

    //     case 'SpecialGLName': // CashAndGL
    //       this.searchSpecialGLName = searchTerm;
    //     break;

    //     case 'TermOfPayment': // ArPaymentTerm
    //       this.searchTermPayment = searchTerm;
    //     break;

    //     case 'TermOfPaymentDes': // ArPaymentTerm
    //       this.searchTermPaymentDes = searchTerm;
    //     break;

    //     case 'TermOfPaymentSAP': // ArPaymentTerm
    //       this.searchTermPaymentSAP = searchTerm;
    //     break;
      
    //     case 'ARComposeCategory': // ARAccountGroup
    //       this.searchARComposeCategory = searchTerm;
    //     break;

    //     case 'KTOKK': // ARAccountGroup
    //       this.searchKTOKK = searchTerm;
    //     break;

    //     case 'DescriptionTwo': // ARAccountGroup
    //       this.searchDescriptionTwo = searchTerm;
    //     break;

    //     case 'ARAKONT': // ARAccountGroup
    //       this.searchARAKONT = searchTerm;
    //     break;

    //     case 'ActiveStatusCode': // EmployeeStatus
    //       this.searchActiveStatusCode = searchTerm;
    //     break;

    //     case 'STAT2': // EmployeeStatus
    //       this.searchSTAT2 = searchTerm;
    //     break;

    //     default:
    //     break;
    //   }
      
    //   this.filterData();
    // },

    handleSort(column, desc) {
      this.sortColumn = column;
      this.sortDesc = desc;
      this.sortData(column, desc);
    },

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

    handleDataUpdated(updatedValue, dataUpdate) {

      switch(dataUpdate){
        case "G/L OPD": 
        this.selectedItemGLOPD = {}
    
        break;
        case "G/L IPD" :
        this.selectedItemGLIPD = {}
        break;

        case "ActivityOne" :
        this.selectedItemHNOne = {}
    
        break;

        case "ActivityTwo" :
          this.selectedItemHNTwo = {}
        break;

        case "TermPayment" :
          this.selectedItemTermPayment = {}
        break;

        case "TermPayment2" :
          this.selectedItemTermPayment3 = {}
        break;

        case "TermPaymentSAP" :
          this.selectedItemTermPaymentSAP = {}
        break;

        case "AccountGroup" :
          this.selectedItemAccGroup = {}
        break;

        case "AccountGroup2" :
          this.selectedItemAccGroup = {}
        break;

        case "KTOKK" :
          this.selectedItemKTOKK = {}
        break;

        case "AR_AKONT" :
          this.selectedItemAR_AKONT = {}
        break;

        case "AP_AKONT" :
          this.selectedItemAP_AKONT = {}
        break;

        case "EmployeeStatus" :
          this.selectedItemEmpStatus = {}
        break;
        case "ActiveStatusSSB" :
          this.selectedItemActiveStatusSSB = {}
        break;

        case "ActiveStatusSAP" :
          this.selectedItemActiveStatusSAP = {}
        break;

        case "ReceiveOne": 

        this.selectedItemHNOne = {}
    
        break;
        case "ReceiveTwo" :
        this.selectedItemHNTwo = {}
        break;

        case "GLSAR" :
        this.selectedItemGLSAR = {}
    
        break;

        case "GLSAP" :
        this.selectedItemGLSAP = {}
    
        break;

        case "SpecialGL" :
        this.selectedItemSpecialGL = {}
        break;

        // case "HN Activity" :
        // this.selectedItemHNTwo = {}
        // break;

        default:
        // Default action
        break;
      }
    },

    handleTabClick(tab, url) {
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

    async getExportData(url){
      try {
        this.loading        = await true
        let response        = await this.$axios.get(`${url}`);
        setTimeout(() => {
            this.loading = false;
            this.datasExport = response.data;
            this.filteredData = this.datasExport.slice();

            // console.log(this.filteredData);
        }, 300);
      } catch (error) {
        this.loading = await false
          // console.error('Error fetching data:', error);
      }
    },

    handleInput(field) {
      // Replace non-numeric characters with an empty string
          this[field] = this[field].replace(/[^0-9]/g, '');
      },

    // เพิ่มเมทอดอื่น ๆ ที่คุณต้องการเรียกใช้ทุกหน้าได้ที่นี่
  }

});
