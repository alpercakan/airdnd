require 'json'

class Api::V1::SessionsController < Api::V1::BaseController
  def create
    user = User.find_by(username: params[:username].downcase)

    if user === nil
      result = false
    else
      result = user[:password] == Digest::MD5.hexdigest(params[:password])
    end

    if result
      log_in user
    end

    render json: { success: result }
  end

  def destroy

  end
end
