class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password
      t.datetime :registered_when
      t.integer :total_response_time
      t.string :response_count
      t.string :integer
      t.string :total_rating
      t.string :integer
      t.string :rating_count
      t.string :integer
      t.string :email

      t.timestamps
    end
  end
end
