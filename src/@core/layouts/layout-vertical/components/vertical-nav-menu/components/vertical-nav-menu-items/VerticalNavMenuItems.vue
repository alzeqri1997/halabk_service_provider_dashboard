<template>
  <ul v-if="getProfileInfo">
    <li class="nav-item d-flex align-items-center company-info">
      <b-img :src="getProfileInfo.image" class="company-logo mr-4" />
      <div class="d-flex flex-column">
        <span :title="getProfileInfo.name" class="menu-title text-white text-reg-16">{{
          shortenText(getProfileInfo.name, 10)
        }}</span>
        <span class="menu-title text-truncate text-reg-12">{{
          getProfileInfo.user_type
        }}</span>
      </div>
    </li>
    <component
      :is="resolveNavItemComponent(item)"
      v-for="item in filteredItems(getProfileInfo)"
      :key="item.header || item.title"
      :item="item"
    />
  </ul>
</template>

<script>
import { resolveVerticalNavMenuItemComponent as resolveNavItemComponent } from '@core/layouts/utils';
import { provide, ref } from '@vue/composition-api';
import { mapGetters } from 'vuex';
import VerticalNavMenuHeader from '../vertical-nav-menu-header';
import VerticalNavMenuLink from '../vertical-nav-menu-link/VerticalNavMenuLink.vue';
import VerticalNavMenuGroup from '../vertical-nav-menu-group/VerticalNavMenuGroup.vue';

export default {
  components: {
    VerticalNavMenuHeader,
    VerticalNavMenuLink,
    VerticalNavMenuGroup,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      getProfileInfo: 'getProfileInfo',
    }),
  },
  methods: {
    shortenText(text, length) {
      return text.length > length ? text.split('').splice(0, length).join('').concat('', ' ...') : text;
    },
    filteredItems(val) {
        const [reports] = val.restrictions.filter(
          item => item.name === 'reports',
        );
        const [dashboard] = val.restrictions.filter(
          item => item.name === 'dashboard',
        );
        if (
          val.complete_status === 'pending'
          || val.complete_status === 'confirming'
          || val.complete_status === 'suspended'
          || val.complete_status === 'rejected'
        ) {
          return [this.items[0]];
        } else if(dashboard.code === '02_07_01' || reports.code === '02_06_01'){
          const items = this.items.filter(item => {
            if(item.title === 'financial_operations' || item.title === 'dashboard'){
              return ;
            }
            return item;
          });
          return items;
        } else{
          return this.items;
        }
    },
  },
  watch: {
    getProfileInfo(val) {
      if (val && val.complete_status !== 'active') {
        const rejectRoute = ['dashboard', 'edit-profile'];
        if (
          (val.complete_status !== 'rejected'
            && this.$router.currentRoute.name !== 'dashboard')
          || (val.complete_status === 'rejected'
            && !rejectRoute.includes(this.$router.currentRoute.name))
        ) {
          this.$router.push('/dashboard');
        }
      }
      this.filteredItems(val);
    },
  },
  setup() {
    provide('openGroups', ref([]));

    return {
      resolveNavItemComponent,
    };
  },
};
</script>
