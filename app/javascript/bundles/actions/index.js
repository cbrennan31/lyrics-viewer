export const selectSong = (id) => ({
  type: 'SELECT_SONG',
  id
})

export const subscribe = (cable) => ({
  type: 'SUBSCRIBE_TO_CHANNEL',
  subscription: cable.subscriptions.create({
    channel: "VersesChannel"
  })
})
