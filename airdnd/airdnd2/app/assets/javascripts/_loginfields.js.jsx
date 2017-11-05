class LoginFields extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showUserNameEmptyError: false,
            showPasswordEmptyError: false,
            showPasswordWrongError: false,
            username: "",
            password: "",
            loggingIn: false
        }
    }

    handleUserNameChange(newString) {
        this.setState({username: newString});
        this.updateUserNameEmptyErrorState(newString);
    }

    handlePasswordChange(newPassword) {
        this.setState({password: newPassword, showPasswordWrongError: false});
        this.updatePasswordEmptyErrorState(newPassword);
    }

    // Returns true if username is NOT empty.
    updateUserNameEmptyErrorState(username) {
        let status = username === "";
        this.setState({showUserNameEmptyError: status});
        return !status;
    }

    updatePasswordEmptyErrorState(password) {
        let status = password === "";
        this.setState({showPasswordEmptyError: status});
        return !status;
    }

    performLogin() {
        this.setState({loggingIn: true});

        let that = this;

        $.ajax({url: "http://localhost:3000/api/v1/sessions.json",

                method: "POST",

                success: function(data, status) {
                    that.setState({loggingIn: false});

                    that.setState({showPasswordWrongError: !data.success});

                    if (data.success === true) {
                       window.location = 'http://localhost:3000';
                    }
                },

                data: {
                    username: this.state.username,
                    password: this.state.password
                }
        });
    }


    onLoginClicked() {
        if (!this.updateUserNameEmptyErrorState(this.state.username) ||
            !this.updatePasswordEmptyErrorState(this.state.password))
            return;

        this.performLogin();
    }

    renderUserNameBox() {
        return (<LoginUserName
            handleChange={(x) => this.handleUserNameChange(x)}
            showInputEmptyError={this.state.showUserNameEmptyError} />);
    }

    renderPasswordBox() {
        return (<PasswordBox
                handleChange={(x) => this.handlePasswordChange(x)}
                showInputEmptyError={this.state.showPasswordEmptyError}
                showInputWrongError={this.state.showPasswordWrongError} />);
    }

    renderLoginButton() {
        return <GenericBeatifulButton text="Giriş yap" onClick={() => this.onLoginClicked()} />
    }

    renderLoginAnimation() {
        return <LoadingAnimation message="Giriş yapılıyor" exists={this.state.loggingIn} />
    }

    render() {
        return (
            <div className="row" id="loginDiv">
                <form id="loginForm">
                    <fieldset className="fieldset">
                        <legend>Kullanıcı Girişi</legend>

                        {this.renderUserNameBox()}

                        {this.renderPasswordBox()}

                        {this.renderLoginButton()}

                        {this.renderLoginAnimation()}
                    </fieldset>
                </form>
            </div>
        )
    }
}