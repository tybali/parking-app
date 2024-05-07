# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end


# db/seeds.rb
# db/seeds.rb
# Create users
admin = User.create(email: 'admin@example.com', password: 'password', role: :admin)
customer = User.create(email: 'customer@example.com', password: 'password', role: :customer)

# # Create slots
slots = [
  {
    start_time: '09:00:00',
    end_time: '12:00:00',
    availability: true,
    other_features: [],
    price: 20.00,
    cancellation_time_frame: 24,
    cancellation_charges: 5.00,
    car_type: 'ev',
    disabled_people_only: false,
    has_shade: true
  },
  {
    start_time: '13:00:00',
    end_time: '18:00:00',
    availability: true,
    other_features: [],
    price: 15.00,
    cancellation_time_frame: 12,
    cancellation_charges: 3.00,
    car_type: 'suv',
    disabled_people_only: true,
    has_shade: false
  }
]

slots.each do |slot|
  Slot.create(slot)
end


slots.each do |slot|
  Slot.create(slot)
end

# Create reservations
Reservation.create(user: customer, slot: Slot.first, start_time: '2024-05-10 10:00:00',status:1, end_time: '2024-05-10 11:00:00', checked_in: false, checked_out: false)
Reservation.create(user: customer, slot: Slot.last, start_time: '2024-05-12 14:00:00',status:1, end_time: '2024-05-12 16:00:00', checked_in: false, checked_out: false)


parking_hours = ParkingHours.first_or_initialize
parking_hours.update(start_time: Time.zone.parse('09:00'), end_time: Time.zone.parse('18:00'))