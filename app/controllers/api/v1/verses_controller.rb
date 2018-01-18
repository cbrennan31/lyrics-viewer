class Api::V1::VersesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    text = params[:lyrics]
    require "google/cloud/translate"

    translate = Google::Cloud::Translate.new project: ENV["TRANSLATE_PROJECT"]
    detection = translate.detect text

    verse = Verse.create({
      lyrics: text,
      song: Song.find(params[:song_id]),
      code: detection.language
    })

    render json: {verse: verse}
  end
end
