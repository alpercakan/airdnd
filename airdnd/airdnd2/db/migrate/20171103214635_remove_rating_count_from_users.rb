class RemoveRatingCountFromUsers < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :rating_count, :string
  end
end
