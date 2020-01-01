Rails.application.routes.draw do
  # get 'welcome/index'
  root 'tasks#index'
  get 'show', to: 'tasks#show'
  post 'create', to: 'tasks#create'
  delete 'delete/:id(.:format)', to: 'tasks#destroy'
  put 'update/:id(.:format)', to: 'tasks#update'
  post 'search', to: 'tasks#search'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
