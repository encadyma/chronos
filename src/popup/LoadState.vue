<template>
  <div>
    <div class="tabs-list">
      <div class="tabs-list__heading text-sub">
        <span>Saved States</span>
      </div>
      <div class="tabs-list__list">
        <popup-tab 
          v-if="!isLoading" 
          v-for="state in expandArr(savedStates, expandSavedStates)" 
          :key="state.id" :tabData="state" 
          @click="openState(state)"/>
        <div v-if="isLoading" class="tab-item">
          <i class="text-sub text-sub_dimmer">Loading your states...</i>
        </div>
        <div v-if="!isLoading && !savedStates.length" class="tab-item">
          <span class="text-sub text-sub_dimmer">No saved states.</span>
        </div>
        <div class="tab-item" v-if="savedStates.length > 5" @click="expandSavedStates = !expandSavedStates">
          <i class="text-sub text-sub_dimmer" v-if="!expandSavedStates">Show more...</i>
          <i class="text-sub text-sub_dimmer" v-else>Show less...</i>
        </div>
      </div>
    </div>
    <div class="tabs-list">
      <div class="tabs-list__heading text-sub">
        <span>Last Deleted Tabs</span>
      </div>
      <div class="tabs-list__list">
        <popup-tab 
          v-if="!isLoading" 
          v-for="state in expandArr(lastDeletedStates, expandDeletedStates)" 
          :key="state.id" :tabData="state" 
          @click="openState(state)" 
          :titleCharacterLimit="40"/>
        <div v-if="isLoading" class="tab-item">
          <i class="text-sub text-sub_dimmer">Loading last deleted tabs...</i>
        </div>
        <div v-if="!isLoading && !lastDeletedStates.length" class="tab-item">
          <span class="text-sub text-sub_dimmer">No last deleted tabs.</span>
        </div>
        <div class="tab-item" v-if="lastDeletedStates.length > 5" @click="expandDeletedStates = !expandDeletedStates">
          <i class="text-sub text-sub_dimmer" v-if="!expandDeletedStates">Show more...</i>
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
        expandSavedStates: false,
        expandDeletedStates: false,
        allStates: [],
      }
    },
    components: { PopupTab, TabsNavigation },
    mounted() {
      browser.storage.local.get("states").then((store) => {
        this.allStates = store.states || []
        this.isLoading = false
      })
    },
    computed: {
      savedStates() {
        return this.allStates.filter(s => s.type === 'saved')
      },
      lastDeletedStates() {
        return this.allStates.filter(s => s.type === 'last_deleted')
      }
    },
    methods: {
      expandArr(array, shouldExpand) {
        if (shouldExpand) return array
        return array.slice(0, 5)
      },
      openState(state) {
        this.$router.push({ name: 'ViewState', params: { id: state.id } })
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