class Admin::SlotsController < ApplicationController
    before_action :authenticate_user!
    before_action :authorize_admin
    before_action :set_slot, only: [:show, :edit, :update, :destroy]
  
    def index
      @slots = Slot.all
      render json: @slots
    end
  
    def show
      render json: @slot
    end
  
    def new
      @slot = Slot.new
      render json: @slot
    end
  
    def create
      @slot = Slot.new(slot_params)
  
      if @slot.save
        render json: @slot, status: :created
      else
        render json: @slot.errors, status: :unprocessable_entity
      end
    end
  
    def edit
      render json: @slot
    end
  
    def update
      if @slot.update(slot_params)
        render json: @slot
      else
        render json: @slot.errors, status: :unprocessable_entity
      end
    end
  
    def destroy
      @slot.destroy
      head :no_content
    end
  
    private
  
    def set_slot
      @slot = Slot.find(params[:id])
    end
  
    def slot_params
      puts params
      params.require(:slot).permit(:start_time, :end_time, :availability, :price, :cancellation_time_frame, :cancellation_charges, :car_type, :disabled_people_only, :has_shade, :other_features)
    end
  
    def authorize_admin
      head :forbidden unless current_user.admin?
    end
  end
  