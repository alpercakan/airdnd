class LoadingAnimation extends React.Component {
    render() {
        let message;

        if (this.props.exists)
            message = this.props.message;
        else
            message = "";

        return (<div className="row" id="loading-anim-root">
            <div className="small-9 large-10 large-centered columns">
                <small id="loading_message_box"><font color="#00bfff">{message}</font></small>
            </div>
        </div>);
    }
}