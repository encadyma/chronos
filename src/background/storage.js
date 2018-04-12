export default async function () {
  const storage = await browser.storage.local.get()
  let newStorage = {}

  if (!storage.states) 
    newStorage.states = []

  if (!storage.profiles)
    newStorage.profiles = [
      { id: 0, name: 'Default', icon: 'language', color: 'black', blacklist: [], whitelist: [], blockMode: 'standard', default: true, isDeleted: false }
    ]
  
  if (!storage.currentProfiles)
    newStorage.currentProfiles = []
  
  if (!storage.shouldSimplifyProfileModes)
    newStorage.shouldSimplifyProfileModes = true

  await browser.storage.local.set(Object.assign(storage, newStorage))
}