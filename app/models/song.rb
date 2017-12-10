class Song < ApplicationRecord
  validates :title, presence: true

  has_many :verses
  belongs_to :event
end
