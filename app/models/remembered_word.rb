class RememberedWord < ApplicationRecord
	belongs_to :user
	belongs_to :word
	validates_uniqueness_of :user_id, :scope => [:word_id]
end
