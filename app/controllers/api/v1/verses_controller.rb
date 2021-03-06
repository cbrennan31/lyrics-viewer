class Api::V1::VersesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    if current_user
      verse = Verse.create({
        lyrics: params[:lyrics],
        song: Song.find(params[:song_id]),
        code: detected_language(params[:lyrics])
      })

      render json: {verse: verse}
    else
      render body: "401 Unauthorized", status: 401
    end
  end

  def update
    if current_user
      verse = Verse.find(params[:verse_id])

      verse.update({
        lyrics: params[:lyrics],
        code: detected_language(params[:lyrics])
      })

      render json: {verse: verse}
    else
      render body: "401 Unauthorized", status: 401
    end
  end

  def destroy
    if current_user
      verse = Verse.find(params[:id])
      verse.destroy

      render json: {verse: verse}
    else
      render body: "401 Unauthorized", status: 401
    end
  end

  private

  def detected_language(text)
    require "google/cloud/translate"
    translate = Google::Cloud::Translate.new project: ENV["TRANSLATE_PROJECT"]
    detection = translate.detect text

    detection.language
  end
end
