require 'jwt'

class User < ApplicationRecord
  # Include Devise modules
  devise :database_authenticatable, :registerable, :recoverable,
         :rememberable, :validatable

  has_many :reservations

  # Enum for roles
  enum role: { customer: 0, admin: 1 }

  # Generates a JWT token for a user
  def generate_jwt
    # Replace `your_secret` with an actual secret key for your application.
    payload = {
      user_id: id,
      role: role,
      exp: 24.hours.from_now.to_i
    }

    JWT.encode(payload, Rails.application.credentials.secret_key_base, 'HS256')
  end

  # Class method to verify a JWT token and return the user if valid
  def self.verify_jwt(token)
    # Replace `your_secret` with an actual secret key for your application.
    decoded_token = JWT.decode(token, Rails.application.credentials.secret_key_base, true, algorithm: 'HS256').first
    user_id = decoded_token['user_id']
    find_by(id: user_id)
  rescue JWT::DecodeError
    nil  # Return nil if token is invalid
  end
end
