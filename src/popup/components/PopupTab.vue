<template>
  <div class="tab-item" :class="tabItemClasses" @click="$emit('click')">
    <div class="tab-item-inner">
      <img :src="favicon" class="tab-item__favicon"/>
      <span>{{ title }}</span>
    </div>
    <div v-if="includeTabDeletion" :class="{ removed: isSelecting }" @click="$emit('tab-delete')">
      <i class="material-icons popup-icon-btn">close</i>
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
      },
      titleCharacterLimit: {
        type: Number,
        default: 35
      },
      includeTabDeletion: {
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
        if (this.tabData.title.length > this.titleCharacterLimit) {
          return this.tabData.title.substr(0, this.titleCharacterLimit - 3) + '...'
        } else return this.tabData.title
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
