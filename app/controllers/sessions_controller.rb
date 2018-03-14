class SessionsController < Clearance::SessionsController
  def url_after_create
    "/users/#{current_user.id}/events"
  end
end
