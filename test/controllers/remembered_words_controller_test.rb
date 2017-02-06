require 'test_helper'

class RememberedWordsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @remembered_word = remembered_words(:one)
  end

  test "should get index" do
    get remembered_words_url
    assert_response :success
  end

  test "should get new" do
    get new_remembered_word_url
    assert_response :success
  end

  test "should create remembered_word" do
    assert_difference('RememberedWord.count') do
      post remembered_words_url, params: { remembered_word: { user_id: @remembered_word.user_id, word_id: @remembered_word.word_id } }
    end

    assert_redirected_to remembered_word_url(RememberedWord.last)
  end

  test "should show remembered_word" do
    get remembered_word_url(@remembered_word)
    assert_response :success
  end

  test "should get edit" do
    get edit_remembered_word_url(@remembered_word)
    assert_response :success
  end

  test "should update remembered_word" do
    patch remembered_word_url(@remembered_word), params: { remembered_word: { user_id: @remembered_word.user_id, word_id: @remembered_word.word_id } }
    assert_redirected_to remembered_word_url(@remembered_word)
  end

  test "should destroy remembered_word" do
    assert_difference('RememberedWord.count', -1) do
      delete remembered_word_url(@remembered_word)
    end

    assert_redirected_to remembered_words_url
  end
end
