class RoompostController < ApplicationController
  def index
    @uid = session[:uid]

    if @uid.nil?
      redirect_to 'http://localhost:3000'
    end
  end
end