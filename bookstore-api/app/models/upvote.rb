class Upvote < ApplicationRecord
  belongs_to :user
  validates_presence_of :upvotable_id, :upvotable_type, :user_id

  scope :for_comics, ->{where('upvotable_type = "comic"')}
end
