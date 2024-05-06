class Admin::ParkingHoursController < ApplicationController
  before_action :authenticate_admin!
  
  def index
    @parking_hours = ParkingHours.first_or_initialize
    render json: @parking_hours
  end

  def update
    @parking_hours = ParkingHours.first_or_initialize
    if @parking_hours.update(parking_hours_params)
      render json: @parking_hours
    else
      render json: @parking_hours.errors, status: :unprocessable_entity
    end
  end

  private

  def parking_hours_params
    params.require(:parking_hours).permit(:start_time, :end_time)
  end
end
