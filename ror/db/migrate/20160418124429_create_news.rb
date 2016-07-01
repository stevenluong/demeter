class CreateNews < ActiveRecord::Migration
  def change
    create_table :news do |t|
      t.string :title
      t.string :guid
      t.string :link
      t.datetime :date
      t.string :source
      t.string :image_link
      t.string :description

      t.timestamps null: false
    end
  end
end
