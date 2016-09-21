require 'marvel_api/api'
class Marvel::ComicsController < Marvel::MarvelController


  # GET /comics
  def index
    @comics = MarvelApi::API.get_remote_data 'comics',params: params_for_marvel
    append_upvotes @comics
    render json: @comics
  end

  # GET /comics/1
  def show
    remote_params = params_for_marvel
    @comic = MarvelApi::API.get_remote_data "comics/#{remote_params.delete(:id)}",params: remote_params
    append_upvotes @comic
    render json: @comic
  end

  private

  def append_upvotes data
    return unless data['data'] && data['data']['results']
    data['data']['results'].each do |c|
      c['total_upvotes'] = Upvote.for_comics.where(upvotable_id: c['id']).count
      c['upvoted'] = current_user ? Upvote.for_comics.where(upvotable_id: c['id'], user_id: current_user.id).exists? : false
    end
  end


end
