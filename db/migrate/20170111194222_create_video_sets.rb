class CreateVideoSets < ActiveRecord::Migration[5.0]
  def change
    create_table :video_sets do |t|

      t.timestamps
    end
  end
end
