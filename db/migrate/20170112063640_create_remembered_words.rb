class CreateRememberedWords < ActiveRecord::Migration[5.0]
  def change
    create_table :remembered_words do |t|
      t.integer :word_id
      t.integer :user_id

      t.timestamps
    end
  end
end
