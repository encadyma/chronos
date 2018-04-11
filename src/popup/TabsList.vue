<template>
  <div class="tabs-list">
    <div class="tabs-list__heading text-sub">
      <span>Your Tabs</span>
      <span v-if="selectionMode"> ({{selectedTabs.length}} tabs selected)</span>
    </div>
    <div class="tabs-list__list">
      <popup-tab 
        v-if="!isLoading" v-for="tab in tabs" 
        :key="tab.id" :tabData="tab" 
        @click="clickOnTab(tab)" 
        :isHighlighted="tab.active" 
        :isActive="tab.active && tab.windowId === currentWindowId" 
        :isSelecting="selectionMode" 
        :isSelected="selectedTabs.indexOf(tab.id) !== -1"/>
      <div v-if="isLoading" class="tab-item">
        <i class="text-sub text-sub_dimmer">Loading all tabs...</i>
      </div>
    </div>
    <tabs-options 
      @tab-options-deletion-execute="deleteHighlightedTabs"
      @tab-options-deletion-enable="enableDeletion"
      @tab-options-action-disable="disableAction"
      @tab-options-deletion-toggle-save="shouldSaveTabs = !shouldSaveTabs"
      :isDeleting="isDeleting"
      :isSaving="shouldSaveTabs"/>
  </div>
</template>

<script>
  import PopupTab from './components/PopupTab'
  import TabsOptions from './components/TabsOptions'
  import moment from 'moment'

  export default {
    data() {
      return {
        currentWindowId: -1,
        selectionMode: false,
        isDeleting: false,
        selectedTabs: [],
        isLoading: true,
        shouldSaveTabs: true,
        tabs: []
      }
    },
    components: { PopupTab, TabsOptions },
    mounted() {
      browser.windows.getCurrent().then((window) => {
        this.currentWindowId = window.id
      })
      browser.tabs.onCreated.addListener(this.updateTabs)
      browser.tabs.onUpdated.addListener(this.updateTabs)
      browser.tabs.onActivated.addListener(this.updateTabs)
      browser.tabs.onRemoved.addListener(this.updateTabsOnRemoval)
      this.updateTabs()
    },
    methods: {
      updateTabs() {  // Update the tab listings
        browser.tabs.query({}).then((data) => {
          this.tabs = data
          this.isLoading = false
        })
      },
      updateTabsOnRemoval(excludeTabId = -1) {
        browser.tabs.query({}).then((data) => {
          this.tabs = data.filter(t => t.id !== excludeTabId)
          this.isLoading = false
        })
      },
      deleteHighlightedTabs() {
        this.saveSelectedTabsAsState(this.selectedTabs).then(() => {
          browser.tabs.remove(this.selectedTabs).then(() => {
            this.selectedTabs = []
            this.selectionMode = false
            this.isDeleting = false
          })
        })
      },
      saveSelectedTabsAsState(tabs) {
        if (!tabs.length) return Promise.resolve(true)
        if (!this.shouldSaveTabs) return Promise.resolve(true)

        return new Promise((resolve, reject) => {
          let state = {}
          const resolvedTabs = tabs.map(id => {
            const thisTab = this.tabs.find(t => t.id === id)
            return { title: thisTab.title, favIconUrl: thisTab.favIconUrl, url: thisTab.url }
          })

          state.title = 'Saved on ' + moment().format('MMM D, YYYY h:mm:ss A')
          state.favIconUrl = '../icons/ic_restore_backup.png'
          state.tabs = resolvedTabs
          state.timestamp = parseInt(moment().format('x'))
          state.type = 'last_deleted'

          return browser.storage.local.get("states").then((store) => {
            state.id = store.states.length + 1
            return browser.storage.local.set({
              states: [state].concat(store.states)
            }).then(resolve)
          })
        })
      },
      enableDeletion() {  // Enter deletion mode
        this.selectionMode = true
        this.isDeleting = true
        this.shouldSaveTabs = true
      },
      disableAction() {   // Enter (reset to) normal mode
        this.selectedTabs = []
        this.selectionMode = false
        this.isDeleting = false
        this.shouldSaveTabs = true
      },
      clickOnTab({ id, windowId }) {
        if (this.isDeleting) {
          this.handleTabToggle(id)
        } else {
          this.switchActiveTab(id, windowId)
        }
      },
      handleTabToggle(tabId) {  // Once a tab is selected in a special mode
        if (this.selectedTabs.indexOf(tabId) !== -1) {
          this.selectedTabs = this.selectedTabs.filter(id => id !== tabId)
        } else {
          this.selectedTabs.push(tabId)
        }
      },
      switchActiveTab(tabId, windowId) {
        browser.windows.update(
          windowId, 
          { focused: true }
        ).then(() => {
          browser.tabs.update(tabId, { active: true })
        })
      }
    },
    watch: {
      tabs(newValue, oldValue) {    
        // Ensure that listing is up to date during special modes
        if (this.selectionMode) {
          this.selectedTabs = this.selectedTabs.filter(id => {
            return newValue.map(t => t.id).indexOf(id) !== -1
          })
        }
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