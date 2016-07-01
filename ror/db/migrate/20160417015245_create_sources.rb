class CreateSources < ActiveRecord::Migration
  def change
    create_table :sources do |t|
      t.string :name
      t.boolean :display
      t.string :language
      t.string :rss_url

      t.timestamps null: false
    end
  end
end
