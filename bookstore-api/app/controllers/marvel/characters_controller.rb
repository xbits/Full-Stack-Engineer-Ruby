require 'marvel_api/api'
class Marvel::CharactersController < Marvel::MarvelController

  # GET /characters
  def index
    @characters = MarvelApi::API.get_remote_data 'characters', params: params_for_marvel
    render json: @characters
  end

  # GET /characters/1
  def show
    shit = params_for_marvel
    @character = MarvelApi::API.get_remote_data "characters/#{params.delete(:id)}", params: params_for_marvel
    render json: @character
  end

end
