import browser from 'webextension-polyfill'
import Utils from './util'

export default {
  tabUpdated: async function (tabId, changedInfo, tab) {
    // console.log(changedInfo)
  },
  tabCreated: async function () {
    // console.log('tab count: ' + await Utils.getTabCount())
  },
  updateTabCount: async function () {
    const count = await Utils.getTabCount()
    browser.browserAction.setBadgeText({text: `${count}`})
  },
  updateTabCountOnRemoval: async function (tabId) {
    // To handle browser inconsistency in detecting
    // if a tab had fully been removed or not,
    // we will pass in the tab id being removed.
    const count = await Utils.getTabCount(tabId)
    browser.browserAction.setBadgeText({text: `${count}`})
  }
}