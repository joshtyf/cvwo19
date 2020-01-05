class CategoriesController < ApplicationController
    def index
    end

    def show
        categories = Category.all
        render json: categories
    end
end
