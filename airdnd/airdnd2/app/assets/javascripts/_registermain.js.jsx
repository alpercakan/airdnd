class RegisterMain extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userNameAvailable: null,
            username: "",
            password: "",
            email: "",
            loading: false,
            completed: false,
            showPasswordEmptyError: false,
            failed: false,
            showUserNameEmptyError: false,
            showEmailEmptyError: false
        };
    }

    updateUserNameAvailability(username) {
        if (username === "") {
            this.setState({userNameAvailable: null});
            return;
        }

        let that = this;

        $.ajax({url: "http://localhost:3000/api/v1/users/exists.json?username="+username,

            method: "GET",

            success: function(data, status) {
                that.setState({userNameAvailable: !data.exists});
            },
        });
    }

    // Returns true if username is NOT empty.
    updateUserNameEmptyErrorState(username) {
        let status = username === "";
        this.setState({showUserNameEmptyError: status});
        return !status;
    }

    updateEmailEmptyErrorState(email) {
        let status = email === "";
        this.setState({showEmailEmptyError: status});
        return !status;
    }

    updatePasswordEmptyErrorState(password) {
        let status = password === "";
        this.setState({showPasswordEmptyError: status});
        return !status;
    }

    handlePasswordChange(newPassword) {
        this.setState({password: newPassword});
        this.updatePasswordEmptyErrorState(newPassword);
    }

    handleEmailChange(newEmail) {
        this.setState({email: newEmail});
        this.updateEmailEmptyErrorState(newEmail);
    }

    handleUsernameChange(newUsername) {
        this.setState({username: newUsername});
        this.updateUserNameAvailability(newUsername);
        this.updateUserNameEmptyErrorState(newUsername);
    }

    renderUserNameBox() {
        return <RegisterUserName handleChange={(x) => this.handleUsernameChange(x)}
                                 showInputEmptyError={this.state.showUserNameEmptyError}
                                 valid={this.state.userNameAvailable} />;
    }

    renderPasswordBox() {
        return (<PasswordBox
            handleChange={(x) => this.handlePasswordChange(x)}
            showInputEmptyError={this.state.showPasswordEmptyError}
            showInputWrongError={false} />);
    }

    renderRegisterButton() {
        return <GenericBeatifulButton text="Kayıt ol" onClick={() => this.onRegisterClicked()} />
    }

    renderLoadingAnimation() {
        return <LoadingAnimation message="Kayıt yapılıyor" exists={this.state.loading} />
    }

    isFormValid() {
        return this.updateUserNameEmptyErrorState(this.state.username) &&
               this.updatePasswordEmptyErrorState(this.state.password) &&
               this.updateEmailEmptyErrorState(this.state.email) &&
               this.state.userNameAvailable;
    }

    onRegisterClicked() {
        if (this.isFormValid())
            this.register();
    }

    register() {
        this.setState({loading: true, failed: false});

        let that = this;

        $.ajax({url: "http://localhost:3000/api/v1/users",

            method: "POST",

            success: function(data, status) {
                that.setState({loading: false, completed: true});
            },

            error: function () {
                that.setState({loading: false, failed: true});
            },

            data: {
                user: {
                    username: this.state.username,
                    password: this.state.password,
                    email: this.state.email
                }
            }
        });
    }

    render() {
        if (this.state.completed)
            return this.renderAfterCompleted();
        else
            return this.renderBeforeCompleted();
    }

    renderAfterCompleted() {
        return (
            <div className="row" id="registerDiv">
                <h1>Başarıyla kayıt oldunuz.</h1>
                <a href="http://localhost:3000/login">Giriş yapın</a>
            </div>
        );
    }

    renderOnFail() {
        if (this.state.failed)
            return <b>Kayıt başarısız oldu. Tekrar deneyin.</b>
        else
            return ""
    }

    renderEmailBox() {
        return <EmailBox showInputEmptyError={this.state.showEmailEmptyError}
                         handleChange={(x) => this.handleEmailChange(x)} />
    }

    renderBeforeCompleted() {
        return (
            <div className="row" id="registerDiv">
                <form id="registerForm">
                    <fieldset className="fieldset">
                        <legend>Kullanıcı Kaydı</legend>

                        {this.renderUserNameBox()}

                        {this.renderPasswordBox()}

                        {this.renderEmailBox()}

                        {this.renderRegisterButton()}

                        {this.renderLoadingAnimation()}

                        {this.renderOnFail()}
                    </fieldset>
                </form>
            </div>
        )
    }
}