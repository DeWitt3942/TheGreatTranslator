class AddDescriptionToVideo < ActiveRecord::Migration[5.0]
  def change
    add_column :videos, :description, :text
  end
end
