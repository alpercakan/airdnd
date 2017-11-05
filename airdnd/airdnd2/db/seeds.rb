# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'securerandom'


Room.create!(user_id: 5,
             city_code: 2,
             description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at dictum lorem. In molestie leo at erat consequat consectetur. Fusce vitae nibh diam. Sed vel risus quis tellus rhoncus tempor. Maecenas volutpat pulvinar turpis, at efficitur ligula placerat ac. Maecenas gravida feugiat eros, sed interdum magna cursus sit amet.",
             refCode: SecureRandom.hex.to_s.first(10),
             image_url: "https://www.lacity.org/sites/g/files/wph781/f/styles/tiled_homepage_blog/public/skyline.jpg?itok=Eq-NfoWT",
             price: 4320,
             seen_by_count: 0)

10.times {
  User.create!(username: "alpercakan",
               password: "156",
               total_response_time: 159,
               response_count: 10,
               total_rating: 56,
               rating_count: 20,
               email: "alpercakan@hotmail.com.tr") }


City.create!(name: 'İstanbul', cityIndex: 0)
City.create!(name: 'Antalya', cityIndex: 1)
City.create!(name: 'Reading', cityIndex: 2)
City.create!(name: 'Nashville', cityIndex: 3)




Room.create!(user_id: 33,
             city_code: 1,
             description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at dictum lorem. In molestie leo at erat consequat consectetur. Fusce vitae nibh diam. Sed vel risus quis tellus rhoncus tempor. Maecenas volutpat pulvinar turpis, at efficitur ligula placerat ac. Maecenas gravida feugiat eros, sed interdum magna cursus sit amet.",
             refCode: SecureRandom.hex.to_s.first(10),
             image_url: "https://a0.muscache.com/im/pictures/c76bb7fa-3cd0-4fc5-be49-ebc389725fee.jpg?aki_policy=large",
             price: 59,
             seen_by_count: 0)

Room.create!(user_id: 34,
             city_code: 3,
             description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at dictum lorem. In molestie leo at erat consequat consectetur. Fusce vitae nibh diam. Sed vel risus quis tellus rhoncus tempor. Maecenas volutpat pulvinar turpis, at efficitur ligula placerat ac. Maecenas gravida feugiat eros, sed interdum magna cursus sit amet.",
             refCode: SecureRandom.hex.to_s.first(10),
             image_url: "https://a0.muscache.com/im/pictures/42415821/65c82b7e_original.jpg?aki_policy=large",
             price: 73,
             seen_by_count: 0)


20.times {
  Review.create(body: "çok harika süper bir oda kabataş'a yakın olması mükemmel!!",
                user_id: rand(20),
                room_id: rand(15))
}

20.times { Review.create(body: SecureRandom.hex(10).to_s,
                          user_id: rand(20),
                          room_id: rand(15)) }

