class Review extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: ""
        };

        this.fetchUserName(this.props.review.user_id);
    }

    fetchUserName(user_id) {
        const that = this;

        $.ajax({
            url: "http://localhost:3000/api/v1/users/get_name?id=" + user_id,

            success: function (data) {
                that.setState({username: data.username});
            }
        });
    }


    render() {
        return (
            <fieldset>
                <p><b>{this.state.username} diyor ki:</b></p>
                <p><i>{this.props.review.body}</i></p>
            </fieldset>
        );
    }
}