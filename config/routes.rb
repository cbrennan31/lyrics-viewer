Rails.application.routes.draw do
  root 'lyrics#index'

  resources :events, only: [:index, :show]
  resources :lyrics, only: [:index]
  resources :songs, only: [:show]

  # namespace :api do
  #   namespace :v1 do
  #     resources :user_games, only: [:create, :index, :update, :show, :destroy]
  #     resources :games, only: [:create]
  #     resources :users, only: [:show]
  #     resources :clues, only: [:create]
  #     resources :user_clues, only: [:destroy]
  #   end
  # end
end
