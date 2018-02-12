class Api::V1::EventsController < ApplicationController
  skip_before_action :verify_authenticity_token
  def show
    event = Event.find(params[:id])
    songs = Song.where(event: event).order(:id)
    verses = {}

    songs.each do |song|
      verses[song.id] = Verse.where(song_id: song.id).order(:id)
    end

    render json: {songs: songs, verses: verses}
  end

  def update
    event = Event.find(params[:id])

    if params[:in_progress] === true || params[:in_progress] === false
      event.update(in_progress: params[:in_progress])
    end

    if params[:selected_song_id]
      event.update(selected_song_id: params[:selected_song_id])
    end

    render json: {event: event}
  end
end
