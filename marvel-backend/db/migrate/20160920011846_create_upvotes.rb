class CreateUpvotes < ActiveRecord::Migration[5.0]
  def change
    create_table :upvotes do |t|
      t.string :upvotable_type
      t.integer :upvotable_id
      t.integer :user_id
      t.timestamps
    end
  end
end
