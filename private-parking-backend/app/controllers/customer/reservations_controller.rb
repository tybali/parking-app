class Customer::ReservationsController < ApplicationController
    before_action :authenticate_user!
  
    def index
      @reservations = current_user.reservations
      render json: @reservations
    end
  
    def create
      unless params[:slot_id].present? && params[:start_time].present? && params[:hours].present?
        render json: { error: 'slot_id, start_time and hours are required parameters' }, status: :unprocessable_entity
        return
      end
    
      slot = Slot.find_by(id: params[:slot_id])
      if slot.nil?
        render json: { error: 'Slot not found' }, status: :not_found
        return
      end
    
      start_time = Time.zone.parse(params[:start_time])
      end_time = start_time + params[:hours].to_i.hours

      date_from_start_time = start_time.to_date

      formatted_end_time = slot.end_time.strftime('%H:%M:%S')
      slot_end_time = Time.zone.parse("#{date_from_start_time} #{formatted_end_time}")
      
      puts end_time
      puts slot_end_time

      if end_time > slot_end_time
        render json: { error: 'Cannot reserve after parking closing time.' }, status: :unprocessable_entity
        return
      end

      if slot.reservations.where('(start_time, end_time) OVERLAPS (?, ?) AND status = ?', start_time, end_time, Reservation.statuses[:active]).exists?
        render json: { error: 'Slot is already reserved for this time period' }, status: :unprocessable_entity
        return
      end
    
      reservation = current_user.reservations.new(
        slot: slot,
        start_time: start_time,
        end_time: end_time,
        status: Reservation.statuses[:active]
      )
    
      if reservation.save
        render json: reservation, status: :created
      else
        render json: reservation.errors, status: :unprocessable_entity
      end
    end

    def cancel
      reservation = current_user.reservations.find_by(id: params[:id])
    
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
    
    private
  
    def reservation_params
      params.require(:reservation).permit(:slot_id, :start_time, :hours)
    end
  end
  