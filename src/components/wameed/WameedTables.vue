

<template>
  <!-- table -->
  <b-table
    responsive
    :per-page="perPage"
    :items="items"
    :fields="fields"
    :sort-by.sync="sortBy"
    :sort-desc.sync="sortDesc"
    :sort-direction="sortDirection"
    :filter="filter"
    :filter-included-fields="filterOn"
  >
    <template #head()="data">
      <div>
        <span class="d-flex align-items-center text-font-main mx-3"
          >{{ data.label }}
          <sortable-icon />
        </span>
      </div>
    </template>
    <template
      v-for="(item, i) in custimizedItems"
      v-slot:[`cell(${item.name})`]="data"
    >
      <div :key="i" class="d-flex">
        <slot :name="item.name" :data="data" />
      </div>
    </template>
    <template #cell(status)="data">
      <div class="d-flex">
        <b-badge
          pill
          :variant="'light-' + status[1][data.item.status]"
          :class="'border-' + status[1][data.item.status]"
          class="text-reg-12 py-0 px-3"
          >{{ $t('common.' + status[0][data.item.status]) }}</b-badge
        >
      </div>
    </template>
  </b-table>
</template>

<script>
import store from '@/store/index';

export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    custimizedItems: {
      type: Array,
      default: () => [{ name: 'fullName' }, { name: 'status' }],
    },
    fields: {
      type: Array,
      default: () => [],
    },
    perPage: {
      type: Number,
      default: 20,
    },
    status: {
      type: Array,
      default: () => [],
    },
  },
  components: {},
  data() {
    return {
      ch: 'fullName',
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
    };
  },
};
</script>

<style lang="scss" >
</style>
