#app/controllers/site_controller.rb

class SiteController < ApplicationController
  def index
    if session[:uid] != nil
      @username = User.find(session[:uid]).username
      @showRegisteredUserMenu = true
    else
      @showRegisteredUserMenu = false
    end
  end
end