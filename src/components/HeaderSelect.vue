<template>
  <div class="d-flex align-center justify-space-between">
    <span class="text-back mr-1">{{ headerText }}</span>
    <v-select
      v-model="internalSelectedValue"
      :items="selectItems"
      multiple
      hide-details
      class="custom-v-select"
      @input="emitSelectionChange"
      
    >
      <template v-slot:prepend-item>
        <!-- <div class="px-4">
          <div class="px-4">
          <div @click="sortDirection = 'asc'; sortData()">
            <i class="fas fa-sort-amount-up"></i> Sort Ascending
          </div>
          <div @click="sortDirection = 'desc'; sortData()">
            <i class="fas fa-sort-amount-down"></i> Sort Descending
          </div>
        </div>
        
        </div> -->
        
        
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
  mounted() {
    // Initialize internalSelectedValue with the prop value
    this.internalSelectedValue = this.selectedValue;
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
   
  },
}
</script>

<style scoped>
/* Your scoped styles */

  .custom-v-select{
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
  

</style>
