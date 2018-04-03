module.exports = async function () {
  const storage = await browser.storage.local.get()
  let newStorage = {}

  if (!storage.states) 
    newStorage.states = []

  await browser.storage.local.set(Object.assign(storage, newStorage))
}