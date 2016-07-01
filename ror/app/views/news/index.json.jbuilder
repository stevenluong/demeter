json.array!(@news) do |news|
  json.extract! news, :id, :title, :guid, :link, :date, :source, :image_link, :description
  json.url news_url(news, format: :json)
end
