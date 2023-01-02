<template>
  <b-row
    v-if="$route.meta.breadcrumb || $route.meta.pageTitle"
    class="content-header no-gutters"
  >

    <!-- Content Left -->
    <b-col
      class="content-header-left  mt-3"
      cols="12"
      md="9"
    >
      <b-row class="breadcrumbs-top  no-gutters   px-5">
        <b-col class="py-5 " cols="12">
          <a href="#" 
          
          :class="`text-bold-20 ${ $route.meta.breadcrumb?`text-font-secondary`:`text-font-main`} float-left pr-1 mb-0`">
            {{  $route.meta.pageTitle }} 
          <span v-if="$route.meta.breadcrumb" class="mx-3">/</span>

          </a >
          <div class="breadcrumb-wrapper">
            <b-breadcrumb class="py-0 px-0">
              <!-- <b-breadcrumb-item to="/">
                <feather-icon
                  icon="HomeIcon"
                  size="16"
                  class="align-text-top"
                />
              </b-breadcrumb-item> -->
              <b-breadcrumb-item
               class="text-medium-20 text-font-secondary"
                v-for="item in $route.meta.breadcrumb"
                :key="item.text"
                :active="item.active"
                :to="item.to"
              >
                {{ item.text }}
              </b-breadcrumb-item>
            </b-breadcrumb>
          </div>
        </b-col>
      </b-row>
    </b-col>

   
  </b-row>
</template>

<script>

export default {
  components: {
  },
}
</script>
