class VersesController < ApplicationController
  def index
    @lyrics = nil
    @current_event = nil

    if Verse.find_by(current: true)
      @lyrics = Verse.find_by(current: true).lyrics
    end

    if Event.find_by(in_progress: true)
      @current_event = Event.find_by(in_progress: true).title
    end
  end
end
