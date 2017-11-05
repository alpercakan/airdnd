class RemoveRegisteredWhenFromUsers < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :registered_when, :datetime
  end
end
