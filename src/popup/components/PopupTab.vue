<template>
  <div>
    <div class="tab-item" :class="tabItemClasses" @click="clickOnTab()">
      <img :src="favicon" class="tab-item__favicon"/>
      <span>{{ title }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selected: false
      }
    },
    props: {
      tabData: {
        type: Object,
        default: null
      },
      currentWindowId: {
        type: Number,
        default: -1
      },
      isSelecting: {
        type: Boolean,
        default: false
      },
      isSelected: {
        type: Boolean,
        default: false
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
      isActive() {
        return this.tabData.active
      },
      isSameWindow() {
        return this.currentWindowId === this.tabData.windowId
      },
      tabItemClasses() {
        if (this.isSelecting) {
          return {
            'tab-item_selected': this.isSelected,
            'tab-item_selected_full': this.isSelected
          }
        } else {
          return {
            'tab-item_active': this.isActive,
            'tab-item_active_full': this.isSameWindow && this.isActive
          }
        }
      }
    },
    methods: {
      clickOnTab() {
        if (this.isSelecting) {
          this.selectTab()
        } else {
          this.changeTab()
        }
      },
      changeTab() {
        browser.windows.update(
          this.tabData.windowId, 
          { focused: true }
        ).then(() => {
          browser.tabs.update(this.tabData.id, { active: true })
        })
      },
      selectTab() {
        this.$emit('tab-select-toggle', this.tabData.id)
      }
    }
  }
</script>

<style scoped>

</style>