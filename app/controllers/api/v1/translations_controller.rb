class Api::V1::TranslationsController < ApplicationController
  skip_before_action :verify_authenticity_token
  def create
    text = params[:text]
    code = params[:code]
    require "google/cloud/translate"
    translate = Google::Cloud::Translate.new project: ENV["TRANSLATE_PROJECT"]
    translation = translate.translate text, to: code

    render json: {translation: translation}
  end
end
