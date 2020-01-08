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
    category.tasks.create(description: task_params["description"])
    tasks = Task.all.includes(:category).as_json(include: { category: { only: [:name] } })
    render json: tasks
  end

  def destroy
    Task.destroy(params[:id])
    tasks = Task.all.includes(:category).as_json(include: { category: { only: [:name] } })
    render json: tasks
  end

  def update
    # Get the find or create the new category
    newCategory = Category.find_or_create_by(name: task_params[:category_attributes][:name])
    # Query for the task
    task = Task.find(task_params[:id])
    # Get the old category
    oldCategory = Category.find(task.category_id)
    # Update the task
    task.update(description: task_params[:description], category_id: newCategory.id)
    # Delete the old category if it no longer has any child associations
    if oldCategory.tasks.empty?
      Category.destroy(oldCategory.id)
    end

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
