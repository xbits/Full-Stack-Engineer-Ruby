class SessionsController < Devise::SessionsController#DeviseTokenAuth::SessionsController
  #skip_before_action :authenticate_user!, :only => [:create]

  def create
    super do |user|
      data = {
          token: user.authentication_token,
          email: user.email
      }
      render json: {token:user.token, email:user.email, id:user.id}, status: 201 and return
    end
  end

  private
  def resource_params
    params.require(:user).permit(*params_for_resource(:sign_in))
  end
end