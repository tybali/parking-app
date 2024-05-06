class CreateReservations < ActiveRecord::Migration[7.1]
  def change
    create_table :reservations do |t|
      t.references :user, null: false, foreign_key: true
      t.references :slot, null: false, foreign_key: true
      t.datetime :start_time
      t.datetime :end_time
      t.boolean :checked_in
      t.boolean :checked_out

      t.timestamps
    end
  end
end
