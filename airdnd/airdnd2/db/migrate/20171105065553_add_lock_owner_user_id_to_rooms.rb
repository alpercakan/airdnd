class AddLockOwnerUserIdToRooms < ActiveRecord::Migration[5.1]
  def change
    add_column :rooms, :lock_owner_user_id, :integer
  end
end
