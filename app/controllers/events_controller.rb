class EventsController < ApplicationController
  def redirect_unauthorized_user
    if !current_user
      redirect_to sign_in_path
    end
  end

  def show
    @event = Event.find(params[:id])

    redirect_unauthorized_user
  end

  def index
    redirect_unauthorized_user
  end
end
