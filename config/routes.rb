Rails.application.routes.draw do
  post '/rate' => 'rater#create', :as => 'rate'
  resources :remembered_words
  resources :video_sets do
    member do
      get 'add_video'
    end
  end
  devise_for :users
  resources :users
  get '/about', to: 'static_pages#about'
  get '/contact', to: 'static_pages#contact'
  get '/login', to: 'users#index'
  get '/watch/:id', to: 'video_sets#show'
  get '/watch/:id/add', to: 'video_sets#add_video'
  post'/watch/:id/add', to: 'video_sets#add_video_post'
  get '/r/:word', to: 'remembered_words#remember'
  get '/mydict', to: 'remembered_words#my_dict'
  resources :videos do
    member do
      get 'unsign'
    end
  end
  resources :words
  get '/translate/:text', to: 'words#fetch'
get '/t/:word', to: 'words#translate'
get '/', to: 'video_sets#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
