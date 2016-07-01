json.array!(@sources) do |source|
  json.extract! source, :id, :name, :display, :language, :rss_url
  json.url source_url(source, format: :json)
end
