import Utils from './util'
import Handlers from './handlers'
import InitiateStorage from './storage'

// tabs.*:
browser.tabs.onCreated.addListener(Handlers.updateTabCount)
browser.tabs.onRemoved.addListener(Handlers.updateTabCountOnRemoval)

// Initiation Code
Handlers.updateTabCount()
InitiateStorage()
