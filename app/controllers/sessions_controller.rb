class SessionsController < Clearance::SessionsController
  def url_after_create
    events_path
  end
end
