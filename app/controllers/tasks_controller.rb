class TasksController < ApplicationController
  def index
    @tasks = Task.all.includes(:category).as_json(include: { category: { only: [:name] } })
  end

  def create
    category = Category.find_or_create_by(name: task_params["category"])
    task = Task.create(description: task_params["description"], category: category)
    render json: task
  end

  def destroy
    Task.destroy(params[:id])
  end

  def update
    task = Task.find(params[:id])
    category = Category.find(task_params["cat_id"])
    category.update(name: task_params["category"])
    task.update(description: task_params["description"], category: category)
    render json: task
  end

  private

  def task_params
    params.require(:task).permit(:id, :description, :category, :cat_id)
  end
end
