class RoomDetailMain extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cityName: "",
            posterName: "",
            noReviews: false,
            reviews: null,
            preRent: true,
            lockedByMe: false,
            lockEnd: -1
        };

        this.fetchCityName(this.props.data.city_code);
        this.fetchUserName(this.props.data.user_id);
        this.fetchReviews(this.props.data.id);
    }

    fetchCityName(index) {
        const that = this;

        $.ajax({
            url: "http://localhost:3000/api/v1/cities/by_index?index=" + index,

            success: function (data) {
                that.setState({cityName: data.name});
            }
        });
    }

    fetchUserName(user_id) {
        const that = this;

        $.ajax({
            url: "http://localhost:3000/api/v1/users/get_name?id=" + user_id,

            success: function (data) {
                that.setState({posterName: data.username});
            }
        });
    }

    fetchReviews(room_id) {
        const that = this;

        $.ajax({
            url: "http://localhost:3000/api/v1/reviews/reviews_for?id=" + room_id,

            success: function (data) {
                if (data === null)
                    that.setState({noReviews: true});

                let results;

                if (typeof data.length === 'undefined')
                    results = [data];
                else
                    results = data;

                that.setState({reviews: results});
            }
        });
    }

    renderReviews() {
        if (!this.state.noReviews)
            return (
                <fieldset>
                    <RoomReviews reviews={this.state.reviews} />
                </fieldset>
            );
        else
            return (
                <fieldset>
                    <h3>Henüz yorum yapılmamış.</h3>
                </fieldset>
            );
    }

    onSendReview(text) {
        const that = this;

        $.ajax({
            url: "http://localhost:3000/api/v1/reviews",

            method: "POST",

            success: function(data, status) {
                let newReviews = that.state.reviews;

                newReviews.push(data);

                that.setState({reviews: newReviews});
            },

            error: function () {
                alert('başarısız oldu');
            },

            data: {
              review: {
                  body: text,
                  room_id: that.props.data.id
              }
            }
        });
    }

    renderReviewEditor() {
        if (this.props.isLoggedIn) {
            return (
                <fieldset>
                    <ReviewEditor onSend={(x) => this.onSendReview(x)} />
                </fieldset>
            );
        } else {
            return (
                <fieldset>
                    <h3>Yorum yapabilmek için <a href="http://localhost:3000/login">giriş yapmanız</a> ve <a href="http://localhost:3000/register">kayıt olmanız</a> gerekiyor.</h3>
                </fieldset>
            );
        }
    }

    // Sync
    checkIfLocked(roomId) {
        let isLocked = null;

        $.ajax({
            url: "http://localhost:3000/api/v1/rooms/is_locked?id=" + roomId,
            async: false,
            
            success: function (data) {
                if (data !== null) {
                    isLocked = data.locked;
                }
            }
        });

        if (isLocked === null) {
            alert('Hata oluştu.');
            return true;
        } else
            return isLocked;
    }

    // Sync
    lockRoom(roomId) {
        let ret = false;
        const that = this;

        $.ajax({
            url: "http://localhost:3000/api/v1/rooms/lock",
            method: "POST",
            async: false,

            data: {
                id: roomId
            },

            success: function (data) {
                if (typeof data.lock.success !== 'undefined' && typeof data.lock.lockEnd !== 'undefined') {
                    ret = data.lock.success;
                    that.setState({lockEnd: data.lock.lockEnd});
                }
            }
        });

        return ret;
    }

    // Async
    unlockRoom(roomId) {
        $.ajax({
            url: "http://localhost:3000/api/v1/rooms/unlock",
            method: "POST",

            data: {
                id: roomId
            }
        });
    }

    componentWillUnmount() {
        if (this.state.lockedByMe)
           this.unlockRoom(this.props.data.id);
    }

    /*
     * Check if room is locked, if not temporarily lock. Then, transform state into renting mode.
     */
    handleRentClick() {
        if (!this.props.isLoggedIn) {
            window.location = "http://localhost:3000/register";
            return;
        }

        const roomId = this.props.data.id;

        if (this.checkIfLocked(roomId)) {
            alert('Şu an başkası bu odayı kiralamakta. Birkaç dakika içinde tekrar deneyin.');
        } else {
            if (this.lockRoom(roomId)) {
                this.setState({preRent: false, lockedByMe: true});
            } else {
                alert('İşlem başarısız oldu. Tekrar deneyin.');
            }
        }
    }

    renderPreRent() {
        return (
            <div id="room-detail-root" className="row">
                <fieldset>
                    <p><img width="900" src={this.props.data.image_url} /></p>
                    <GenericBeatifulButton text="Kirala" onClick={() => this.handleRentClick()} />
                    <h3>{this.state.cityName}</h3>
                    <h3>{this.props.data.price} TL</h3>
                    <p>Bu oda toplam {this.props.data.seen_by_count} kez görüntünledi.</p>
                    <hr/>
                    <p><b>Sahibi: <font color="#8a2be2">{this.state.posterName}</font></b></p>
                    <p><i>{this.props.data.description}</i></p>
                </fieldset>

                {this.renderReviews()}
                {this.renderReviewEditor()}
            </div>
        );
    }

    handleLockExpire() {
        alert('Süre doldu');
        this.setState({preRent: true, lockedByMe: false});
    }

    renderRent() {
        return (
            <div id="room-detail-root" className="row">
                <Renter lockEnd={this.state.lockEnd}
                        roomId={this.props.data.id}
                        price={this.props.data.price}
                        handleLockExpire={() => this.handleLockExpire()}/>
            </div>
        );
    }

    render() {
        if (this.state.preRent)
            return this.renderPreRent();
        else
            return this.renderRent();
    }
}