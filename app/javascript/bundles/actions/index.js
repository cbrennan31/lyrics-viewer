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

export const setVerseIDs = (verses) => ({
  type: 'SET_VERSE_IDS',
  verseIDs: verses.map((verse) => verse.id)
})

export const handlePrevious = (verseIDs, currentVerse, callback) => {
  let newVerse = 0

  if (currentVerse != verseIDs[0]) {
      let indexOfCurrentVerseID = verseIDs.indexOf(currentVerse)
      indexOfCurrentVerseID -= 1
      newVerse = verseIDs[indexOfCurrentVerseID]
  }

  callback(newVerse)

  return {
    type: 'HANDLE_PREVIOUS',
    currentVerse: newVerse
  }
}

export const handleNext = (verseIDs, currentVerse, callback) => {
  let newVerse = 0

  if (currentVerse != verseIDs[verseIDs.length - 1]) {
    if (currentVerse == 0) {
      newVerse = verseIDs[0]
    }
    let indexOfCurrentVerseId = verseIDs.indexOf(currentVerse)
    indexOfCurrentVerseId += 1
    newVerse = verseIDs[indexOfCurrentVerseId]
  }

  callback(newVerse)

  return {
    type: 'HANDLE_NEXT',
    currentVerse: newVerse
  }
}

export const startEvent = (id, callback) => {
  callback(id)
  return {
    type: 'START_EVENT',
    id
  }
}

export const endEvent = (callback) => {
  callback()
  return {
    type: 'END_EVENT'
  }
}

export const addSong = () => ({
  type: 'ADD SONG'
})
