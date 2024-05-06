class Slot < ApplicationRecord
  scope :available, -> { where(availability: true) }
  has_many :reservations
  
  enum car_type: {
    sedan: 'sedan',
    suv: 'suv',
    truck: 'truck',
    van: 'van',
    motorcycle: 'motorcycle',
    ev: 'ev'
  }

  def self.available_slots(start_time, end_time, options = {})
    start_time_datetime = Time.parse(start_time)
    start_time_only = start_time_datetime.strftime("%H:%M:%S")
    
    end_time_only = end_time.strftime("%H:%M:%S")
  
    available_slots = available
                      .where('start_time <= ?', start_time_only)
                      .where('end_time >= ?', end_time_only)
                      .where.not(id: reserved_slots(start_time, end_time))

    available_slots = filter_by_features(available_slots, options)
    available_slots
  end

  private

  def self.filter_by_features(slots, options)
    slots = slots.where(disabled_people_only: options[:disabled_people_only]) if options.key?(:disabled_people_only)
    slots = slots.where(has_shade: options[:has_shade]) if options.key?(:has_shade)
    slots = slots.where(car_type: options[:car_type]) if options.key?(:car_type)
    slots
  end

  def self.reserved_slots(start_time, end_time)
    Reservation
      .where('(start_time, end_time) OVERLAPS (?, ?) AND status = ?', start_time, end_time, Reservation.statuses[:active])
      .pluck(:slot_id)
  end  
end
