class Api::V1::SongsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    if current_user
      song = Song.create({
        title: params[:title],
        event: Event.find(params[:id])
      })

      render json: {song: song}
    else
      render body: "401 Unauthorized", status: 401
    end
  end

  def update
    if current_user
      song = Song.find(params[:id])

      if params[:title]
        song.update(title: params[:title])
      end

      if params[:selected_verse_id]
        song.update(selected_verse_id: params[:selected_verse_id])
      end

      render json: {song: song}
    else
      render body: "401 Unauthorized", status: 401
    end
  end

  def destroy
    if current_user
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

      render json: {song: song, selected_song_id: selected_song_id}
    else
      render body: "401 Unauthorized", status: 401
    end
  end
end
