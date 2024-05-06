class ParkingHours < ApplicationRecord
    validates :start_time, presence: true
    validates :end_time, presence: true
  
    before_create :ensure_single_record


    def as_json(options = {})
    super(options.merge({
      only: [:id, :created_at, :updated_at],
      methods: [:start_time, :end_time]
    }))
    end

    def start_time
      attributes["start_time"].strftime("%H:%M:%S")
    end

    def end_time
      attributes["end_time"].strftime("%H:%M:%S")
    end

    private
    def ensure_single_record
      raise 'There can be only one ParkingHours record' if ParkingHours.count.positive?
    end
  end
  