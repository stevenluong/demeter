class CreateStatements < ActiveRecord::Migration
  def change
    create_table :statements do |t|
      t.datetime :date
      t.string :bank
      t.string :pdf

      t.timestamps null: false
    end
  end
end
