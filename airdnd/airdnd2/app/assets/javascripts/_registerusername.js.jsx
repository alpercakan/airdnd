class RegisterUserName extends React.Component {

    validityToColor(validity) {
        if (validity === null) {
            return 'white';
        }

        return validity ? '#64ff05' : '#f73636';
    }

    render() {
        return (<LoginUserName {...this.props} backgroundColor={this.validityToColor(this.props.valid)} />);
    }
}