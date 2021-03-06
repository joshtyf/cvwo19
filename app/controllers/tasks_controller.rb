class TasksController < ApplicationController
  before_action :set_task, only: %i[ show edit update destroy ]

  # GET /tasks or /tasks.json
  def index
    tasks = Task.all.sort_by(&:created_at).reverse
    render json: tasks
  end

  # GET /tasks/1 or /tasks/1.json
  def show
    @task = Task.find(params[:id])
    render json: @task
  end

  # GET /tasks/new
  def new
    @task = Task.new
  end

  # GET /tasks/1/edit
  def edit
  end

  # POST /tasks or /tasks.json
  def create
    @task = Task.new(task_params)

    if @task.save
      render json: @task
    else
      render error: { error: 'Unable to create Task.' }, status: 400
    end
  end

  # PATCH/PUT /tasks/1 or /tasks/1.json
  def update
    @task =  Task.find(params[:id])
    if @task
      @task.toggle!(:completed)
      render json: { message: 'Task successfully updated' }, status: 200
    else
      render json: { error: 'Unable to update Task' }, status: 400
    end
  end

  # DELETE /tasks/1 or /tasks/1.json
  def destroy
    @task = Task.find(params[:id])
    if @task
      @task.destroy
      render json: { message: 'Task successfully deleted.' }, status: 200
    else
      render json: { error: 'Unable to delete Task' }, status: 400
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_task
      @task = Task.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def task_params
      params.require(:task).permit(:title, :description, :completed)
    end
end
