class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            onResultScreen: false,
            results: null
        };
    }

    renderResultScreen() {
        if (this.state.results === null) {
            return <h3>Sonuç bulunamadı.</h3>;
        } else {
            let results;

            if (typeof this.state.results.length === 'undefined')
                results = [this.state.results];
            else
                results = this.state.results;

            return <ResultScreen results={results} />
        }
    }

    renderSearchScreen() {
        return <SearchScreen searchByRefHandler={(refCode) => this.searchByRefHandler(refCode)}
                             detailedSearchHandler={(city,highestPrice) => this.detailedSearchHandler(city, highestPrice)}/>
    }

    searchByRefHandler(refCode) {
        this.performSearch("http://localhost:3000/api/v1/rooms/by_ref?refCode="+refCode);
    }

    detailedSearchHandler(city, highestPrice) {
        this.performSearch("http://localhost:3000/api/v1/rooms/find?cityIndex=" + city + "&highestPrice=" + highestPrice);
    }

    performSearch(url) {
        const that = this;

        $.ajax({
            url: url,

            success: function (data) {
                if (data.length === 0)
                    this.error();
                else
                    that.setState({onResultScreen: true, results: data});
            },

            error: function () {
                that.setState({onResultScreen: true, results: null});
            }
        });
    }

    renderCorrectScreen() {
        if (this.state.onResultScreen) {
            return this.renderResultScreen();
        } else {
            return this.renderSearchScreen();
        }
    }

    renderReturnButton() {
        if (this.state.onResultScreen) {
            return <GenericBeatifulButton text="Başka Arama Yap" onClick={() => this.setState({onResultScreen: false})} />;
        } else
            return null;
    }

    render() {
        return (
            <div id="root" className="row">
                {this.renderCorrectScreen()}
                {this.renderReturnButton()}
            </div>
        )
    }
}
