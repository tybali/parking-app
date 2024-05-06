class CreateSlots < ActiveRecord::Migration[7.1]
  def change
    create_table :slots do |t|
      t.time :start_time
      t.time :end_time
      t.boolean :availability
      t.jsonb :other_features
      t.decimal :price
      t.integer :cancellation_time_frame
      t.decimal :cancellation_charges
      t.string :car_type
      t.boolean :disabled_people_only
      t.boolean :has_shade

      t.timestamps
    end
  end
end
