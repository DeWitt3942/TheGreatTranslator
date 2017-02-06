class VideoSet < ApplicationRecord
	has_many :videos
	ratyrate_rateable "quality"	
has_attached_file :image, styles: { medium: "360x270!", thumb: "100x100>" }, default_url: "/images/missing-:style.png"
	 validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/
end
