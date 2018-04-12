import Utils from './util'
import Handlers from './handlers'
import Blocker from './blocker'
import InitiateStorage from './storage'

// tabs.*:
browser.tabs.onCreated.addListener(Handlers.updateTabCount)
browser.tabs.onRemoved.addListener(Handlers.updateTabCountOnRemoval)

// Filtering handlers
Blocker.assembleBlockedSites().then(() => {
  browser.tabs.onUpdated.addListener(Blocker.handleTabUpdate.bind(Blocker))
  browser.storage.onChanged.addListener(Blocker.handleStorageChange.bind(Blocker))
})

// Initiation Code
Handlers.updateTabCount()
InitiateStorage()
