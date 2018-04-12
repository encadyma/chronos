<template>
  <div>
    <div class="tabs-list">
      <div class="tabs-list__heading text-sub">
        <span>Actions</span>
      </div>
      <div class="tabs-list__list">
        <div class="tab-item cursor-blocked">
          <div class="tab-item-inner">
            <img :src="'../icons/ic_create.png'" class="tab-item__favicon"/>
            <span>Edit state...</span>
          </div>
        </div>
        <div class="tab-item" @click="openStateInCurrentWindow(tabs)">
          <div class="tab-item-inner">
            <img :src="'../icons/ic_add.png'" class="tab-item__favicon"/>
            <span>Add tabs to current window</span>
          </div>
        </div>
        <div class="tab-item" @click="openStateInNewWindow">
          <div class="tab-item-inner">
            <img :src="'../icons/ic_open_in_new.png'" class="tab-item__favicon"/>
            <span>Open tabs in new window</span>
          </div>
        </div>
        <div class="tab-item" @click="openStateByReplacingWindow">
          <div class="tab-item-inner">
            <img :src="'../icons/ic_swap_vert.png'" class="tab-item__favicon"/>
            <span>Replace this window with saved tabs</span>
          </div>  
        </div>
      </div>
    </div>
    <div class="tabs-list">
      <div class="tabs-list__heading text-sub">
        <span>Saved Tabs</span>
      </div>
      <div class="tabs-list__list">
        <popup-tab 
          v-if="!isLoading" 
          v-for="(tab, i) in filteredTabs" 
          :key="i" :tabData="tab" 
          @click="openTab(tab)"/>
        <div v-if="isLoading" class="tab-item">
          <i class="text-sub text-sub_dimmer">Loading tabs...</i>
        </div>
        <div class="tab-item" v-if="tabs.length > 8" @click="expandTabs = !expandTabs">
          <i class="text-sub text-sub_dimmer" v-if="!expandTabs">Show more...</i>
          <i class="text-sub text-sub_dimmer" v-else>Show less...</i>
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
        expandTabs: false,
        currentState: {}
      }
    },
    components: { PopupTab, TabsNavigation },
    mounted() {
      browser.storage.local.get("states").then((store) => {
        this.currentState = store.states.find(s => s.id === this.$route.params.id) || null
        this.isLoading = false
      })
    },
    computed: {
      tabs() {
        return this.currentState.tabs || []
      },
      filteredTabs() {
        return this.expandTabs ? this.tabs : this.tabs.slice(0, 8)
      }
    },
    methods: {
      openTab(tab) {
        browser.tabs.create({ url: tab.url })
      },
      openStateInCurrentWindow(tabs = null) {
        if (!this.currentState) return;

        tabs = tabs || this.tabs
        return Promise.all(tabs.map(t => browser.tabs.create({ url: t.url })))
      },
      openStateInNewWindow() {
        if (!this.currentState) return;

        return browser.windows.create({
          url: this.tabs.map(t => t.url)
        })
      },
      openStateByReplacingWindow() {
        if (!this.currentState) return;

        browser.tabs.query({ currentWindow: true }).then(currentTabs => {
          const currentTabIds = currentTabs.map(t => t.id)

          // Create the first tab to keep window alive.
          browser.tabs.create({ url: this.tabs[0].url })
            .then(({ id }) => browser.tabs.remove(currentTabIds))
            .then(_ => this.openStateInCurrentWindow(this.tabs.slice(1, this.tabs.length)))
        })
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