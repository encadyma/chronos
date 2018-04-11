export default async function () {
  const storage = await browser.storage.local.get()
  let newStorage = {}

  if (!storage.states) 
    newStorage.states = []

  if (!storage.profiles)
    newStorage.profiles = [
      { id: 0, name: 'Default', blacklist: [], whitelist: false, blockMode: 'standard', default: true }
    ]
  
  if (!storage.currentProfiles)
    newStorage.currentProfiles = []
  
  if (!storage.shouldSimplifyProfileModes)
    newStorage.shouldSimplifyProfileModes = true

  await browser.storage.local.set(Object.assign(storage, newStorage))
}