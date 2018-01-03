class Api::V1::EventsController < ApplicationController
  skip_before_action :verify_authenticity_token
  def show
    event = Event.find(params[:id])
    songs = Song.where(event: event).order(:id)
    verses = []
    songs.each do |song|
      verses << Verse.where(song: song).order(:id)
    end

    render json: {songs: songs, verses: verses}
  end
end
