class City < ApplicationRecord
  validates :cityIndex, uniqueness: true
end
