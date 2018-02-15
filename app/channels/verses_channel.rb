class VersesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "verses"
  end

  def receive(data)
    lyrics = nil
    event_title = nil
    code = 'en'
    
    if data['selected_verse_id']

      if Event.find_by(in_progress: true)
        event_title = Event.find_by(in_progress: true).title
      end

      if data['selected_verse_id'] > 0
        verse = Verse.find(data['selected_verse_id'])
        lyrics = verse.lyrics
        code = verse.code
      end
    end

    if data['current_event']
      current_event = Event.find_by(in_progress: true)
      event_title = current_event.title
    end

    ActionCable.server.broadcast("verses", {
      lyrics: lyrics,
      current_event: event_title,
      code: code
    })
  end
end
