Rails.application.routes.draw do

  root 'verses#index'

  resources :users do
    resources :events, only: [:index, :show]
  end
  
  resources :text, only: [:index]
  resources :songs, only: [:show]

  namespace :api do
    namespace :v1 do
      resources :songs, only: [:create, :update, :destroy]
      resources :events, only: [:index, :show, :update, :create]
      resources :translations, only: [:create, :index]
      resources :verses, only: [:create, :update, :destroy]
    end
  end
end
