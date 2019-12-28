class RemoveCategoryFromTasks < ActiveRecord::Migration[6.0]
  def change

    remove_column :tasks, :category, :string
  end
end
