<template>
  <div>
    <div class="tabs-list">
      <div class="tabs-list__heading text-sub">
        <span>Suggested Sites</span>
      </div>
      <div class="tabs-list__list">
        <popup-tab v-for="tab in suggestedTabs" :key="tab.id" :tabData="tab" @click="openSite(tab.url, tab.inNewWindow)"/>
      </div>
    </div>
    <div class="tabs-list">
      <div class="tabs-list__heading text-sub">
        <span>Top Sites</span>
      </div>
      <div class="tabs-list__list">
        <popup-tab v-if="!isLoading" v-for="site in computedTopSites" :key="site.id" :tabData="site" @click="openSite(site.url)"/>
        <div v-if="isLoading" class="tab-item">
          <i class="text-sub text-sub_dimmer">Loading top sites...</i>
        </div>
        <div class="tab-item" @click="expandAll = !expandAll">
          <i class="text-sub text-sub_dimmer" v-if="!expandAll">Show more...</i>
          <i class="text-sub text-sub_dimmer" v-else>Show less...</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PopupTab from './components/PopupTab'
  import TabsNavigation from './components/TabsNavigation'
  import browser from 'webextension-polyfill'

  export default {
    data() {
      return {
        isLoading: true,
        suggestedTabs: [
          { favIconUrl: '../icons/tab_matds.png', title: 'Open blank new tab', inNewWindow: false },
          { favIconUrl: '../icons/ic_open_in_new.png', title: 'Open new window...', inNewWindow: true },
          { favIconUrl: '../icons/ic_settings.png', title: 'Extension Settings...', url: '/options/options.html', inNewWindow: false },
        ],
        topSites: [],
        expandAll: false
      }
    },
    components: { PopupTab, TabsNavigation },
    mounted() {
      browser.topSites.get().then((sites) => {
        this.isLoading = false
        this.topSites = sites.map(i => {
          i.title = i.title || i.url
          i.favIconUrl = i.favIconUrl || '../icons/ic_add.png'
          return i  
        })
      })
    },
    methods: {
      openSite(url, inNewWindow) {
        if (!inNewWindow) browser.tabs.create({ url: url })
        else browser.windows.create({ url: url })
      }
    },
    computed: {
      computedTopSites() {
        if (!this.expandAll) return this.topSites.slice(0, 5)
        return this.topSites 
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