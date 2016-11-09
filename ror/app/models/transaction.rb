class Transaction < ActiveRecord::Base
    belongs_to :statement
end
