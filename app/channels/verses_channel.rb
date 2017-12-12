class VersesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "verses"
  end

  def receive(data)
    Verse.all.each { |v| v.update(current: false) }
    verse = Verse.find_by(id: data['id'].to_i)
    verse.update(current: true)

    ActionCable.server.broadcast("verses", {
      lyrics: verse.lyrics
    })
  end
end
