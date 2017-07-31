class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  skip_before_action :verify_authenticity_token

  def after_sign_out_path_for(resource_or_scope)
    return '/'
  end
  def after_sign_in_path_for(resource_or_scope)
    return '/'
  end

end
