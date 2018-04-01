import Utils from './util'
import Handlers from './handlers'

// tabs.*:
browser.tabs.onCreated.addListener(Handlers.updateTabCount)
browser.tabs.onRemoved.addListener(Handlers.updateTabCountOnRemoval)

// Initiation Code
Handlers.updateTabCount()

// Broadcast to the user that we're live.
console.log('Chronos has loaded!')