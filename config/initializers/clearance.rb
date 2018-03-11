Clearance.configure do |config|
  config.cookie_domain = ".lyrics-viewer.com"
  config.rotate_csrf_on_sign_in = true
  config.routes = true
  config.allow_sign_up = true
  config.mailer_sender = "admin@lyrics-viewer.com"
end
