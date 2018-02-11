class Api::V1::SongsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    song = Song.create({
      title: params[:title],
      event: Event.find(params[:id])
    })

    render json: {song: song}
  end

  def update
    song = Song.find(params[:id])
    song.update(title: params[:title])

    render json: {song: song}
  end

  def destroy
    song = Song.find(params[:id])
    verses = Verse.where(song: song)

    if verses
      verses.each {|v| v.destroy}
    end

    song.destroy

    selected_song_id = nil

    if Song.first
      selected_song_id = Song.first.id
    end


    render json: {id: song.id, selected_song_id: selected_song_id}
  end
end
