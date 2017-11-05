class AddRoomLockStartToRooms < ActiveRecord::Migration[5.1]
  def change
    add_column :rooms, :room_lock_start, :integer
  end
end
