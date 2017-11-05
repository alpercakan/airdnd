class ReviewEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ""
        };
    }

    render() {
        return (
            <div>
                <h3>Yorum yaz</h3>
                <textarea cols="40" rows="5" onChange={(x) => {this.setState({text: x.target.value})}} />
                <GenericBeatifulButton text="Gönder" onClick={() => this.props.onSend(this.state.text)} />
            </div>
        );
    }
}