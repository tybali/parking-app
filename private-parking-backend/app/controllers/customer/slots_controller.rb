class Customer::SlotsController < ApplicationController
  before_action :authenticate_user!

  def index
    start_time = params[:start_time]
    hours = params[:hours].to_i

    unless start_time.present? && hours.positive?
      render json: { error: "start_time and hours are required" }, status: :unprocessable_entity
      return
    end

    end_time = Time.zone.parse(start_time) + hours.hours.to_i
    options = {}

    options[:disabled_people_only] = true if params[:disabled_people_only].present? && params[:disabled_people_only] == 'true'
    options[:has_shade] = true if params[:has_shade].present? && params[:has_shade] == 'true'    
    options[:car_type] = params[:car_type] if params[:car_type].present?

    @slots = Slot.available_slots(start_time, end_time, options)

    render json: @slots
  end
end
