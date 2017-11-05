class User < ApplicationRecord
  has_many :rooms
  validates :username, uniqueness: true
end
