
class Api::V1::CitiesController < Api::V1::BaseController

  def list
    respond_with City.all
  end

  def findByIndex
    respond_with City.find_by_cityIndex params[:index]
  end
end