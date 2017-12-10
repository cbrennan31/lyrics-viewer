class AddCurrentToVerses < ActiveRecord::Migration[5.1]
  def change
    add_column :verses, :current, :boolean, default: false
  end
end
