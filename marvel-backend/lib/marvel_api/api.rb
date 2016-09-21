require 'net/http'
require 'digest/md5'
module MarvelApi
  module API


    def self.get_remote path, params = {}
      params ||= {}
      params = params.delete_if { |k, v| v.blank? } # clear nil params
      res = HTTP.get("#{Rails.configuration.marvel_gateway}/#{path}", params: marvel_keys.merge(params))
      puts "External request executed: \e[35m#{res.uri.to_s}\e[0m"
      res
    end

    def self.get_remote_data path, opts = {}
      default_opts = {
          params: {},#request parameters
          extract_ids:true,#extract related record id from resource_uri
      }
      opts = default_opts.merge opts
      response = get_remote(path, opts[:params])
      data = response.parse
      extract_and_append_ids! data
    end

    def self.extract_and_append_ids! data
      if data.is_a? Enumerable
        data.each do |v|
          extract_and_append_ids! v
        end
        if data.is_a?(Hash) && data.has_key?('resourceURI')
          ext_id = extract_id_from_uri data['resourceURI']
          data['id'] = ext_id if ext_id && ext_id.to_i.to_s == ext_id && !data.has_key?('id')
        end
      end
      data
    end

    def self.extract_id_from_uri uri
       uri.split('/').last
    end


    protected
    def self.marvel_keys
      timestamp = Time.now.to_i;
      private_key = Rails.configuration.marvel_private_key
      public_key = Rails.configuration.marvel_public_key
      digested = Digest::MD5.hexdigest( "#{timestamp}#{private_key}#{public_key}");

      {ts:timestamp, apikey:public_key, hash:digested}
    end

  end
end