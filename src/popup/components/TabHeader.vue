<template>
  <div class="tabs-header">
    <div class="tabs-header__menu">
      <i class="material-icons tabs-header__menu__option" 
        :class="{ selected: routeName === 'Home' }"
        @click="goToRoute('Home')">home</i>
      <i class="material-icons tabs-header__menu__option"
        :class="{ selected: routeName === 'LoadState' }"
        @click="goToRoute('LoadState')">unarchive</i>
      <i class="material-icons tabs-header__menu__option"
        :class="{ selected: routeName === 'AddTab' }"
        @click="goToRoute('AddTab')">open_in_new</i>
    </div>
    <div class="tabs-header__menu">
      <span class="tabs-header__menu__profile"
        @click="goToRoute('ChangeProfile')"
        :class="{ active: routeName === 'ChangeProfile' }">{{profileTitles}} ({{profileMode}})</span>
      <i class="material-icons tabs-header__menu__option" @click="goToSettings">settings</i>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import browser from 'webextension-polyfill'

  export default {
    data() {
      return {
        modeTitles: [],
        profileRawMode: 'off',
      }
    },
    computed: {
      routeName() {
        return this.$route.name
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
    methods: {
      goToSettings() {
        browser.tabs.create({ url: '/options/options.html' })
      },
      goToRoute(routeName) {
        this.$router.push({ name: routeName })
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

      browser.storage.onChanged.addListener((changes, areaName) => {
        if (!changes.profiles && !changes.currentProfiles) return
        this.getCurrentProfile()
      })
    }
  }
</script>

<style scoped>
.tabs-header {
  display: flex;
  margin: 0 12px;
  justify-content: space-between;
}

.tabs-header__menu {
  display: flex;
  align-items: center;
}

.tabs-header__menu__option {
  border-bottom: 2px solid rgba(0, 0, 0, 0);
  color: rgb(100, 100, 100);
  cursor: pointer;
  font-size: 20px;
  padding: 6px 6px;
}

.tabs-header__menu__option:hover {
  border-bottom-color: rgb(100, 100, 100);
  background-color: rgba(100, 100, 100, 0.05);
}

.tabs-header__menu__option.selected {
  background-color: rgba(55, 135, 255, 0.1);
  border-bottom-color: rgb(55, 135, 255);
  color: rgb(55, 135, 255);
  cursor: default;
}

.tabs-header__menu__profile {
  background-color: rgba(100, 100, 100, 0.08);
  border-radius: 4px;
  border-bottom: 2px solid rgba(100, 100, 100, 0.1);
  cursor: pointer;
  color: rgb(100, 100, 100);
  font-size: 10px;
  padding: 3px 8px;
  min-width: 120px;
  text-align: center;
  margin: 0 10px;
}

.tabs-header__menu__profile:hover {
  background-color: rgba(100, 100, 100, 0.12);
}

.tabs-header__menu__profile.active {
  background-color: rgba(100, 100, 100, 0.15);
  cursor: default;
}
</style>