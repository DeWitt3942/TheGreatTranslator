require 'test_helper'

class VideoSetsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @video_set = video_sets(:one)
  end

  test "should get index" do
    get video_sets_url
    assert_response :success
  end

  test "should get new" do
    get new_video_set_url
    assert_response :success
  end

  test "should create video_set" do
    assert_difference('VideoSet.count') do
      post video_sets_url, params: { video_set: {  } }
    end

    assert_redirected_to video_set_url(VideoSet.last)
  end

  test "should show video_set" do
    get video_set_url(@video_set)
    assert_response :success
  end

  test "should get edit" do
    get edit_video_set_url(@video_set)
    assert_response :success
  end

  test "should update video_set" do
    patch video_set_url(@video_set), params: { video_set: {  } }
    assert_redirected_to video_set_url(@video_set)
  end

  test "should destroy video_set" do
    assert_difference('VideoSet.count', -1) do
      delete video_set_url(@video_set)
    end

    assert_redirected_to video_sets_url
  end
end
