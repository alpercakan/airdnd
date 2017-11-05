class RoomReviews extends React.Component {


    renderReviews() {
        if (this.props.reviews === null)
            return null;

        let ret = [];

        for (let review of this.props.reviews) {
            ret.push(<Review review={review} />);
        }

        return ret;
    }

    render() {
        return (
            <div className="row">
                {this.renderReviews()}
            </div>
        );
    }
}