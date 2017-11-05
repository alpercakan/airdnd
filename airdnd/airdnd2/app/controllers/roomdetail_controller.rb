class RoomdetailController < ApplicationController
  def index
    @room = Room.find_by_refCode(params[:code])
    @room.seen_by_count = Room.find_by_refCode(params[:code]).seen_by_count + 1

    @room.save

    @isLoggedIn = !session[:uid].nil?
  end
end