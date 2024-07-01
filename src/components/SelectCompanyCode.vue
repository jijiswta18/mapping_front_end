<template>
     <v-row class="mt-3">
        <v-col>
            <span class="f-12">Company Code</span>
        </v-col>
        <v-col cols="8">
            <v-autocomplete
                label="Select"
                v-model="selecItem"
                :items="options"
                item-text="name"
                item-value="code"
                dense
                outlined
                single-line
                clearable 
                hide-details="auto"
                :rules="[v => !!v || '']"
        ></v-autocomplete>
        </v-col>
    </v-row>
</template>
<script>
export default{
    data: () => ({
        selecItem: null,
        options: [{ code: '1000', name: '1000' }]
    }),
    methods: {
    // clearData() {
    //     this.selecItem = null; // Method to clear data
    // },
    },
}
</script>
