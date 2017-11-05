
class Api::V1::RoomsController < Api::V1::BaseController
  def findByCode
    respond_with Room.find_by_refCode params[:refCode].downcase
  end

  def index
    respond_with Room.all
  end

  def create
    if session[:uid].nil?
      render json: { success: false }
      return
    end

    create_params = room_params

    create_params['user_id'] = session[:uid]
    create_params['seen_by_count'] = 0
    create_params['refCode'] = SecureRandom.hex.to_s.first 10

    render json: { success: !!(Room.create(create_params)),
                   url: "http://localhost:3000/roomdetail?code=" + create_params['refCode'] }
  end

  def find
    if Integer(params[:highestPrice]) <= 0
      priceLim = 2147483646
    else
      priceLim = params[:highestPrice]
    end

    respond_with (Room.where("city_code = ? AND price <= ? AND (available = true OR available IS NULL)", params[:cityIndex], priceLim)
                     .map { |item| { data: item, url: "http://localhost:3000/roomdetail?code=#{item[:refCode]}"} })
  end

  # Note that we do not care if it was really unlocked; any lock is void after LOCK_DURATION.
  def isLocked
    room = Room.find_by_id params[:id]

    if room.nil?
      respond_with locked: true
    else
      if room.lock_owner_user_id.nil? || room.room_lock_start.nil? || room.lock_owner_user_id == session[:uid]
        respond_with locked: false
      else
        respond_with locked: true
      end
    end
  end

  def lock
    room = Room.find_by_id params[:id]

    if room.nil?
      render json:{lock: { success: false }}
    else
      if (session[:uid] == room.lock_owner_user_id) &&
          (!room.room_lock_start.nil?) &&
          (Time.now.utc.to_i - room.room_lock_start) <= LOCK_DURATION
        render json: {lock: {success: true, alreadyYours: true, lockEnd: (room.room_lock_start + LOCK_DURATION)}}
      else
        if room.lock_owner_user_id.nil? || (Time.now.utc.to_i - room.room_lock_start) > LOCK_DURATION
          room.lock_owner_user_id = session[:uid]
          room.room_lock_start = Time.now.utc.to_i

          if room.save
            render json:{lock: {success: true, lockEnd: (room.room_lock_start + LOCK_DURATION)}}
          else
            render json:{lock: {success: false}}
          end
        else
          render json:{lock: {success: false}}
        end
      end
    end
  end

  def rent
    room = Room.find_by_id params[:id]

    if room.nil? ||
        room.lock_owner_user_id != session[:uid] ||
        (Time.now.utc.to_i - room.room_lock_start) > LOCK_DURATION
      render json: { success: false }
    else
      room.available = false

      render json: { success: !!(room.save) }
    end
  end

  def unlock
    room = Room.find_by_id params[:id]

    if room.nil?
      render json: { success: false }
    else
      room.lock_owner_user_id = nil

      render json: { success: !!(room.save)}
    end
  end

  private
  LOCK_DURATION = 300#sec = 5 minutes

  private

  def room_params
    params.require(:room).permit(:price,
                                 :city_code,
                                 :desc,
                                 :image_url)
  end
end