class Api::V1::EventsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    if current_user
      user = current_user

      events = user.events.order(:id)

      render json: {events: events, user: current_user}
    else
      render body: "401 Unauthorized", status: 401
    end
  end

  def show
    if current_user
      event = Event.find(params[:id])
      if current_user == event.user
        songs = Song.where(event: event).order(:id)
        verses = {}

        songs.each do |song|
          verses[song.id] = Verse.where(song_id: song.id).order(:id)
        end

        render json: {songs: songs, verses: verses}
      end
    else
      render body: "401 Unauthorized", status: 401
    end
  end

  def update
    if current_user
      event = Event.find(params[:id])
      songs = nil
      if params[:in_progress] === true || params[:in_progress] === false
        event.update(in_progress: params[:in_progress])

        if params[:in_progress] === false
          songs = event.songs.order(:id)

          songs.each do |s|
            s.update(selected_verse_id: 0)
          end
        end
      end

      if params[:selected_song_id]
        event.update(selected_song_id: params[:selected_song_id])
      end

      if params[:title]
        event.update(
          title: params[:title],
          time: params[:time],
          user: current_user
        )
      end

      render json: {event: event, songs: songs}
    else
      render body: "401 Unauthorized", status: 401
    end
  end

  def create
    if current_user
      event = Event.create(
        title: params[:title],
        time: params[:time],
        user: current_user
      )

      render json: {event: event}
    else
      render body: "401 Unauthorized", status: 401
    end
  end

  def destroy
    if current_user
      event = Event.find(params[:id])
      event.destroy

      songs = Song.where(event: event)

      songs.each do |s|
        verses = Verse.destroy_all(song: s)
        s.destroy
      end

      render json: {event: event}
    else
      render body: "401 Unauthorized", status: 401
    end
  end
end
