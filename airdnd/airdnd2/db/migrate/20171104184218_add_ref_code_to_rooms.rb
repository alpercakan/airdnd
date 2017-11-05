class AddRefCodeToRooms < ActiveRecord::Migration[5.1]
  def change
    add_column :rooms, :refCode, :string
  end
end
