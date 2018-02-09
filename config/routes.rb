Rails.application.routes.draw do

  root 'verses#index'

  resources :events, only: [:index, :show]
  resources :text, only: [:index]
  resources :songs, only: [:show]

  namespace :api do
    namespace :v1 do
      resources :songs, only: [:create, :update, :destroy]
      resources :events, only: [:show, :update]
      resources :translations, only: [:create, :index]
      resources :verses, only: [:create, :update, :destroy]
    end
  end
end
