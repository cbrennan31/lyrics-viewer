class AddCodeToVerses < ActiveRecord::Migration[5.1]
  def change
    add_column :verses, :code, :string, null: false
  end
end
