// globalMixin.js

import Vue from 'vue';
import * as XLSX from 'xlsx';
// import axios from "axios";
Vue.mixin({
    data: () => ({

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

   
    
    // เพิ่มเมทอดอื่น ๆ ที่คุณต้องการเรียกใช้ทุกหน้าได้ที่นี่
  }
});
