class TasksController < ApplicationController
  def index
  end

  def show
    tasks = Task.all.includes(:category).as_json(include: { category: { only: [:name] } })
    render json: tasks
  end

  def filter
    if params[:cat_id] == "all"
      tasks = Task.all.includes(:category).as_json(include: { category: { only: [:name] } })
    else 
      tasks = Task.where(category_id: params[:cat_id]).includes(:category).as_json(include: { category: { only: [:name] } })
    end
    render json: tasks
  end


  def create
    category = Category.find_or_create_by(name: task_params["category"])
    Task.create(description: task_params["description"], category: category)
    tasks = Task.all.includes(:category).as_json(include: { category: { only: [:name] } })
    render json: tasks
  end

  def destroy
    Task.destroy(params[:id])
    tasks = Task.all.includes(:category).as_json(include: { category: { only: [:name] } })
    render json: tasks
  end

  def update
    task = Task.find(params[:id])
    task.update(task_params)
    tasks = Task.all.includes(:category).as_json(include: { category: { only: [:name] } })
    render json: tasks
  end

  def search
    results = Task.where("lower(description) LIKE ?", "%#{params[:search]}%".downcase).includes(:category).as_json(include: { category: { only: [:name] } })
    render json: results
  end

  private

  def task_params
    params.require(:task).permit(:id, :description, :category, category_attributes: [:id, :name])
  end
end
