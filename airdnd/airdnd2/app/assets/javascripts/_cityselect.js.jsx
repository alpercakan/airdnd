class CitySelect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cityList: [],
        };

        this.fetchCityList();
    }

    fetchCityList() {
        const that = this;

        $.ajax({
            url: "http://localhost:3000/api/v1/cities",

            success: function (data) {
                that.setState({cityList: data});
            }
        });
    }

    renderCityList() {
        let ret = [];

        for (let city of this.state.cityList) {
            ret.push(<option key={city.cityIndex} value={city.cityIndex}>{city.name}</option>);
        }

        return ret;
    }

    render() {
        return (
            <select onChange={(x) => this.props.onChange(x.target.value)} id="city-select">
                {this.renderCityList()}
            </select>
        );
    }
}