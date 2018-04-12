<template>
  <div>
    <div class="tabs-list">
      <div class="tabs-list__heading text-sub">
        <span>Switch Profile</span>
      </div>
      <div class="tabs-list__list">
        <div v-if="!isLoading" class="tab-item" v-for="profile in allProfiles" 
          :key="profile.id" @click="changeProfile(profile)" :class="{ 'tab-item_selected': currentProfiles.indexOf(profile.id) > -1 }">
          <div class="tab-item-inner">
            <i class="material-icons tab-item__favicon">{{profile.icon}}</i>
            <span>{{profile.name}}</span>
          </div>
        </div>
        <div v-if="isLoading" class="tab-item">
          <div class="tab-item-inner">
            <i class="text-sub text-sub_dimmer">Loading all profiles...</i>
          </div>
        </div>
        <div v-if="!isLoading && !allProfiles.length" class="tab-item">
          <div class="tab-item-inner">
            <span class="text-sub text-sub_dimmer">No saved profiles.</span>
          </div>
        </div>
        <div v-if="!isLoading" class="tab-item" @click="goToSettings">
          <div class="tab-item-inner">
            <img :src="'../icons/ic_settings.png'" class="tab-item__favicon"/>
            <span>Manage all profiles...</span>
          </div>
        </div>
      </div>
    </div>
    <tabs-navigation/>
  </div>
</template>

<script>
  import PopupTab from './components/PopupTab'
  import TabsNavigation from './components/TabsNavigation'

  export default {
    data() {
      return {
        isLoading: true,
        allProfiles: [],
        currentProfiles: []
      }
    },
    components: { PopupTab, TabsNavigation },
    mounted() {
      this.getProfiles()

      browser.storage.onChanged.addListener((changes, areaName) => {
        if (!changes.profiles && !changes.currentProfiles) return
        this.getProfiles()
      })
    },
    methods: {
      changeProfile(profile) {
        return browser.storage.local.set({
          currentProfiles: [ profile.id ]
        }).then(this.getProfiles)
      },
      getProfiles() {
        return browser.storage.local.get(["profiles", "currentProfiles"]).then((store) => {
          this.allProfiles = store.profiles.filter(p => !p.isDeleted) || []
          this.currentProfiles = store.currentProfiles
          this.isLoading = false
        })
      },
      goToSettings() {
        browser.tabs.create({ url: '/options/options.html#/profiles' })
      }
    },
  }
</script>

<style scoped>
.tabs-list {
  font-size: 14px;
  padding-top: 8px;
  padding-bottom: 4px;
}

.tabs-list__heading {
  padding: 4px 16px;
}

.tabs-list__list {
  padding: 0;
  margin: 0;
  max-height: 400px;
  overflow-y: auto;
}
</style>