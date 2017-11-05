class RemoveLockStartFromRooms < ActiveRecord::Migration[5.1]
  def change
    remove_column :rooms, :lock_start, :timestamp
  end
end
