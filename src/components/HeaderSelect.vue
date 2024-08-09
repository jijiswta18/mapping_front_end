
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
      <!-- Prepend item slot for sorting and search -->
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
              append-icon="mdi-magnify"
              class="input-search"
              hide-details="auto"
            ></v-text-field>
          </v-list-item-content>
        </v-list-item>
      </template>

      <!-- Custom item slot with checkboxes and tooltips -->
      <template v-slot:item="data">
        <v-list-item
          v-bind="data.attrs"
          v-on="data.on"
          :key="data.item.value"
          class="custom-list-item"
        >
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-list-item-content
                v-bind="attrs"
                v-on="on"
                class="d-flex align-center"
              >
                <v-checkbox
                  v-model="internalSelectedValue"
                  :value="data.item.value"
                  class="mr-2"
                  hide-details
                 
                  @change="updateSelection(data.item.value)"
                ></v-checkbox>
                <div class="v-list-item__title">{{ data.item.value }}</div>
              </v-list-item-content>
            </template>
            <span>{{ data.item.value || 'No Data' }}</span>
          </v-tooltip>
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
    // Check if selectItems is defined and is an array
    if (!Array.isArray(this.selectItems) || this.selectItems.length === 0 || !this.selectItems[0].value) {
      return []; // or you could return a specific message or empty array if no data is present
    }

    let items = [...this.selectItems];

    // Filter items based on search terms
    if (this.searchTerms && this.searchTerms.trim() !== '') {
      items = items.filter(item =>
        item.value?.toLowerCase().includes(this.searchTerms.toLowerCase())
      );
    }

    // Sort items based on sort direction
    items.sort((a, b) => {
      const valueA = (a.value || '').toLowerCase();
      const valueB = (b.value || '').toLowerCase();

      if (this.sortDirection === 'asc') {
        return valueA.localeCompare(valueB);
      } else if (this.sortDirection === 'desc') {
        return valueB.localeCompare(valueA);
      }
      return 0; // Default to no change if sortDirection is not set
    });

    return items;
  }
  

    // sortedItems() {
    //   let items = [...this.selectItems];

    //   console.log('============>',this.headerText);
    //   console.log('============',items);

    //   // Check if searchTerms is not null or undefined before accessing its properties
    //   if (this.searchTerms && this.searchTerms.trim() !== '') {
    //     items = items.filter(item => 
    //       item.value?.toLowerCase()?.includes(this.searchTerms.toLowerCase())
    //     );

    //   }

    //   items.sort((a, b) => {
    //       // Extract values from objects
    //       let valueA = a.value?.toLowerCase();
    //       let valueB = b.value?.toLowerCase();

    //       // Handle undefined or null values
    //       if (valueA === undefined || valueA === null) return -1;
    //       if (valueB === undefined || valueB === null) return 1;

    //       // Compare values based on sort order
    //       if (this.sortDirection === 'asc') {
    //       // Ascending order
    //       if (valueA > valueB) return 1;
    //       if (valueA < valueB) return -1;
    //       } else if (this.sortDirection === 'desc') {
    //       // Descending order
    //       if (valueA > valueB) return -1;
    //       if (valueA < valueB) return 1;
    //       }

    //       return 0; // Values are equal
    //   });

    //   return items;
    // }
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
    // search() {
    //   console.log(this.searchTerms);
    //   // this.$emit('search', this.searchTerms);
    // },
    sortData() {
      // Toggle sort direction
      this.sortDirection = this.sortDirection === 'asc' ? 'asc' : 'desc';
      // Emit a sort event with the current sort direction
      this.$emit('sort', this.sortDirection);
    },

    updateSelection(value) {
      const index = this.internalSelectedValue.indexOf(value);
      if (index === -1) {
        // Add value if not present
        this.internalSelectedValue.push(value);
      } else {
        // Remove value if present
        this.internalSelectedValue.splice(index, 1);
      }
      this.emitSelectionChange(); // Emit the updated selection
    }
  },
};
</script>
<style scoped>


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



.custom-list-item .v-list-item__content{
  flex-wrap: inherit;
}

.custom-list-item .mr-2{
  padding-top: 0;
  margin-top: 0;
}

::v-deep .v-input--selection-controls__input:hover {
  background: none !important;
  transform: scale(1.2) !important;
  transition: none !important;
}

::v-deep .v-input--selection-controls__ripple:before {
  background: none !important;
  transform: scale(1.2) !important;
  transition: none !important;
}

::v-deep .v-input--selection-controls__ripple {
    border-radius: 0;
    width: 0;
}
</style>
