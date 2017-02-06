class AddVideoSetIdToVideos < ActiveRecord::Migration[5.0]
  def change
    add_column :videos, :video_set_id, :integer
    add_column :videos, :null, :string
  end
end
