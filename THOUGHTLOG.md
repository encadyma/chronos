THOUGHTLOG
===============

Description: A productive tab manager doubling as a website blocker. Let online work flow like time.

# Features

### Fundamental (must-do) -- v1 (✓)
- Tracks current tabs (✓)
- Popup shows what tabs are present (✓)
- Modifier toolbar (✓)
  - Add Tab (✓)
  - Delete Tab (✓)

### Data Storage -- v2 (wip)
- Data storage system should track tab history (on hold)
  - Should track:
    - When a user creates a new tab (HISTORY_TAB_CREATE)
    - When a user deletes a new tab (HISTORY_TAB_REMOVE)
    - When a user navigates to a different site (HISTORY_TAB_NAVIGATE)
    - Timestamp (:timestamp)
    - Tab ID (:id)
    - NOTE: Intercept this during a session restore or a state restore,
      and use:
      - Session Restore (Firefox) - HISTORY_RESTORE_SESSION
      - State Restore (Chronos) - HISTORY_RESTORE_STATE
    - A new "History" page (list based, no visual)
- States (wip)
  - Automatically save last deleted tabs as 'last deleted state' (✓)
  - Ability to save current tab state (and restore it) (wip)
  - ~~Ability to save a tab for later~~ (is needed?)
  - Ability to "quick-switch" out of states (wip)

### Profiles -- v3
- Profiles dictate what sites the user can access, or what sites should be blocked
  - Whitelist & Blocklist
- Different modes of working with a profile
  - Lockdown: Follow the Profile's whitelist strictly & block out all other sites. (Most Strict)
  - Whitelist: Follow the profile's whitelist and prompt users case-by-case when visiting non-whitelisted websites. (Strict)
  - Blacklist: Blocking is enforced by blacklist. No changes can be made to lists. (Standard)
  - Open: Blocking is loosely enforced by blacklist. Sites can be visited temporarily and added to the white list. (Loose)
  - Off: Blocking is completely off. (Off)
- Simple Icons for Profiles

### Lists -- v4 (should be included?)
- Common websites that the user visits

### Full Release -- v5
- Home page for quick actions
- Visual Timeline feature
- Suggested Sites to go based on profile
- A marker based on whether the person has visited the page before
  - https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/history/getVisits

### Awesome -- v6
- Folders, Subfolders for States
- For big States: Instead of restoring all pages, load a single page with list of tab names
- Custom Block pages
  - Basic Blocked Page
  - Recommended Sites Page
  - Motivational Quote Page
  - Scoreboard Page
  - Random Codepen Page
  - Awwwards Website Page
  - Random Algorithm Page
- Theming the Options Page
- Different Themes for Different Profiles
- Time limits in profiles
- Tab reorganization? (by site domain)
- Show whether the tab is currently "sleeping" (not loaded)
- Show whether the tab is playing music
- Shortcuts for opening the popup
- Search through tabs

### Buglist -- vNOW
- Windows do not activate/focus when switching tabs across windows
- When transitioning to LoadStates page, the window adjusts width slightly.. readjust min-width instead
- Get rid of "You are running Vue in development mode." message