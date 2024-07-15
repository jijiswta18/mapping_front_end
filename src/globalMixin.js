// globalMixin.js

import Vue from 'vue';
import * as XLSX from 'xlsx';
// import axios from "axios";
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
      // posting_key: null,
      // posting_key2: null,

      searchCompanyCode: '',
      searchSystemCode: '',
      searchDescription: '',
      searchLocalName: '', 

      // HNActivity
      searchHNActivityCode: '', 
     
      searchGLOPDCode: '',
      searchGLOPDName: '',
      searchGLIPDCode: '',
      searchGLIPDName: '',

      //CashAndGL
      searchHNReceiveCode: '', 
      searchHNReceiveName: '', 
      searchGLSARCode: '',
      searchGLSARName: '',
      searchGLSAPCode: '',
      searchGLSpecialGL: '',

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


      // filteredData: [],
      // search: '',
    }),
  methods: {

    greetUser() {
      alert('Hello! Welcome to the application.');
    },

    exportToExcel(value, file_name) {
        const fileName = file_name + '.xlsx'
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(value);
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        /* generate XLSX file and send to client */
        XLSX.writeFile(wb, fileName);
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

        case 'LocalName': // HNActivity, CashAndGL
          searchTerm = this.searchLocalName;
        break;

        case 'Description': // ArPaymentTerm
          searchTerm = this.searchDescription;
        break;

        case 'HNActivityCode': // HNActivity
          searchTerm = this.searchHNActivityCode;
        break;
        
        case 'GLSAPCodeOPD': // HNActivity
          searchTerm = this.searchGLOPDCode;
        break;
      
        case 'GLSAPNameOPD': // HNActivity
          searchTerm = this.searchGLOPDName;
        break;
        
        case 'GLSAPCodeIPD': // HNActivity
          searchTerm = this.searchGLIPDCode;
        break;
        
        case 'GLSAPNameIPD': // HNActivity
          searchTerm = this.searchGLIPDName;
        break;
        
        case 'HNReceiveCode': // CashAndGL
          searchTerm = this.searchHNReceiveCode;
        break;
        
        case 'GLSARCode': // CashAndGL
          searchTerm = this.searchGLSARCode;
        break;
        
        case 'GLSARName': // CashAndGL
          searchTerm = this.searchGLSARName;
        break;
        
        case 'GLSAPCode': // CashAndGL
          searchTerm = this.searchGLSAPCode;
        break;
        
        case 'SpecialGL': // CashAndGL
          searchTerm = this.searchSpecialGL;
        break;

        case 'TermOfPayment': // ArPaymentTerm
          searchTerm = this.searchTermPayment;
        break;

        case 'TermOfPaymentDes': // ArPaymentTerm
          searchTerm = this.searchTermPaymentDes;
        break;

        case 'TermOfPaymentSAP': // ArPaymentTerm
          searchTerm = this.searchTermPaymentSAP;
        break;
      
        case 'ARComposeCategory': // ARAccountGroup
          searchTerm = this.searchARComposeCategory;
        break;

        case 'KTOKK': // ARAccountGroup
          searchTerm = this.searchKTOKK;
        break;

        case 'DescriptionTwo': // ARAccountGroup
          searchTerm = this.searchDescriptionTwo;
        break;

        case 'ARAKONT': // ARAccountGroup
          searchTerm = this.searchARAKONT;
        break;

        case 'ActiveStatusCode': // EmployeeStatus
          searchTerm = this.searchActiveStatusCode;
        break;

        case 'STAT2': // EmployeeStatus
          searchTerm = this.searchSTAT2;
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
    //   if (searchTerm) {
    //     const searchTermLowerCase = searchTerm.toLowerCase();
    
    //     console.log(searchTermLowerCase);
    //     filteredOptions = filteredOptions.filter(item => {
    //         const columnValue = item[columnName];
    //         if (columnValue && typeof columnValue === 'string') {
    //             return columnValue.toLowerCase().includes(searchTermLowerCase);
    //         }
    //         return false; // Skip items where columnName is null or not a string
    //     });
    // }

      // if (searchTerm) {
      //     const searchTermLowerCase = searchTerm.toLowerCase();

      //     console.log(searchTermLowerCase);
      //     filteredOptions = filteredOptions.filter(item =>
      //     item[columnName].toLowerCase().includes(searchTermLowerCase)
      //     );
      // }

      const allValues = filteredOptions.map(item => ({
          text: item[columnName],
          value: item[columnName],
      }));

      // Remove duplicates based on 'value'
      const uniqueValues = allValues.filter((value, index, self) =>
          index === self.findIndex(t => t.value === value.value)
      );

      // console.log('uniqueValues', uniqueValues);

      return uniqueValues;
    },

    
    searchCompanies(columnName, searchTerm) {

      switch (columnName) {
        case 'CompanyCode':
          this.searchCompanyCode = searchTerm;
        break;
        case 'SystemCode':
          this.searchSystemCode = searchTerm;
        break;
        case 'LocalName': // HNActivity, CashAndGL
          this.searchLocalName = searchTerm;
        break;
        case 'Description': 
          searchTerm = this.searchDescription;
        break;

        case 'HNActivityCode': // HNActivity
          this.searchHNActivityCode = searchTerm;
        break;
        
        case 'GLSAPCodeOPD': // HNActivity
          this.searchGLOPDCode = searchTerm;
        break;
      
        case 'GLSAPNameOPD': // HNActivity
          this.searchGLOPDName = searchTerm;
        break;
        
        case 'GLSAPCodeIPD': // HNActivity
          this.searchGLIPDCode = searchTerm; 
        break;
        
        case 'GLSAPNameIPD': // HNActivity
          this.searchGLIPDName = searchTerm;  
        break;
        
        case 'HNReceiveCode': // CashAndGL
          this.searchHNReceiveCode = searchTerm ;
        break;
        
        case 'GLSARCode': // CashAndGL
          this.searchGLSARCode = searchTerm;
        break;
        
        case 'GLSARName': // CashAndGL
          this.searchGLSARName = searchTerm;
        break;
        
        case 'GLSAPCode': // CashAndGL
          this.searchGLSAPCode = searchTerm;
        break;
        
        case 'SpecialGL': // CashAndGL
          this.searchSpecialGL = searchTerm;
        break;

        case 'TermOfPayment': // ArPaymentTerm
          this.searchTermPayment = searchTerm;
        break;

        case 'TermOfPaymentDes': // ArPaymentTerm
          this.searchTermPaymentDes = searchTerm;
        break;

        case 'TermOfPaymentSAP': // ArPaymentTerm
          this.searchTermPaymentSAP = searchTerm;
        break;
      
        case 'ARComposeCategory': // ARAccountGroup
          this.searchARComposeCategory = searchTerm;
        break;

        case 'KTOKK': // ARAccountGroup
          this.searchKTOKK = searchTerm;
        break;

        case 'DescriptionTwo': // ARAccountGroup
          this.searchDescriptionTwo = searchTerm;
        break;

        case 'ARAKONT': // ARAccountGroup
          this.searchARAKONT = searchTerm;
        break;

        case 'ActiveStatusCode': // EmployeeStatus
          this.searchActiveStatusCode = searchTerm;
        break;

        case 'STAT2': // EmployeeStatus
          this.searchSTAT2 = searchTerm;
        break;

        default:
        break;
      }
      
      this.filterData();
    },

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


  updateSelectedSystemCode(value) {
    console.log(value);
    this.selectedSystemCode = value;
  },

  updateSelectedCompanyCode(value) {
    console.log(value);
    this.selectedCompanyCode = value;
  },





   
    
    // เพิ่มเมทอดอื่น ๆ ที่คุณต้องการเรียกใช้ทุกหน้าได้ที่นี่
  }
});
