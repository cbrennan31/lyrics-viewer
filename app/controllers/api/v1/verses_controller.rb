class Api::V1::VersesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    verse = Verse.create({
      lyrics: params[:lyrics],
      song: Song.find(params[:song_id])
    })

    render json: {verse: verse}
  end
end
