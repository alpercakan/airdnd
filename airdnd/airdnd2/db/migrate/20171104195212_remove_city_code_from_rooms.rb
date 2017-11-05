class RemoveCityCodeFromRooms < ActiveRecord::Migration[5.1]
  def change
    remove_column :rooms, :cityCode, :integer
  end
end
