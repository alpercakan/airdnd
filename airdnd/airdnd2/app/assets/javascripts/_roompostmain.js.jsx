class RoomPostMain extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            price: 0,
            image_url: "",
            desc: "",
            city: 0,
            completed: false,
            url: ""
        };
    }

    validateForm() {
        return this.state.desc.length > 5 && this.state.price > 3 && this.state.image_url.substr(0, 4) === 'http'
    }

    publish(price, city, desc, image_url) {
        const that = this;

        $.ajax({
            method: "post",
            url: "http://localhost:3000/api/v1/rooms",
            success: function (data) {
                if (data.success !== true)
                    this.error();
                else
                    that.setState({completed: true, url: data.url});
            },

            error: function () {
                alert('hata oluştu');
            },

            data: {
                room: {
                    price: price,
                    city_code: city,
                    description: desc,
                    image_url: image_url
                }
            }
        });
    }

    handlePublishClick() {
        if (this.validateForm())
            this.publish(this.state.price,
                         this.state.city,
                         this.state.desc,
                         this.state.image_url);
        else
            alert('Formu iyi doldurun.');
    }

    /*


Room.create!(user_id: 33,
             city_code: 1,
             description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at dictum lorem. In molestie leo at erat consequat consectetur. Fusce vitae nibh diam. Sed vel risus quis tellus rhoncus tempor. Maecenas volutpat pulvinar turpis, at efficitur ligula placerat ac. Maecenas gravida feugiat eros, sed interdum magna cursus sit amet.",
             refCode: SecureRandom.hex.to_s.first(10),
             image_url: "https://a0.muscache.com/im/pictures/c76bb7fa-3cd0-4fc5-be49-ebc389725fee.jpg?aki_policy=large",
             price: 59,
             seen_by_count: 0)
     */

    render() {
        if (this.state.completed)
            return (
              <div className="row" id="room-post-root">
                  <h1>Başarıyla yayınlandı.</h1>
                  <a href={this.state.url}>{this.state.url}</a>
              </div>
            );
        else
            return (
                <div className="row" id="room-post-root">
                    <fieldset>
                        <label>Kullanıcı Numaranız:</label>
                        <input type="text" disabled value={this.props.user_id} />

                        <label>Fiyat:</label>
                        <input type="number" id="price" onChange={(x) => this.setState({price: x.target.value})} />

                        <label>Görsel URL:</label>
                        <input type="text" onChange={(x) => this.setState({image_url: x.target.value})} />

                        <label>Şehir</label>
                        <CitySelect onChange={(x) => this.setState({city: x})} />

                        <label>Açıklama:</label>
                        <textarea cols="40" rows="5" onChange={(x) => this.setState({desc: x.target.value})} />

                        <GenericBeatifulButton text="Yayınla" onClick={() => this.handlePublishClick()} />
                    </fieldset>
                </div>
            );
    }
}