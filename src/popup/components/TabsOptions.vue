<template>
  <div class="tabs-options">
    <div class="tabs-options__menu">
      <div v-if="!isSelecting"
        class="tabs-options__item"
        title="Load State" @click="goLoadState"
        :class="{ 'tabs-options__item_popout': stateHasUnreadMsg }">
        <i class="material-icons">unarchive</i>
      </div>
      <!--<div v-if="isSelecting" class="tabs-options__item"
        :class="{ 'tabs-options__item_highlighted_blue': isSaving }"
        @click="toggleSaving" :title="isSaving ? 'Save Deleted Tabs (Enabled)' : 'Save Deleted Tabs (Disabled)'">
        <i class="material-icons">save</i>
      </div>-->
    </div>
    <div class="tabs-options__menu" v-if="!isDeleting">
      <div class="tabs-options__menu__profile" @click="goToProfiles">{{profileTitles}} ({{profileMode}})</div>
    </div>
    <div class="tabs-options__menu" v-else>
      <div class="tabs-options__menu__bubble_helptext">Select tabs to save. Click icon again to confirm.</div>
    </div>
    <div class="tabs-options__menu">
      <div v-if="isSelecting" class="tabs-options__item" title="Cancel" @click="cancelAction">
        <i class="material-icons">close</i>
      </div>
      <!--<div v-if="!isSelecting" class="tabs-options__item" title="Open New Tab" @click="goAddTab">
        <i class="material-icons">add</i>
      </div>-->
      <div v-if="!isSelecting" class="tabs-options__item" title="Open Settings" @click="goToSettings">
        <i class="material-icons">settings</i>
      </div>
      <div class="tabs-options__item"
        :class="{ 'tabs-options__item_highlighted_red': isDeleting }"
        @click="toggleDeletion" :title="isDeleting ? 'Confirm Save' : 'Save Tabs'">
        <i class="material-icons" v-if="isDeleting">archive</i>
        <i class="material-icons" v-else>archive</i>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import browser from 'webextension-polyfill'

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
      stateHasUnreadMsg: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        profileRawMode: 'off',
        modeTitles: []
      }
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
      },
      goToSettings() {
        browser.tabs.create({ url: '/options/options.html' })
      },
      goToProfiles() {
        this.$router.push({ name: 'ChangeProfile' })
      },
      getCurrentProfile() {
        return browser.storage.local.get(["currentProfiles", "profiles"]).then(store => {
          this.modeTitles = store.currentProfiles
            .map(pid => _.find(store.profiles, { id: pid }))
            .map(p => p.name)
          
          this.profileRawMode = _.find(store.profiles, p => store.currentProfiles.indexOf(p.id) > -1).blockMode
        })
      },
      limitCharacterLength(str) {
        return str.length > 18 ? str.substr(0, 16) + '..' : str
      }
    },
    mounted() {
      this.getCurrentProfile()
    },
    computed: {
      isSelecting() {
        return this.isDeleting 
      },
      profileMode() {
        if (!this.profileRawMode) return 'Off'
        else if (this.profileRawMode === 'open') return 'Open'
        else if (this.profileRawMode === 'standard') return 'Standard'
        else if (this.profileRawMode === 'whitelist') return 'Whitelist'
        else if (this.profileRawMode === 'lockdown') return 'Lockdown'
        else return 'Off'
      },
      profileTitles() {
        if (this.modeTitles.length === 0) return 'No Profile'
        return this.limitCharacterLength(this.modeTitles.join(' ,'))
      }
    },
  }
</script>