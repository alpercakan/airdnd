class RemoveResponseCountFromUsers < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :response_count, :string
  end
end
