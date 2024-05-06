class UsersController < ApplicationController
    skip_before_action :authenticate_user!, only: [:create]

    def create
        # Create a new user
        user = User.new(user_params)
        user.role = 'customer'
        
        if user.save
            # Respond with the generated JWT token if the user is saved successfully
            render json: { token: user.generate_jwt }, status: :created
        else
            # Respond with errors if the user couldn't be saved
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    # Permit the required parameters for creating a user
    def user_params
        params.require(:user).permit(:email, :password, :password_confirmation)
    end
end
