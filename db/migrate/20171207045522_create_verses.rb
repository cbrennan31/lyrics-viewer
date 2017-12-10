class CreateVerses < ActiveRecord::Migration[5.1]
  def change
    create_table :verses do |t|
      t.integer :song_id, null: false
      t.text :lyrics, null: false

      t.timestamps
    end
  end
end
