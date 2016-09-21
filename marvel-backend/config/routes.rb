Rails.application.routes.draw do
  devise_for :users , :controllers => {
                                        :registrations => "registrations",
                                        :sessions=>'sessions'
                                    }
  resources :upvotes do
    post :toggle, on: :collection
  end
  resources :characters, only: [:index, :show], controller: 'marvel/characters'
  resources :comics, only: [:index, :show], controller: 'marvel/comics'

  resources :publishing_houses
  resources :authors
  resources :books
  resources :users

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
