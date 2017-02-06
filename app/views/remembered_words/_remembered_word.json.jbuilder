json.extract! remembered_word, :id, :word_id, :user_id, :created_at, :updated_at
json.url remembered_word_url(remembered_word, format: :json)