class Marvel::MarvelController < ActionController::API

  include ActionController::HttpAuthentication::Token::ControllerMethods
  include TokenAuthenticator

  private
  def params_for_marvel
    params.to_unsafe_h
  end

end