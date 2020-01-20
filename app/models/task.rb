class Task < ApplicationRecord
  belongs_to :category
  accepts_nested_attributes_for :category
  validates :description, presence: true
end
