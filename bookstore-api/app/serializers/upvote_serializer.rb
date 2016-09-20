class UpvoteSerializer < ActiveModel::Serializer
  attributes :id, :comic_id, :user_id, :book_id, :comment
end
