<template>
  <div>
    <div class="profile-mode-switcher-container">
      <div class="profile-mode-switcher">
        <div 
          class="profile-mode-switcher__profile"
          v-for="m in filteredModes" :key="m.id" 
          :title="m.description" @click="changeMode(m.id)"
          :class="{ selected: m.id === mode, active: m.id === selectedMode && m.id !== mode }">{{m.name}}</div>
      </div>
      <div class="profile-mode-switcher-actions" v-if="!selectedNodeIsEqual">
        <i class="material-icons" @click="confirmMode">check</i>
        <i class="material-icons" @click="selectedMode = mode">close</i>
      </div>
    </div>
    <div class="text-sub profile-mode-switcher__description">
      <span>{{currentDescription}}</span>
      <b v-if="!selectedNodeIsEqual" style="color: rgba(220, 120, 50)"> - click the check mark to apply this mode.</b>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      mode: {
        type: String,
        default: 'standard'
      },
      requireConfirmation: {
        type: Boolean,
        default: true
      },
      uniqueKey: {
        type: [String, Number],
        default: 0
      }
    },
    data() {
      return {
        modes: [
          // { name: 'Off', id: 'off', description: 'Blocking is completely off. (Off)' },
          { name: 'Open', id: 'open', description: 'Blocking is loosely enforced by blacklist. Blacklisted sites can be visited temporarily and added to the white list. (Loose)', isBasicOption: false },
          { name: 'Standard', id: 'standard', description: 'Blocking is enforced by blacklist. All blacklisted sites cannot be accessed. (Standard)', isBasicOption: true },
          { name: 'Whitelist', id: 'whitelist', description: 'Follow the profile\'s whitelist and prompt users case-by-case when visiting non-whitelisted websites. (Strict)', isBasicOption: false },
          { name: 'Lockdown', id: 'lockdown', description: 'Follow the profile\'s whitelist strictly & block out all other sites. (Most Strict)', isBasicOption: true },
        ],
        selectedMode: this.mode,
        shouldShowAllModes: false
      }
    },
    methods: {
      changeMode(newMode) {
        this.selectedMode = newMode
        if (!this.requireConfirmation) this.confirmMode()
      },
      confirmMode() {
        this.$emit('changeMode', this.selectedMode)
      }
    },
    computed: {
      currentDescription() {
        return this.modes.find(m => m.id === this.selectedMode).description
      },
      selectedNodeIsEqual() {
        return this.selectedMode === this.mode
      },
      filteredModes() {
        return this.shouldShowAllModes ? this.modes : this.modes.filter(m => m.isBasicOption)
      }
    },
    mounted() {
      browser.storage.local.get("shouldSimplifyProfileModes")
        .then(({ shouldSimplifyProfileModes }) => this.shouldShowAllModes = !shouldSimplifyProfileModes)
    },
    watch: {
      uniqueKey() {
        this.selectedMode = this.mode
      }
    }
  }
</script>

<style scoped>
@keyframes blinking-profile-mode {
  from { background-color: rgba(220, 120, 50, 0.15); }
  to { background-color: rgba(220, 120, 50, 0.08); }
}

.profile-mode-switcher-container {
  display: flex;
  align-items: center;
  font-size: 14px;
}

.profile-mode-switcher {
  border-radius: 2px;
  display: inline-block;
  padding: 4px;
  background-color: #fdfdfd;
}

.profile-mode-switcher__profile {
  border-radius: 2px;
  cursor: pointer;
  display: inline-block;
  padding: 6px 15px;
  margin: 0 2px;
}

.profile-mode-switcher__profile:hover {
  background-color: #eaeaea;
}

.profile-mode-switcher__profile.selected {
  background-color: rgba(55, 135, 255, 0.2);
  color: rgba(55, 135, 255);
  cursor: default;
  font-weight: 600;
  animation: none !important;
}

.profile-mode-switcher__profile.active {
  background-color: rgba(220, 120, 50, 0.2);
  color: rgba(220, 120, 50);
  cursor: default;
  animation: blinking-profile-mode alternate 300ms infinite ease;
}

.profile-mode-switcher__description {
  font-size: 12px;
  line-height: 1.4;
  max-width: 400px;
  margin: 4px 0;
}

.profile-mode-switcher-actions {
  display: flex;
  margin-left: 20px;
}

.profile-mode-switcher-actions .material-icons {
  color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  margin-right: 4px;
}

.profile-mode-switcher-actions .material-icons:hover {
  color: rgba(0, 0, 0, 0.8);
}
</style>