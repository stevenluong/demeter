class CreateTransactions < ActiveRecord::Migration
  def change
    create_table :transactions do |t|
      t.decimal :value
      t.string :transaction_type
      t.string :description
      t.date :made_on
      t.date :saved_on
      t.integer :statement_id

      t.timestamps null: false
    end
  end
end
