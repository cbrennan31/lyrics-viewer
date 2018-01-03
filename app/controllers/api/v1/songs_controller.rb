class Api::V1::SongsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    song = Song.create({
      title: params[:title],
      event: Event.find(params[:id])
    })

    verses = Verse.where(song: song)
    render json: {song: song, verses: verses}
  end

  def update
    song = Song.find(params[:id])
    song.update(title: params[:title])

    render json: {song: song}
  end
end
