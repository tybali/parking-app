require 'jwt'

class JwtAuthentication
    def initialize(app)
        @app = app
    end

    def call(env)
        request = Rack::Request.new(env)
        auth_header = request.get_header('HTTP_AUTHORIZATION')

        if auth_header.present? && auth_header.match(/Bearer (.+)/)
            token = auth_header.split(' ')[1]

            begin
                payload = JWT.decode(token, Rails.application.credentials.secret_key_base, true, algorithm: 'HS256').first
                user_id = payload['user_id']
                
                # Find the user by ID and set it in the request
                env['current_user'] = User.find_by(id: user_id)
            rescue JWT::DecodeError
                # Handle invalid token
                return [401, { 'Content-Type': 'application/json' }, [{ error: 'Unauthorized' }.to_json]]
            end
        end

        @app.call(env)
    end
end
