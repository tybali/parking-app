class CreateParkingHours < ActiveRecord::Migration[7.1]
  def change
    create_table :parking_hours do |t|
      t.time :start_time
      t.time :end_time

      t.timestamps
    end
  end
end
