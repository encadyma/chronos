<template>
  <div>
    <div class="tab-item" :class="tabItemClasses" @click="changeTab()">
      <img :src="favicon" class="tab-item__favicon"/>
      <span>{{ title }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      tabData: {
        type: Object,
        default: null
      },
      currentWindowId: {
        type: Number,
        default: -1
      }
    },
    computed: {
      favicon() {
        if (!this.tabData.favIconUrl) return '../icons/tab_matds.png'
        return this.tabData.favIconUrl 
      },
      title() {
        if (this.tabData.title.length > 35) return this.tabData.title.substr(0, 32) + '...'
        return this.tabData.title
      },
      isSelected() {
        return this.tabData.active
      },
      isSameWindow() {
        return this.currentWindowId === this.tabData.windowId
      },
      tabItemClasses() {
        return {
          'tab-item_selected': this.isSelected,
          'tab-item_selected_active': this.isSameWindow && this.isSelected
        }
      }
    },
    methods: {
      changeTab() {
        browser.windows.update(
          this.tabData.windowId, 
          { focused: true }
        ).then(() => {
          browser.tabs.update(this.tabData.id, { active: true })
        })
      },
    }
  }
</script>

<style scoped>

</style>