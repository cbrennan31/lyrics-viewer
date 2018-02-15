class AddSelectedSongIdToEvents < ActiveRecord::Migration[5.1]
  def change
    add_column :events, :selected_song_id, :integer
  end
end
