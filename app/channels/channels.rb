class LyricsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "lyrics_1"
  end

  def receive(data)
    verse = Verse.find_by(id: data['id'])
    verse.update(current: true)

    ActionCable.server.broadcast("lyrics_1", {
      lyrics: verse.lyrics
    })
  end
end
