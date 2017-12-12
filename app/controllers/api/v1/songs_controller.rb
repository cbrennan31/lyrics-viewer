class Api::V1::SongsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def show
    song = Song.find(song[:id])
    verses = Verses.where(song: song)

    render json: {song: song, clues: clues}
  end
end
