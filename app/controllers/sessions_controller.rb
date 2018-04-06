class SessionsController < Clearance::SessionsController
  def url_after_create
    events_path
  end

  def new
    if signed_in?
      redirect_to url_for_signed_in_users
    end
    render template: "sessions/new"
  end
end
