class EmailBox extends React.Component {
    handleChange(e) {
        this.props.handleChange(e.target.value);
    }

    renderErrorBox() {
        if (this.props.showInputEmptyError)
            return (<small id="empty_username_message_box" className="form-error">E-posta adresi girilmemiş</small>);
        else
            return "";
    }

    render() {
        return (
            <div className="row">
                <div className="small-9 large-10 large-centered  columns">
                    <span className="label">E-posta adresi</span>
                    <input type="email" id="email" onChange={(e) => this.handleChange(e)} required />

                    { this.renderErrorBox() }
                </div>
            </div>
        );
    }
}