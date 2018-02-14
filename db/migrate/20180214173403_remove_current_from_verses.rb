class RemoveCurrentFromVerses < ActiveRecord::Migration[5.1]
  def change
    remove_column :verses, :current
  end
end
