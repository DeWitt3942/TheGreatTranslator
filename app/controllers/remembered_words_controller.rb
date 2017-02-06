class RememberedWordsController < ApplicationController
  before_action :set_remembered_word, only: [:show, :edit, :update, :destroy]

  # GET /remembered_words
  # GET /remembered_words.json
  def index
    @remembered_words = RememberedWord.all
  end

  # GET /remembered_words/1
  # GET /remembered_words/1.json
  def show
  end

  # GET /remembered_words/new
  def new
    @remembered_word = RememberedWord.new
  end

  # GET /remembered_words/1/edit
  def edit
  end

  # POST /remembered_words
  # POST /remembered_words.json
  def create
    @remembered_word = RememberedWord.new(remembered_word_params)

    respond_to do |format|
      if @remembered_word.save
        format.html { redirect_to @remembered_word, notice: 'Remembered word was successfully created.' }
        format.json { render :show, status: :created, location: @remembered_word }
      else
        format.html { render :new }
        format.json { render json: @remembered_word.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /remembered_words/1
  # PATCH/PUT /remembered_words/1.json
  def update
    respond_to do |format|
      if @remembered_word.update(remembered_word_params)
        format.html { redirect_to @remembered_word, notice: 'Remembered word was successfully updated.' }
        format.json { render :show, status: :ok, location: @remembered_word }
      else
        format.html { render :edit }
        format.json { render json: @remembered_word.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /remembered_words/1
  # DELETE /remembered_words/1.json
  def destroy
    @remembered_word.destroy
    respond_to do |format|
      format.html { redirect_to '/mydict', notice: 'Remembered word was successfully destroyed.' }
      format.json { head :no_content }
    end
  end


  def remember
    user = current_user

    word = Word.find_by_word(params[:word])
    if current_user.nil?
      respond_to do |format|
        format.html
        format.js {}
         format.json{
            render json: { "success" => "false", "msg" => "To use rembmering function you have to log in."}
        }
      end
      return
    end 
    if word.nil?
      respond_to do |format|
        format.html
        format.js {}
         format.json{
            render json: { "success" => "false", "msg" => "No such word :("}
        }
      end
      return
    end
    else
      r = RememberedWord.new
      r.user_id= user.id
      r.word_id = word.id
      respond_to do |format|
      format.html
      format.js {}
      
      if r.save
        format.json{
            render json: { "success" => "true", "msg" => "Added to your dictionary!"}
        }
      else
        format.json{
            render json: { "success" => "false", "msg" => "Word is already there!"}
        }
    end
      end
  end

  def my_dict
    if current_user.nil?
      respond_to do |format|
        format.html { redirect_to "/"}
        format.json { head :no_content }
      end
    end
    if current_user.nil?
      @words = []
    else
      @words = current_user.remembered_words
    end
  end
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_remembered_word
      @remembered_word = RememberedWord.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def remembered_word_params
      params.require(:remembered_word).permit(:word_id, :user_id)
    end
end
