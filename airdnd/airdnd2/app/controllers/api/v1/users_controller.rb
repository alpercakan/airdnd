#users_controller.rb

class Api::V1::UsersController < Api::V1::BaseController
  def index
    respond_with User.all
  end

  def create
    create_params = user_params
    create_params['password'] = Digest::MD5.hexdigest(create_params['password'])

    create_params['total_response_time'] = 0
    create_params['response_count'] = 0
    create_params['total_rating'] = 0
    create_params['rating_count'] = 0

    respond_with :api, :v1, User.create(create_params)
  end

  def destroy
    respond_with User.destroy(params[:id])
  end

  def update
    user = User.find(params['id'])
    user.update_attributes(user_params)

    respond_with user, json: user
  end

  def exists
    user = User.find_by_username(params['username'])
    respond_with exists: !user.nil?
  end

  def getName
    respond_with User.find_by_id params['id']
  end

  private

  def user_params
    params.require(:user).permit(:username,
                                 :password,
                                 :email)
  end
end