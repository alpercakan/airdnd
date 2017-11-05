class AddTotalRatingToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :total_rating, :integer
  end
end
