class RemoveIntegerFromUsers < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :integer, :integer
  end
end
