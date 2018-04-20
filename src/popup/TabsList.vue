<template>
  <div>
    <div class="tabs-status" :class="{ dimmed: selectionMode }">
      <div class="tabs-status-flex">
        <div class="tabs-status__section">
          <div class="tabs-status-section-heading">
            <span v-if="selectionMode">{{selectedTabs.length}} tabs selected</span>
            <span v-else>{{tabs.length}} tabs open</span>
          </div>
          <div class="tabs-status-section-subheading">
            <span v-if="selectionMode">
              <span>Select which tabs to save.</span>
            </span>
            <span v-else class="tabs-status-section-clickable" @click="goToStates">Open new state...</span>
          </div>
        </div>
        <div class="tabs-status__section">
          <i class="tabs-status__section__action_btn material-icons"
            @click="disableAction" title="Cancel"
            v-if="selectionMode">close</i>
          <i class="tabs-status__section__action_btn material-icons"
            @click="deleteHighlightedTabs" title="Save and close tabs"
            v-if="selectionMode">restore_page</i>
          <i class="tabs-status__section__action_btn material-icons"
            @click="openQuickStart" title="Open quickstart in new tab"
            v-if="!selectionMode">info</i>
          <i class="tabs-status__section__action_btn material-icons"
            @click="emitDeletion" title="Save new state">archive</i>
        </div>
      </div>
    </div>
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
          @tab-delete="deleteTab(tab.id)"
          :isHighlighted="tab.active" 
          :isActive="tab.active && tab.windowId === currentWindowId" 
          :isSelecting="selectionMode" 
          :includeTabDeletion="true"
          :isSelected="selectedTabs.indexOf(tab.id) !== -1"/>
        <div v-if="isLoading" class="tab-item">
          <i class="text-sub text-sub_dimmer">Loading all tabs...</i>
        </div>
      </div>
    </div>
    <div class="tabs-list">
      <div class="tabs-list__heading text-sub">
        <span>Actions</span>
      </div>
      <div class="tabs-list__list">
        <div class="tab-item" 
          :class="[currentActionClasses, { 'tab-item_selected_blinking' : !hasAccessedQuickstart }]" 
          :disabled="selectionMode" @click="openQuickStart">
          <div class="tab-item-inner">
            <img :src="'../icons/ic_help.png'" class="tab-item__favicon"/>
            <span v-if="!hasAccessedQuickstart">New user? Open the quickstart!</span>
            <span v-else>Open the quickstart</span>
          </div>
        </div>
        <div class="tab-item" :class="currentActionClasses" :disabled="selectionMode" @click="saveAndCloseWindow">
          <div class="tab-item-inner">
            <img :src="'../icons/ic_restore_page.png'" class="tab-item__favicon"/>
            <span>Save & close this window for later</span>
          </div>
        </div>
        <div class="tab-item" :class="currentActionClasses" :disabled="selectionMode" @click="goAddTab">
          <div class="tab-item-inner">
            <img :src="'../icons/ic_add.png'" class="tab-item__favicon"/>
            <span>Open new tab</span>
          </div>
        </div>
      </div>
      <!--<tabs-options 
        @tab-options-deletion-execute="archiveHighlightedTabs"
        @tab-options-deletion-enable="enableDeletion"
        @tab-options-action-disable="disableAction"
        @tab-options-deletion-toggle-save="shouldSaveTabs = !shouldSaveTabs"
        :isDeleting="isDeleting"
        :isSaving="shouldSaveTabs"
        :stateHasUnreadMsg="hasNewState"/>-->
    </div>
  </div>
</template>

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
  max-height: 320px;
  overflow-y: auto;
}

.tabs-status {
  background-color: rgb(30, 100, 205);
  color: #fff;
  padding: 12px 20px;
  transition: 100ms ease;
}

.tabs-status.dimmed {
  background-color: rgb(165, 20, 20);
}

.tabs-status-section-heading {
  font-size: 20px;
  font-weight: 700;
  margin: 4px 0;
}

.tabs-status-section-subheading {
  font-size: 12px;
  font-weight: 500;
  margin: 2px 0;
}

.tabs-status-section-clickable {
  color: rgba(255, 255, 255, 0.65);
  cursor: pointer;
  font-weight: 700;
}

.tabs-status-section-clickable:hover {
  color: rgba(255, 255, 255, 0.75);
}

.tabs-status-section-clickable.disabled {
  color: rgba(255, 255, 255, 0.5) !important;
  cursor: not-allowed;
}

.tabs-status__section__action_btn {
  border-radius: 4px;
  font-size: 24px;
  padding: 3px;
  color: rgba(255, 255, 255, 0.75);
  margin: 0 2px;
  cursor: pointer;
  position: relative;
}

.tabs-status__section__action_btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.9);
}

.tabs-status-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tabs-status__section__action_btn:after {
  background-color: rgb(30, 30, 30);
  color: rgb(255, 255, 255);
  content: attr(title);
  cursor: default;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  position: absolute;
  bottom: -28px;
  right: 0%;
  font-size: 12px;
  padding: 4px 6px;
  border-radius: 2px;
  visibility: hidden;
  opacity: 0;
  transition: 150ms ease;
}

.tabs-status__section__action_btn:hover:after {
  visibility: visible;
  opacity: 1;
}
</style>

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
        hasAccessedQuickstart: true,
        tabs: [],
        hasNewState: false
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

      browser.storage.local.get("hasAccessedQuickstart")
        .then((s) => this.hasAccessedQuickstart = s.hasAccessedQuickstart)
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
          // Deleting tab code -- temporarily removing this.
          browser.tabs.remove(this.selectedTabs).then(() => {
            this.selectedTabs = []
            this.selectionMode = false
            this.isDeleting = false
          })
        })
      },
      archiveHighlightedTabs() {
        this.saveSelectedTabsAsState(this.selectedTabs).then(() => {
          this.selectedTabs = []
          this.selectionMode = false
          this.isDeleting = false
        })
      },
      saveSelectedTabsAsState(tabs) {     // <== tabs: [<tab-ids>, ...]
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
          state.isDeleted = false

          return browser.storage.local.get("states").then((store) => {
            state.id = store.states.length + 1
            this.hasNewState = true
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
      },
      deleteTab(tabId) {
        return browser.tabs.remove(tabId)
      },
      openQuickStart() {
        if (this.selectionMode) return

        browser.tabs.create({ url: '/options/options.html#/help/quickstart' })
        this.hasAccessedQuickstart = true
      },
      goAddTab() {
        if (this.selectionMode) return

        this.$router.push({ name: 'AddTab' })
      },
      saveAndCloseWindow() {
        if (this.selectionMode) return

        const currentWindowTabs = this.tabs
          .filter(t => t.windowId === this.currentWindowId)
          .map(t => t.id)

        this.saveSelectedTabsAsState(currentWindowTabs).then(() => {
          browser.tabs.remove(currentWindowTabs).then(() => {
            this.selectedTabs = []
            this.selectionMode = false
            this.isDeleting = false
          })
        })
      },
      emitDeletion() {
        if (this.isDeleting) {
          this.archiveHighlightedTabs();
        } else {
          this.enableDeletion();
        }
      },
      goToStates() {
        this.$router.push({ name: 'LoadState' })
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
    computed: {
      currentActionClasses() {
        return { 'cursor-blocked': this.selectionMode }
      }
    }
  }
</script>