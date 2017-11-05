class AddLockStartToRooms < ActiveRecord::Migration[5.1]
  def change
    add_column :rooms, :lock_start, :integer
  end
end
