import browser from 'webextension-polyfill'

export default {
  getTabCount: async function (excludeTabId = -1) {
    const tabs = await browser.tabs.query({})
    return tabs.filter(t => t.id !== excludeTabId).length
  }
}