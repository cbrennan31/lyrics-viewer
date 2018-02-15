class AddSelectedVerseIdToSongs < ActiveRecord::Migration[5.1]
  def change
    add_column :songs, :selected_verse_id, :integer, default: 0
  end
end
