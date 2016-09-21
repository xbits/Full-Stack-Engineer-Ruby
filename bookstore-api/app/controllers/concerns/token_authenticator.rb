module TokenAuthenticator
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_user_from_token!
    # Enter the normal Devise authentication path,
    # using the token authenticated user if available
    before_action :authenticate_user!, except: [:show,:index]
  end


  private

  def authenticate_user_from_token!
    authenticate_with_http_token do |token, options|
      user_email = options[:email].presence
      user = user_email && User.find_by_email(user_email)

      if user && Devise.secure_compare(user.authentication_token, token)
        sign_in user, store: false
      end
    end
  end

end