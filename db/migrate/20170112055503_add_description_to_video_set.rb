class AddDescriptionToVideoSet < ActiveRecord::Migration[5.0]
  def change
    add_column :video_sets, :description, :text
  end
end
