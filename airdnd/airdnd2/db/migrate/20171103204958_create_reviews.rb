class CreateReviews < ActiveRecord::Migration[5.1]
  def change
    create_table :reviews do |t|
      t.text :body
      t.references :room, foreign_key: true
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
