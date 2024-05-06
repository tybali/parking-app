class ReservationSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :slot_id, :start_time, :end_time, :checked_in, :checked_out, :status
  belongs_to :slot
end
