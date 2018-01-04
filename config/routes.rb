Rails.application.routes.draw do

  root 'verses#index'

  resources :events, only: [:index, :show]
  resources :verses, only: [:index]
  resources :songs, only: [:show]

  namespace :api do
    namespace :v1 do
      resources :songs, only: [:create, :update]
      resources :events, only: [:show]
      resources :verses, only: [:create]
    end
  end
end
