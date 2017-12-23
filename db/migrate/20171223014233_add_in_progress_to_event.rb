class AddInProgressToEvent < ActiveRecord::Migration[5.1]
  def change
    add_column :events, :in_progress, :boolean, default: false
  end
end
