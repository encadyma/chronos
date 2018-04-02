<template>
  <div>
    <div class="tab-item" :class="tabItemClasses" @click="$emit('click')">
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
      isHighlighted: {
        type: Boolean,
        default: false
      },
      isActive: {
        type: Boolean,
        default: false
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
      tabItemClasses() {
        if (this.isSelecting) {
          return {
            'tab-item_selected': this.isSelected,
            'tab-item_selected_full': this.isSelected
          }
        } else {
          return {
            'tab-item_active': this.isHighlighted,
            'tab-item_active_full': this.isActive
          }
        }
      }
    }
  }
</script>