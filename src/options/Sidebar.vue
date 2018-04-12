<template>
  <div id="options-sidebar">
    <sidebar-item title="Home" icon="home" page="/"/>
    <!--<sidebar-item title="Tabs" icon="tab" page="TabsPage"/>-->
    <!--<sidebar-item title="States" icon="archive" page="StatesPage"/>-->
    <sidebar-item title="Profiles" icon="business_center" page="/profiles"/>
    <div class="separator-opt"></div>
    <div class="text-sub options-sidebar__heading">Profiles</div>
    <sidebar-item v-for="profile in profiles" :key="profile.id" :title="profile.name" :icon="profile.icon" :page="'/profile/view/' + profile.id" :class="['sidebar-item-profile_' + profile.color]"/>
    <sidebar-item title="Add a profile" icon="add" page="/profile/add"/>
    <div class="separator-opt"></div>
    <div class="text-sub options-sidebar__heading">Help</div>
    <sidebar-item title="Quickstart" icon="help" page="/help/quickstart"/>
  </div>
</template>

<script>
  import SidebarItem from './components/SidebarItem'

  export default {
    components: { SidebarItem },
    data() {
      return {
        profiles: []
      }
    },
    methods: {
      getProfiles() {
        browser.storage.local.get("profiles").then((state) => {
          this.profiles = state.profiles
        })
      }
    },
    mounted() {
      this.getProfiles()
      browser.storage.onChanged.addListener((changes, areaName) => {
        if (changes.profiles) this.getProfiles()
      })
    }
  }
</script>

<style scoped>
#options-sidebar {
  min-width: 200px;
  margin-right: 40px;
}

.separator-opt {
  width: 100%;
  border-bottom: 1px solid #ccc;
  margin: 10px auto;
}

.options-sidebar__heading {
  font-size: 14px;
  margin: 6px 10px;
}
</style>