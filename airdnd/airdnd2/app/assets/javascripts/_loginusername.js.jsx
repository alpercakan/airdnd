class LoginUserName extends React.Component {
    handleChange(e) {
        this.props.handleChange(e.target.value);
    }

    renderErrorBox() {
        if (this.props.showInputEmptyError)
            return (<small id="empty_username_message_box" className="form-error">Kullanıcı adı girilmemiş</small>);
        else
            return "";
    }

    render() {
        return (
            <div className="row">
                <div className="small-9 large-10 large-centered  columns">
                    <span className="label">Kullanıcı Adı</span>
                    <input style={{backgroundColor: this.props.backgroundColor}}  type="text" maxLength="20" id="username" onChange={(e) => this.handleChange(e)} required />

                    { this.renderErrorBox() }
                </div>
            </div>
        );
    }
}