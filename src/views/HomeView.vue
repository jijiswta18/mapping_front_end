<template>
  <div>

    <hello-world />
    <v-data-table
      :headers="headers"
      :items="items"
      :sort-by="sortBy"
      :sort-desc="sortDesc"
      :custom-sort="customSort"
    ></v-data-table>
  </div>

</template>

<script>
  import HelloWorld from '../components/HelloWorld'

  export default {
    // name: 'Home',
    components: {
      HelloWorld,
    },
    data() {
    return {
      sortBy: 'status', // Default sort by column
      sortDesc: false, // Default sorting order
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Status', value: 'status', sortable: false },
        // Add more headers as needed
      ],
      items: [
        { name: 'John', status: 'Active' },
        { name: 'Alice', status: 'Inactive' },
        // Add more items as needed
      ]
    };
  },
  methods: {
    customSort(items, sortBy, sortDesc) {
      return items.sort((a, b) => {
        const sortFactor = sortDesc ? -1 : 1;
        if (sortBy === 'status') {
          return this.statusToNumber(a.status) - this.statusToNumber(b.status) * sortFactor;
        } else {
          return 0;
        }
      });
    },
    statusToNumber(status) {
      return status === 'Active' ? 1 : status === 'Inactive' ? 2 : 0;
    }
  }

  }
</script>
