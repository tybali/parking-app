class SlotSerializer < ActiveModel::Serializer
  attributes :id, :start_time, :end_time, :price, :other_features, :cancellation_time_frame, :cancellation_charges, :car_type, :disabled_people_only, :has_shade, :availability
end
