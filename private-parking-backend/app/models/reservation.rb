class Reservation < ApplicationRecord
  belongs_to :user
  belongs_to :slot

  enum status: { active: 0, cancelled: 1 }
end
