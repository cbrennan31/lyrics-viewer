class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.string :title
      t.integer :event_id, null: false

      t.timestamps
    end
  end
end
