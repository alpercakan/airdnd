
class Api::V1::ReviewsController < Api::V1::BaseController
  def reviewsFor
    respond_with Review.where('room_id = ?', params[:id])
  end

  def create
    if session[:uid].nil?
      respond_with nil
    end

    create_params = review_params
    create_params[:user_id] = session[:uid]

    respond_with :api, :v1, Review.create(create_params)
  end

  def index
    respond_with Review.all
  end

  private

  def review_params
    params.require('review').permit(:room_id, :body)
  end
end