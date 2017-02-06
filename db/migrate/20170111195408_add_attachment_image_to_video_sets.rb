class AddAttachmentImageToVideoSets < ActiveRecord::Migration
  def self.up
    change_table :video_sets do |t|
      t.attachment :image
    end
  end

  def self.down
    remove_attachment :video_sets, :image
  end
end
