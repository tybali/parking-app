Rails.application.routes.draw do
  namespace :admin do
    resources :customers
    resources :slots
    resources :parking_hours, only: [:index, :update]
    resources :reservations do
      member do
        post 'cancel'
      end
    end
  end

  namespace :customer do
    resources :slots, only: [:index, :show]
    resources :reservations, only: [:index, :show, :create] do
      member do
        post 'cancel'
      end
    end
  end

  resources :sessions, only: [:create]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "/" => "rails/health#show", as: :rails_health_check
  post '/auth/login', to: 'sessions#create'
  post '/auth/signup', to: 'users#create'

  # Defines the root path route ("/")
  # root "posts#index"
end



