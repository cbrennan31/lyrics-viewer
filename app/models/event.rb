class Event < ApplicationRecord
  validates :title, presence: true
  validates :time, presence: true
  has_many :songs
  belongs_to :user
end
