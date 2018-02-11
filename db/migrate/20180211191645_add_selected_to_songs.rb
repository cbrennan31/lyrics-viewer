class AddSelectedToSongs < ActiveRecord::Migration[5.1]
  def change
    add_column :songs, :selected, :boolean, default: false
  end
end
