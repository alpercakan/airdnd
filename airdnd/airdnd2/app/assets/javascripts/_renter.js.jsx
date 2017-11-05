class Renter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            remTimeText: "",
            complete: false
        }
    }

    renderTimeText() {
        const remS = this.props.lockEnd - Math.round((new Date()).getTime() / 1000);

        if (remS <= 0) {
            this.props.handleLockExpire();
        } else {
            const text = Math.floor(remS / 60) + ":" + (remS % 60);

            this.setState({remTimeText: text});
        }
    }

    tick() {
        this.renderTimeText();
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    handlePayClick() {
        const roomId = this.props.roomId;
        const that = this;

        $.ajax({
            method: "post",
            url: "http://localhost:3000/api/v1/rooms/rent",
            data: {
                id: roomId
            },

            success: function (data) {
                if (data.success !== true)
                    this.error();
                else {
                    that.setState({complete: true});
                }
            },

            error: function () {
                alert('Hata');
            }
        });
    }

    render() {
        if (this.state.complete)
            return (
                <div className="row">
                    <h1>Başarıyla tamamlandı.</h1>
                    <a href="http://localhost:3000">Anasayfaya dön</a>
                </div>
            );
        else
            return (
                <div className="row">
                    <p>Ödemeyi tamamlamak için kalan zaman: <b>{this.state.remTimeText}</b></p>
                    <p>Fiyat: <b>{this.props.price}</b></p>
                    <GenericBeatifulButton onClick={() => this.handlePayClick()}
                                           text="Buraya tıklayınca ödeme alınmış gibi olacak çünkü ödeme sistemi yok." />
                </div>
            );
    }
}