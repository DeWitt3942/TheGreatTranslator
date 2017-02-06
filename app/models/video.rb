class Video < ApplicationRecord
	has_attached_file :file, :styles => {
    :mp4 => {
      :format => 'mp4',
      :geometry => "1200x675#",
      :convert_options => {
        :input => {},
        :output => {
          :vcodec => 'libx264',
          :movflags => '+faststart',
          :strict => :experimental
        }
      },
      :thumb => { :geometry => "160x120", :format => 'jpeg', :time => 10}
    },
    :webm => {
      :format => 'webm',
      :geometry => "1200x675#",
      :convert_options => {
        :input => {},
        :output => {
          :vcodec => 'libvpx',
          :acodec => 'libvorbis',
          'cpu-used' => -10,
          :deadline => :realtime,
          :strict => :experimental
        }
      }
    },

    # I couldn't get the preview to work with
    # the method outlined in the docs,
    # so I just passed the options
    # to avconv specifically.

    :preview => {
      :format => :jpg,
      :geometry => "1200x675#",
      :convert_options => {
        :output => {
          :vframes => 1,
          :s => "1200x675",
          :ss => '00:00:02'
        }
      }
    },
    :thumb => {
      :format => :jpg,
      :geometry => "300x169#",
      :convert_options => {
        :output => {
          :vframes => 1,
          :s => '300x169',
          :ss => '00:00:02'
        }
      }
    },
  },
  :processors => [:transcoder]

validates_attachment_size :file, less_than: 1.gigabytes
validates_attachment_content_type :file, :content_type => ["video/mp4", "video/quicktime", "video/x-flv", "video/x-msvideo", "video/x-ms-wmv", "video/webm"]

process_in_background :file

has_attached_file :sub, { validate_media_type: false }



 has_attached_file :image, styles: { medium: "360x270!", thumb: "100x100>" }, default_url: "/images/missing-:style.png"
 validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/
 belongs_to :video_set, optional: true
 ratyrate_rateable "quality"
end
