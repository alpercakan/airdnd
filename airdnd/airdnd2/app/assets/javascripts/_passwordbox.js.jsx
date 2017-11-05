class PasswordBox extends React.Component {
    handleChange(e) {
        this.props.handleChange(e.target.value);
    }

    renderPasswordEmptyBox() {
        if (this.props.showInputEmptyError)
            return (<small id="empty_password_message_box" className="form-error">Şifre girilmemiş</small>);
        else
            return "";
    }

    renderPasswordWrongBox() {
        if (this.props.showInputWrongError)
            return (<small id="invalid_password_message_box" className="form-error">Şifre yanlış</small>);
        else
            return "";
    }

    render() {
        return (
            <div className="row">
                <div className="small-9 large-10 large-centered columns">
                    <span className="label">Şifre</span>
                    <input type="password" maxLength="256" onChange={(e) => this.handleChange(e)} id="password" required />

                    {this.renderPasswordWrongBox()}
                    {this.renderPasswordEmptyBox()}
                </div>
            </div>
        );
    }
}