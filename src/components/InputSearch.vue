<template>
    <div>
        <v-text-field
            v-model="selectedItem.GLNo"
            :rules="rules"
            append-icon="mdi-magnify"
            :label="label"
            dense
            outlined
            single-line
            hide-details="auto"
            clearable 
            @click:append="onClick"
            @click:clear="clearTextField"
            class="input-search"
            :class="{ 'text-danger': isError}"
        ></v-text-field>

        <v-dialog
            v-model="dialogSearch"
            persistent
            width="550"
            class="dialog-search"
            >
            <v-card>
                <v-toolbar class="head-toolbar">
                    <v-toolbar-title >{{ title }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="dialogClearSearch">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-container fluid class="py-6">
                    <v-row>
                        <v-col cols="4">
                            <span class="f-12">{{ code }}</span>
                        </v-col>
                        <v-col cols="8">
                            <v-text-field
                                v-model="searchCode"
                                dense
                                outlined
                                single-line
                                hide-details="auto"
                                clearable 
                                @click:clear="clearSearchCode"
                            ></v-text-field>

                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="4">
                            <span class="f-12">{{ name }}</span>
                        </v-col>
                        <v-col cols="8">
                            <v-text-field
                               v-model="searchName"
                                dense
                                outlined
                                single-line
                                hide-details="auto"
                                clearable 
                            ></v-text-field>

                        </v-col>
                    </v-row>


                </v-container>
               
                <div class="table-container">
                    <v-data-table
                        :headers="header"
                        :items="filteredData"
                        :search="search"
                        :loading="loading"
                        compact
                        item-key="name"
                        :footer-props="{ 'items-per-page-options': [10, 25, 50, 100] }"
                        class="dialog-table"
                      
                    >

                    <template v-slot:item="{ item, props }">
                        <tr
                            v-bind="props"
                            :class="{ 'active-row': rowItem && rowItem.GLNo === item.GLNo }"
                            @click="selectRow(item)"
                        >
                            <td>{{ item.GLNo }}</td>
                            <td>{{ item.GLDes }}</td>
                        </tr>
                    </template>

                    <template v-slot:footer>
                     <div class="text-right pr-3 pt-3 border-top">
                        <v-btn @click="selectRowData" color="primary">OK</v-btn>
                     </div>
                    </template>
          
           </v-data-table>
                       
                </div>
               

            
            </v-card>
        </v-dialog>

    </div> 
</template>

<script>
    export default{
        props:{
            rules: {
                type: Array,
                default: () => []
            },
            title:String,
            label:String,
            code:String,
            name:String,
            type:String,
            isError: Boolean,
            dataUpdate:String
            
        },
        data: () => ({
            search: '',
            dialogSearch: false,
            selectData: [],
            loading: true,
            header: [],
            dataCode: null,
            dataName: null,
            select : {},
            selectedItem: {GLNo: '', GLDes: ''},
            textFieldValue: '',
            textFieldClass: '',
            searchCode:'',
            searchName:'',
            rowItem: null,
        }),
        mounted() {
            this.generateHeader(); 
        },
        computed: {
            filteredData() {

                return this.selectData.filter(item => {
                    // Ensure item.Code and item.LocalName are strings
                    const code = (item.GLNo || '').toLowerCase();
                    const name = (item.GLDes || '').toLowerCase();

                    const codeMatch = !this.searchCode || this.searchCheck(code, this.searchCode.toLowerCase());
                    const nameMatch = !this.searchName || this.searchCheck(name, this.searchName.toLowerCase());

                    return codeMatch && nameMatch;
                });

            }
        },
        methods:{
    
            generateHeader() {
                this.header = [
                    { text: `${this.code}`, align: 'left', sortable: true, value: 'GLNo' },
                    { text: `${this.name}`, align: 'left', sortable: true, value: 'GLDes' }
                ];
            },
            selectRow(item) {
                this.rowItem = { ...item };
                // this.$emit('childEvent', item);
            },

            selectRowData(){
                if(this.rowItem){
                    this.selectedItem = this.rowItem
                    this.$emit('childEvent', this.rowItem)
                    this.dialogSearch = false
                }else{
                    this.$swal.fire({
                        title: "กรุณาเลือกรายการ",
                        icon: "question"
                    });
                }

            },
            
            searchCheck(inputString, searchTerm) {
                // Check if searchTerm starts and ends with *
                if (searchTerm.startsWith('*') && searchTerm.endsWith('*')) {
                    const term = searchTerm.substring(1, searchTerm.length - 1); // Remove the leading and trailing '*'
                    return inputString.includes(term);
                }

                // Check if the searchTerm starts with '*'
                if (searchTerm.startsWith('*')) {
                    const term = searchTerm.substring(1); // Remove the '*'
                    return inputString.endsWith(term);
                }
                // Check if the searchTerm ends with '*'
                else if (searchTerm.endsWith('*')) {
                    const term = searchTerm.slice(0, -1); // Remove the '*'
                    return inputString.startsWith(term);


                }
                // Exact match check
                else {
                    return inputString === searchTerm;
                }
                
            },
        
            onClick () {
                this.dialogSearch = true
                this.LoadData(this.selectedItem.GLNo)

            },

            async LoadData(code){
                try {
                    this.loading        = await true
                    let LoadDataPath    = null 

                    switch (this.type) {
                        case "GLSAP": 
                            setTimeout(() => {
                                this.loading = false;
                                this.selectData = [{ GLNo: 'SAPArCode', GLDes: 'SAPArCode',}]
                            }, 300);
                        break;

                        case "SapGL" :
                            LoadDataPath = '/api/SAP/SapGL'
                        break;

                        case "TermPaymentSAP" :
                            LoadDataPath = '/api/TermPaymentSAP'
                        break;

                        case "KTOKK" :
                            LoadDataPath = '/api/KTOKK'
                        break;
                        
                        case "AR_AKONT" :
                            LoadDataPath = '/api/AR_AKONT'
                        break;

                        case "AP_AKONT" :
                            LoadDataPath = '/api/AR_AKONT'
                        break;

                        default:
                            break;
                    }

                    let response        = await this.$axios.get(LoadDataPath);
                    
                    setTimeout(() => {
                        this.loading = false;
                        this.selectData = response.data;

                        // this.updateSelectOptions(response.data);

                        // this.selectData = data.map(item => ({
                        //     text: item.GLDes, // Or whatever field holds the display text
                        //     value: item.GLNo // Or whatever field holds the value
                        // }));


                        // this.selectData.text =  response.data.GLDes;
                        // this.selectData.value =  response.data.GLNo;

                        // console.log(this.selectData);
                        

                        this.findItemByCode(code);

                    }, 300);

                } catch (error) {
                    this.loading = false;
                }
            },

            updateSelectOptions(data) {
                // Assuming data.GLDes and data.GLNo are the new values
              
                this.selectData = data.map(item => ({
                    text: item.GLDes, // Or whatever field holds the display text
                    value: item.GLNo // Or whatever field holds the value
                }));

                console.log(this.selectData);
                
            },

            findItemByCode(code) {
                // Ensure selectData is an array
                if (!Array.isArray(this.selectData)) {
                console.error('selectData is not an array');
                return;
                }
                
                // Find the item with the specified code or LocalName
                this.rowItem = this.selectData.find(item => 
                item.GLNo === code || item.GLDes === code
                ) || null;

                // Ensure rowItem is found before accessing its properties
                if (this.rowItem) {
                this.searchCode = this.rowItem.GLNo;
                this.searchName = this.rowItem.GLDes;
                } else {
                // Handle case where no item is found
                this.searchCode = null;
                this.searchName = null;
                }

            },

            dialogClearSearch(){
                this.dialogSearch = false
                this.searchCode = ''
                this.searchName = ''
            },

            clearTextField() {
                this.selectedItem.Code = '';
                this.emitToPage();
            },
            clearSearchCode(){
                this.searchCode = '';
                this.searchName = '',
                this.rowItem = null
            },
            emitToPage() {
                this.$emit('data-updated', this.selectedItem.Code, this.dataUpdate);
            },

        }
    }
</script>

<style scoped>
    ::v-deep .table-container tr td{
        border-bottom: none!important;
    }

    
    ::v-deep .table-container tr {
       cursor: pointer;
    }

    ::v-deep .table-container tr td:first-child,
    ::v-deep .table-container tr th:first-child{
        border-right: 1px solid #D9D9D9;
    }

    ::v-deep .table-container .v-data-table__wrapper {
        height: auto;
        max-height: 300px;
        overflow: auto;
    }


    ::v-deep .table-container th {
        position: sticky;
        top: 0;
        background-color: white;
        z-index: 1;
        border-top: 1px solid #D9D9D9;
    }


    .head-toolbar{
        background-color: #ABABAB!important;
        box-shadow: none!important;
        color: white;
    }
    .head-toolbar .v-icon{
      
        color: white;
    }
    .border-bottom{
        border-bottom-style: solid;
        border-bottom-width: thin;
        border-bottom-color: #D9D9D9;
        height: 25px;
    }
    ::v-deep .text-danger input{
        color: #C72C2C;
    }

    ::v-deep tr.active-row {
        background: #d9d9d9;
    }
    .border-top{
        border-top: 1px solid #d9d9d9;
    }
    ::v-deep .v-data-footer{
        border-top: none !important;
    }
  

</style>
