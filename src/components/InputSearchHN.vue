<template>
    <div>
  
        <v-text-field
            v-model="selectedItem.Code"
            :rules="[v => !!v || '']"
            append-icon="mdi-magnify"
            :label="label"
            dense
            outlined
            single-line
            hide-details="auto"
            clearable 
            @click:append="onClick"
        ></v-text-field>
          
        <v-dialog
            v-model="dialogSearch"
            width="550"
            class="dialog-search"
            >
            <v-card>
                <v-toolbar class="head-toolbar">
                    <v-toolbar-title>{{ title }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="dialogSearch = false">
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
                                v-model="selectedItem.Code"
                                dense
                                outlined
                                single-line
                                hide-details="auto"
                                clearable 
                            ></v-text-field>

                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4">
                            <span class="f-12">{{ name }}</span>
                        </v-col>
                        <v-col cols="8">
                            <v-text-field
                                v-model="selectedItem.LocalName"
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
                        :items="selectData"
                        :search="search"
                        :loading="loading"
                        compact
                        item-key="name"
                        :footer-props="{ 'items-per-page-options': [10, 25, 50, 100] }"
                        class="dialog-table"
                        @click:row="selectRow"
                    >
                
                    </v-data-table>
                            
                </div>
                

            
            </v-card>
        </v-dialog>

    </div>
   
</template>
<script>
import axios from "axios";
export default{
    props: ['title', 'label', 'code', 'name',  'type'],
    data: () => ({
        dialogSearch: false,
        selectData: [],
        search: '',
        loading: true,
        header: [],
        selectedItem: {
            Code: '',
            LocalName: ''
            // Add more fields as needed
        },
    }),
    mounted() {
        this.generateHeader();
    },
    methods:{
        generateHeader() {
            this.header = [
                { text: `${this.code}`, align: 'left', sortable: true, value: 'Code', width: '30%' },
                { text: `${this.name}`, align: 'left', sortable: true, value: 'LocalName' }
            ];
        },
        selectRow(item) {
            this.selectedItem = { ...item };
            this.$emit('childEvent', item);
        },

        onClick () {
            this.dialogSearch = true
            this.LoadHISActivity()

        },
        async LoadHISActivity(){
            try {
                this.loading        = await true
                let LoadDataPath    = null 
                console.log(this.type);
                if(this.type === 'Receive'){
                    LoadDataPath = '/api/SAP/CashAndGL/LoadSSB'
                }else { 
                    LoadDataPath = '/api/SAP/LoadHISActivity'
                }
             
                let response        = await axios.get(LoadDataPath);
                await setTimeout(() => {
                    this.loading = false;
                    this.selectData = response.data;

                }, 300);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }  
    }
}
</script>
<style scoped>
    /* ::v-deep .v-dialog--active{
        height: 500px;
    } */
  
    ::v-deep .table-container tr td{
        border-bottom: none!important;
    }

    ::v-deep .table-container tr td:first-child,
    ::v-deep .table-container tr th:first-child{
        border-right: 1px solid #D9D9D9;
    }

    ::v-deep .table-container {
        max-height: 400px; /* Adjust the height as needed */
        overflow-y: auto;
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
 
</style>
