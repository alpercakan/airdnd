class Room < ApplicationRecord
  belongs_to :user
  has_many :reviews
  validates :refCode, uniqueness: true
end
