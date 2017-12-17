class EventsController < ApplicationController
  def show
    @event = Event.find(params[:id])
    @songs = Song.where(event: @event)
    @verses = []
    @songs.each do |song|
      @verses << Verse.where(song: song).order(:id)
    end
  end
end
