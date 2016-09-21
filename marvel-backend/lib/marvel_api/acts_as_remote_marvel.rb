require 'active_support/concern'
require '.api'

module ActsAsRemoteMarvel
  extend ActiveSupport::Concern

  included do
    #nothing
  end

  class_methods do
    def meta
      @meta || {'total'=>0, 'limit'=>20}
    end
    def meta=(value)
      @meta = value
    end

    def remote_collection params
      res = Api.get_remote self.model_name.plural, params
      extract_remote_records JSON.decode(res.body)[:data][:results]
    end

    def remote_record id

    end

    def extract_remote_records results
      has_one_ass  = self.reflect_on_all_associations(:has_one).map{|a| a.name.to_s}
      belongs_ass  = self.reflect_on_all_associations(:belongs_to).map{|a| a.name.to_s}
      has_many_ass  = self.reflect_on_all_associations(:has_many).map{|a| a.name.to_s}
      results.each do |r|
        new_record_attributes = {}
        r.each do |k,v|
          if self.column_names.include? k
            new_record_attributes[k] = v
          elsif v.is_a? Hash
            if belongs_ass.include? k
            elsif has_many_ass.include? k
              extract_from_relationship v
            elsif has_one_ass.include? k
            end

          end
        end

      end
    end

    def extract_attrs_from_relationship relationship
      out = []
      relationship['items'].each do |r|

      end
    end

    def marvel_id_from_uri uri
      uri.split('/').last
    end
  end


end

