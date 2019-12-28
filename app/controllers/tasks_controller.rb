class TasksController < ApplicationController
  def index
    render json: Task.all
  end

  def create
    category = Category.find_or_create_by(name: task_params["category"])
    cat_id = category["id"]
    task = Task.create({"description"=>task_params["description"], "category_id"=>cat_id})
    render json: task
  end

  def destroy
    Task.destroy(params[:id])
  end

  def update
    task = Task.find(params[:id])
    task.update_attributes(task_params)
    render json: task
  end

  private

  def task_params
    params.require(:task).permit(:id, :description, :category)
  end
end
