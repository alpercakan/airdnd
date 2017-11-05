class AddCityCodeToRooms < ActiveRecord::Migration[5.1]
  def change
    add_column :rooms, :city_code, :integer
  end
end
