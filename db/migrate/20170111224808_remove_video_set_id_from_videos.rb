class RemoveVideoSetIdFromVideos < ActiveRecord::Migration[5.0]
  def change
    remove_column :videos, :video_set_id, :integer
  end
end
