class AddAvailableToRooms < ActiveRecord::Migration[5.1]
  def change
    add_column :rooms, :available, :boolean
  end
end
