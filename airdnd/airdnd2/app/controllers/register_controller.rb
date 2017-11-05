class RegisterController < ApplicationController
  def index
    if session[:uid] != nil
      redirect_to 'http://localhost:3000'
    end
  end
end