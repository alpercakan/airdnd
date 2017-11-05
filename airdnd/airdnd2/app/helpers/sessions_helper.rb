module SessionsHelper

  def log_in(user)
    session[:uid] = user.id
  end
end
