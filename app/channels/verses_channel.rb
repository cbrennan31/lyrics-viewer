class VersesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "verses"
  end

  def receive(data)
    lyrics = nil
    event_title = nil
    code = 'en'
# change id to a diff variable name
    if data['id']

      if Event.find_by(in_progress: true)
        event_title = Event.find_by(in_progress: true).title
      end

      Verse.all.each { |v| v.update(current: false) }

      if data['id'] > 0
        verse = Verse.find(data['id'])
        verse.update(current: true)
        lyrics = verse.lyrics
        code = verse.code
      end
    end

    if data['current_event']
      if data['current_event'] > 0
        current_event = Event.find(data['current_event'])
        current_event.update(in_progress: true)
        event_title = current_event.title
      else
        Event.all.each { |v| v.update(in_progress: false) }
        Verse.all.each { |v| v.update(current: false) }
      end
    end

    ActionCable.server.broadcast("verses", {
      lyrics: lyrics,
      current_event: event_title,
      code: code
    })
  end
end
