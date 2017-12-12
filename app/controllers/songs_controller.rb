class SongsController < ApplicationController
  def show
    @song = Song.find(params[:id])
    @verses = Verse.where(song: @song).order(:id)
  end
end
