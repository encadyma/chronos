import Utils from './util'
import _ from 'lodash'

let _blockerConfig = {
  init: false,
  blockMode: 'off',
  activeList: [],
  blacklist: [],
  whitelist: [],
  cachedTabs: []
}

export default {
  assembleBlockedSites: async function () {
    const { profiles, currentProfiles } = await browser.storage.local.get(["profiles", "currentProfiles"])
    const blockMode = _.find(profiles, p => currentProfiles.indexOf(p.id) > -1).blockMode

    const whitelist = _.flatten(profiles
      .filter(p => currentProfiles.indexOf(p.id) !== -1 && this.usesWhitelist(p.blockMode))
      .map(p => p.whitelist))
    const blacklist = _.flatten(profiles
      .filter(p => currentProfiles.indexOf(p.id) !== -1 && this.usesBlacklist(p.blockMode))
      .map(p => p.blacklist))

    const activeList = this.usesBlacklist(blockMode) ? blacklist : whitelist

    _blockerConfig = { blockMode, whitelist, blacklist, activeList, cachedTabs: [], init: true }

    console.log(_blockerConfig)

    return true
  },
  usesBlacklist: function (mode) {
    return ['standard', 'open'].indexOf(mode) !== -1
  },
  usesWhitelist: function (mode) {
    return ['whitelist', 'lockdown'].indexOf(mode) !== -1
  },
  handleTabUpdate: async function (tabId, changedInfo, tab) {
    if (!_blockerConfig.init) return
    if (!changedInfo.url) return
    if (!this.linkTestRegex.test(changedInfo.url)) return
    if (_blockerConfig.cachedTabs.indexOf(tabId) > -1) return

    const protocol = this.linkSeparatorRegex.exec(changedInfo.url)[2]
    const hostname = this.getUniqueHostname(this.linkSeparatorRegex.exec(changedInfo.url)[4])

    if (protocol === "moz-extension") return

    const foundInActiveList = _blockerConfig.activeList.indexOf(hostname) > -1
    
    if (this.usesBlacklist(_blockerConfig.blockMode) && foundInActiveList) {
      await browser.tabs.update(tabId, { url: `/blocker/blocker.html#/block?hostname=${hostname}`, loadReplace: true })
    } else if (this.usesWhitelist(_blockerConfig.blockMode) && !foundInActiveList) {
      await browser.tabs.update(tabId, { url: `/blocker/blocker.html#/block?hostname=${hostname}`, loadReplace: true })
    }
  },
  getConfig: function () {
    return _blockerConfig
  },
  handleStorageChange: async function (changes, areaName) {
    if (!changes.profiles && !changes.currentProfiles) return false
    return this.assembleBlockedSites()
  },
  linkSeparatorRegex: /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/,
  linkTestRegex: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
  getUniqueHostname: function (hostname) {
    let split = hostname.split(".")

    if (split.length === 3 && split[0] === 'www') split.shift()

    return split.join(".")
  }
}