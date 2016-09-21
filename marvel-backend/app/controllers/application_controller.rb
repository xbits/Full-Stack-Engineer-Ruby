class ApplicationController < ActionController::API

  include ActionController::HttpAuthentication::Token::ControllerMethods

  before_action :configure_permitted_parameters, if: :devise_controller?

  include TokenAuthenticator


  private


  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username,:email])
  end

end
