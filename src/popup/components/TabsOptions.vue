<template>
  <div class="tabs-options">
    <div class="tabs-options__menu">
      <div v-if="!isSelecting" class="tabs-options__item" title="Load State" @click="goLoadState">
        <i class="material-icons">unarchive</i>
      </div>
      <div v-if="isSelecting" class="tabs-options__item"
        :class="{ 'tabs-options__item_highlighted_blue': isSaving }"
        @click="toggleSaving" :title="isSaving ? 'Save Deleted Tabs (Enabled)' : 'Save Deleted Tabs (Disabled)'">
        <i class="material-icons">save</i>
      </div>
    </div>
    <div class="tabs-options__menu">
      <div v-if="isSelecting" class="tabs-options__item" title="Cancel" @click="cancelAction">
        <i class="material-icons">close</i>
      </div>
      <div v-if="!isSelecting" class="tabs-options__item" title="Open New Tab" @click="goAddTab">
        <i class="material-icons">add</i>
      </div>
      <div class="tabs-options__item"
        :class="{ 'tabs-options__item_highlighted_red': isDeleting }"
        @click="toggleDeletion" :title="isDeleting ? 'Confirm Deletion' : 'Delete Tabs'">
        <i class="material-icons" v-if="isDeleting">delete_forever</i>
        <i class="material-icons" v-else>delete</i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      isDeleting: {
        type: Boolean,
        default: false
      },
      isSaving: {
        type: Boolean,
        default: true
      },
    },
    methods: {
      toggleDeletion() {
        if (this.isDeleting) {
          this.$emit('tab-options-deletion-execute')
        } else {
          this.$emit('tab-options-deletion-enable')
        }
      },
      toggleSaving() {
        this.$emit('tab-options-deletion-toggle-save')
      },
      cancelAction() {
        this.$emit('tab-options-action-disable')
      },
      goAddTab() {
        this.$router.push({ name: 'AddTab' })
      },
      goLoadState() {
        this.$router.push({ name: 'LoadState' })
      }
    },
    computed: {
      isSelecting() {
        return this.isDeleting 
      }
    },
  }
</script>