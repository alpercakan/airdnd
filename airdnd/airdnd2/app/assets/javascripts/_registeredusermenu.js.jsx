class RegisteredUserMenu extends React.Component {
    render() {
        return <div id="menu" className="row">
                <h1>Hoşgeldin {this.props.username}</h1>
                <a href="http://localhost:3000/roompost">İlan ver</a>
              </div>
    }
}