class AddNameToVideoSets < ActiveRecord::Migration[5.0]
  def change
    add_column :video_sets, :name, :string
  end
end
