Rails.application.routes.draw do

  root 'verses#index'

  resources :passwords, only: [:create, :new]

  resource :session, only: [:create, :new]

  resources :users,
    controller: 'clearance/users',
    only: Clearance.configuration.user_actions do
      resource :password,
        controller: 'clearance/passwords',
        only: [:create, :edit, :update]
    end

  get '/sign_in' => 'sessions#new', as: 'sign_in'
  get "/sign_out" => "clearance/sessions#destroy", as: "sign_out"


  if Clearance.configuration.allow_sign_up?
    get '/sign_up' => 'clearance/users#new', as: 'sign_up'
  end

  resources :events, only: [:index, :show]
  resources :songs, only: [:show]

  namespace :api do
    namespace :v1 do
      resources :songs, only: [:create, :update, :destroy]
      resources :events, only: [:index, :show, :update, :create, :destroy]
      resources :translations, only: [:create, :index]
      resources :verses, only: [:create, :update, :destroy]
    end
  end
end
