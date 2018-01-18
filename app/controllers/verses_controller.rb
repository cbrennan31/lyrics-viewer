class VersesController < ApplicationController
  def index
    @lyrics = nil
    @current_event = nil
    @code = nil

    verse = Verse.find_by(current: true)

    if verse
      @lyrics = verse.lyrics
      @code = verse.code
    end

    if Event.find_by(in_progress: true)
      @current_event = Event.find_by(in_progress: true).title
    end
  end
end
