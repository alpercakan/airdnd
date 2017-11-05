class CreateRooms < ActiveRecord::Migration[5.1]
  def change
    create_table :rooms do |t|
      t.references :user, foreign_key: true
      t.datetime :created_when
      t.integer :seen_by_count
      t.string :description
      t.integer :price
      t.string :image_url

      t.timestamps
    end
  end
end
