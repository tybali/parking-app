class Admin::CustomersController < ApplicationController
    before_action :authenticate_user!
    before_action :authorize_admin
    before_action :set_customer, only: [:show, :edit, :update, :destroy]
  
    def index
      @customers = User.where(role: :customer)
      render json: @customers
    end
  
    def show
      render json: @customer
    end
  
    def new
      @customer = User.new
      render json: @customer
    end
  
    def create
      @customer = User.new(customer_params)
      
      if @customer.save
        render json: @customer, status: :created
      else
        render json: @customer.errors, status: :unprocessable_entity
      end
    end
  
    def edit
      render json: @customer
    end
  
    def update
      if @customer.update(customer_params)
        render json: @customer
      else
        render json: @customer.errors, status: :unprocessable_entity
      end
    end
  
    def destroy
      @customer.destroy
      head :no_content
    end
  
    private
  
    def set_customer
      @customer = User.find(params[:id])
    end
  
    def customer_params
      params.require(:customer).permit(:email, :password, :role)
    end
  
    def authorize_admin
      head :forbidden unless current_user.admin?
    end
  end
  