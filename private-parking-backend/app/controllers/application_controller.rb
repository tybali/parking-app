class ApplicationController < ActionController::API
    before_action :authenticate_user!
  
    private
  
    def authenticate_user!
      unless current_user
        render json: { error: 'Unauthorized' }, status: :unauthorized
      end
    end

    def authenticate_admin!
      unless current_user && current_user.admin?
        render json: { error: 'Unauthorized' }, status: :unauthorized
      end
    end
  
    def current_user
      @current_user ||= request.env['current_user']
    end
  end
  