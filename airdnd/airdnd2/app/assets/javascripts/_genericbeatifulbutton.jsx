class GenericBeatifulButton extends React.Component {
    render() {
        return (
            <div className="row">
            <div className="small-9 large-10 large-centered columns">
                <a className="colored-button button" onClick={() => this.props.onClick()}>{this.props.text}</a><br />
            </div>
            </div>);
    }
}