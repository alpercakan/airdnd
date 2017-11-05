class RemoveTotalRatingFromUsers < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :total_rating, :string
  end
end
