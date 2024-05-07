class Admin::ReservationsController < ApplicationController
    before_action :authenticate_user!
    before_action :authorize_admin
  
    def index
      @reservations = Reservation.all
      render json: @reservations
    end

    def cancel
      reservation = Reservation.find_by(id: params[:id])
    
      if reservation
        if reservation.cancelled?
          render json: { error: 'Reservation has already been canceled' }, status: :unprocessable_entity
        else
          cancellation_time_frame = reservation.slot.cancellation_time_frame
          cancel_time = reservation.start_time.to_time - (cancellation_time_frame.hours)
          if Time.zone.now < cancel_time
            reservation.update(status: :cancelled)
            render json: { message: 'Reservation successfully canceled' }, status: :ok
          else
            render json: { error: 'Cannot cancel reservation as the cancellation time frame has passed' }, status: :unprocessable_entity
          end
        end
      else
        render json: { error: 'Reservation not found' }, status: :not_found
      end
    end
    
    def authorize_admin
        head :forbidden unless current_user.admin?
    end
end
