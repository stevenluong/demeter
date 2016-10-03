json.array!(@transactions) do |transaction|
  json.extract! transaction, :id, :value, :transaction_type, :description, :made_on, :saved_on
  json.url transaction_url(transaction, format: :json)
end
