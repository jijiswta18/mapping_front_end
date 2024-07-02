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
      posting_key: null,
      posting_key2: null,
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
            searchTerm = this.searchARAKONT;
          break;

          case 'STAT2': // EmployeeStatus
            searchTerm = this.searchARAKONT;
          break;


          
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

   
    
    // เพิ่มเมทอดอื่น ๆ ที่คุณต้องการเรียกใช้ทุกหน้าได้ที่นี่
  }
});
