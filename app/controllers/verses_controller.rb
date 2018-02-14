class VersesController < ApplicationController
  def index
    @lyrics = nil
    @current_event = nil
    @code = 'en'

    selected_song = Song.where("selected_verse_id > 0").last

    if selected_song
      verse = Verse.find(selected_song.selected_verse_id)
      @lyrics = verse.lyrics
      @code = verse.code
    end

    if Event.find_by(in_progress: true)
      @current_event = Event.find_by(in_progress: true).title
    end
  end
end
