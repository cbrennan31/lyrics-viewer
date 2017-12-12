class VersesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "verses"
  end

  def receive(data)
    Verse.all.each { |v| v.update(current: false) }

    lyrics = nil

    if Verse.find_by(id: data['id'].to_i)
      verse = Verse.find_by(id: data['id'].to_i)
      verse.update(current: true)
      lyrics = verse.lyrics
    end

    ActionCable.server.broadcast("verses", {
      lyrics: lyrics
    })
  end
end
