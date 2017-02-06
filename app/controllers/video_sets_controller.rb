class VideoSetsController < ApplicationController
  before_action :set_video_set, only: [:show, :edit, :update, :destroy, :add_video]

  # GET /video_sets
  # GET /video_sets.json
  def index
    @video_sets = VideoSet.all
    
    @show_welcome = 1
  end

  # GET /video_sets/1
  # GET /video_sets/1.json
  def show
    @videos = @video_set.videos
  end

  # GET /video_sets/new
  def new
    @video_set = VideoSet.new
  end

  # GET /video_sets/1/edit
  def edit
  end

  # POST /video_sets
  # POST /video_sets.json
  def create
    @video_set = VideoSet.new(video_set_params)

    respond_to do |format|
      if @video_set.save
        format.html { redirect_to @video_set, notice: 'Video set was successfully created.' }
        format.json { render :show, status: :created, location: @video_set }
      else
        format.html { render :new }
        format.json { render json: @video_set.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /video_sets/1
  # PATCH/PUT /video_sets/1.json
  def update
    respond_to do |format|
      if @video_set.update(video_set_params)
        format.html { redirect_to @video_set, notice: 'Video set was successfully updated.' }
        format.json { render :show, status: :ok, location: @video_set }
      else
        format.html { render :edit }
        format.json { render json: @video_set.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /video_sets/1
  # DELETE /video_sets/1.json
  def destroy
    @video_set.destroy
    respond_to do |format|
      format.html { redirect_to video_sets_url, notice: 'Video set was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def add_video_post
     set_video_set
     params[:video].each do |id, v|
        video = Video.find id
        video.update_attributes video_set: @video_set
      end
      respond_to do |format|
        format.html { redirect_to @video_set, notice: 'Videos has been successfully added.' }
        format.json { render :show, status: :created, location: @video_set }
      end
  end

  def add_video
    @videos = Video.where(video_set: nil)
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_video_set
      @video_set = VideoSet.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def video_set_params
      params.require(:video_set).permit(:id, :name, :image)
      # params.fetch(:video_set, {})
    end
end
