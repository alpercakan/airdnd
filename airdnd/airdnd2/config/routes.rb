Rails.application.routes.draw do
  root to: 'site#index'

  get '/login', to: 'login#index'
  get '/register', to: 'register#index'
  get '/roomdetail', to: 'roomdetail#index'
  get '/roompost', to: 'roompost#index'

  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :create, :destroy, :update]
      resources :rooms, only: [:index, :create, :destroy, :update]
      resources :reviews, only: [:index, :create, :destroy, :update]
      resources :sessions, only: [:create, :destroy]

      get '/users/exists', to: 'users#exists'
      get '/users/get_name', to: 'users#getName'
      get '/cities', to: 'cities#list'
      get '/cities/by_index', to: 'cities#findByIndex'
      get '/rooms/by_ref', to: 'rooms#findByCode'
      get '/rooms/find', to: 'rooms#find'
      get '/reviews/reviews_for', to: 'reviews#reviewsFor'
      get '/rooms/is_locked', to: 'rooms#isLocked'
      post '/rooms/lock', to: 'rooms#lock'
      post '/rooms/unlock', to: 'rooms#unlock'
      post '/rooms/rent', to: 'rooms#rent'
    end
  end
end
