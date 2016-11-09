json.array!(@statements) do |statement|
  json.extract! statement, :id, :date, :bank, :pdf
  json.url statement_url(statement, format: :json)
end
