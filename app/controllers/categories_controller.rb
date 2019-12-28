class CategoriesController < ApplicationController
    def index
    end

    def create
        task = Task.create(task_params)
        # task = Category.tasks.create(task_params[:description])
    end

    def task_params
        params.require(:task).permit(:id, :description, :category)
    end
end
