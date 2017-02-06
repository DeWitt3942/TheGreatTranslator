class VideosController < ApplicationController
  before_action :set_video, only: [:show, :edit, :update, :destroy]
  
  # GET /videos
  # GET /videos.json
  def index
    @videos = Video.all
    @show_welcome = 1
  end

  # GET /videos/1
  # GET /videos/1.json
  def show
    
  end

  # GET /videos/new
  def new
    @video = Video.new
  end

  # GET /videos/1/edit
  def edit
  end

  # POST /videos
  # POST /videos.json
  def create
    @video = Video.new(video_params)

    respond_to do |format|

      if @video.save
        if @video.sub?
            parse_subtitles @video.sub
        end
        format.html { redirect_to @video, notice: 'Video was successfully created.' }
        format.json { render :show, status: :created, location: @video }
      else
        format.html { render :new }
        format.json { render json: @video.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /videos/1
  # PATCH/PUT /videos/1.json
  def update
    respond_to do |format|
      if @video.update(video_params)
        if @video.sub?
            parse_subtitles @video.sub
        end
        format.html { redirect_to @video, notice: 'Video was successfully updated.' }
        format.json { render :show, status: :ok, location: @video }
      else
        format.html { render :edit }
        format.json { render json: @video.errors, status: :unprocessable_entity }
      end
    end
  end


  def unsign
    set_video
    @video.update_attributes video_set: nil
    respond_to do |format|
      format.html { redirect_to videos_url, notice: 'Video was successfully unsigned.' }
      format.json { head :no_content }
    end
  end
  # DELETE /videos/1
  # DELETE /videos/1.json
  def destroy
    @video.destroy
    respond_to do |format|
      format.html { redirect_to videos_url, notice: 'Video was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_video
      @video = Video.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def video_params
      params.require(:video).permit(:title, :file, :sub, :image)
    end

    def parse_subtitles(subs)
      puts subs.url
      # if subs.url.last(3) != 'srt'
      #   return
      # end
      # w = text.gsub(/<\/?[^>]*>/, '').gsub(/\n\n+/, "\n").gsub(/^\n|\n$/, '').split(/\W+/).to_set
      words = Set.new
      Paperclip.io_adapters.for(subs).read.split(/^\s*$/).each do |entry| # Read in the entire text and split on empty lines

        sentence = entry.strip.split("\n")
        number = sentence[0] # First element after empty line is 'number'
        time_marker =  sentence[1][0..7] # Second element is 'time_marker'
        content = sentence[2..-1].join("\n") # Everything after that is 'content'
        content.gsub(/<\/?[^>]*>/, '').gsub(/\n\n+/, "\n").gsub(/^\n|\n$/, '').split(/\W+/).to_set.each do |word|
          words.add word.strip.downcase
        end
        
      end
      words.each_slice(5) do |slice|
        Word.fetch_array slice
      end
    end

    def k_digits(string,k)
        if string.length < k
          return '0' * (k - string.length) + string
        end
      return string
    end


end
