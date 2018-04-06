class PasswordsController < Clearance::PasswordsController
  def url_after_update
    events_path
  end
end
