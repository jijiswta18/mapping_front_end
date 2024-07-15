<template>
  <div class="d-flex align-center justify-space-between">
    <span class="text-back mr-1">{{ headerText }}</span>
    <v-select
      v-model="internalSelectedValue"
      :items="sortedItems"
      multiple
      hide-details
      class="custom-v-select"
      @input="emitSelectionChange"
    >
      <template v-slot:prepend-item>
        <div class="box-sort">
       
            <div class="cursor-pointer mb-2" @click="sortDirection = 'asc'; sortData()">
              <i class="fas fa-sort-amount-up"></i> Sort Ascending
            </div>
            <div class="cursor-pointer" @click="sortDirection = 'desc'; sortData()">
              <i class="fas fa-sort-amount-down"></i> Sort Descending
            </div>
         
        </div>
        
        <v-list-item>
          <v-list-item-content>
            <v-text-field
              v-model="searchTerms"
              placeholder="Search"
              dense
              outlined
              single-line
              clearable
              @input="search"
              append-icon="mdi-magnify"
              class="input-search"
              hide-details="auto"
            ></v-text-field>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-select>
  </div>
</template>
<script>
export default {
  props: {
    headerText: String,
    selectedValue: Array,
    selectItems: Array,
  },
  data() {
    return {
      internalSelectedValue: [],
      searchTerms: '',
      sortDirection: '', // To track sort direction
    };
  },
  computed: {
  

    sortedItems() {
      let items = [...this.selectItems];

      // Check if searchTerms is not null or undefined before accessing its properties
      if (this.searchTerms && this.searchTerms.trim() !== '') {
        items = items.filter(item => 
          item.value?.toLowerCase()?.includes(this.searchTerms.toLowerCase())
        );

      }

      items.sort((a, b) => {
          // Extract values from objects
          let valueA = a.value?.toLowerCase();
          let valueB = b.value?.toLowerCase();

          // Handle undefined or null values
          if (valueA === undefined || valueA === null) return -1;
          if (valueB === undefined || valueB === null) return 1;

          // Compare values based on sort order
          if (this.sortDirection === 'asc') {
          // Ascending order
          if (valueA > valueB) return 1;
          if (valueA < valueB) return -1;
          } else if (this.sortDirection === 'desc') {
          // Descending order
          if (valueA > valueB) return -1;
          if (valueA < valueB) return 1;
          }

          return 0; // Values are equal
      });


      // Ensure sorting is based on 'value' property and is case-insensitive
      // items.sort((a, b) => {
      //   let valueA = a.value?.toLowerCase();
      //   let valueB = b.value?.toLowerCase();
        
      //   if (valueA < valueB) return -1;
      //   if (valueA > valueB) return 1;
      //   return 0;
      // });

      // Apply descending order if sortDirection is 'desc'
      // if (this.sortDirection === 'desc') {
      //   items.reverse();
      // }

      return items;
    }
  },
  mounted() {
    // Initialize internalSelectedValue with the prop value
    this.internalSelectedValue = this.selectedValue;

    // console.log(this.selectedValue);
  },
  watch: {
    // Watch for changes in selectedValue prop
    selectedValue(newValue) {
 
      this.internalSelectedValue = newValue;
    },
  },
  methods: {
    emitSelectionChange() {
      this.$emit('update:selectedValue', this.internalSelectedValue);
    },
    search() {
      this.$emit('search', this.searchTerms);
    },
    sortData() {
      // Toggle sort direction
      this.sortDirection = this.sortDirection === 'asc' ? 'asc' : 'desc';
      // Emit a sort event with the current sort direction
      this.$emit('sort', this.sortDirection);
    },
  },
};
</script>
<style scoped>
/* Your scoped styles */

.custom-v-select {
  margin: 0;
  padding: 0;
  display: ruby;
  flex: none;
}

::v-deep .custom-v-select .v-select__selections {
  display: none!important;
}

::v-deep .custom-v-select .v-input__append-inner {
  background-color: #ABABAB;
  cursor: pointer;
  padding: 0;
  margin: 0;
  border-radius: 4px;
}

::v-deep .v-text-field > .v-input__control > .v-input__slot:before {
  border-style: none;
}

.box-sort{
  border-bottom: 2px solid #D9D9D9;
  margin: 0 15px;
  padding-bottom: 10px;
}
.cursor-pointer{
  cursor:pointer;
}
</style>
