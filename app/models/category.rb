class Category < ApplicationRecord
    has_many :tasks
    validates :name, uniqueness: true, presence: true
end
