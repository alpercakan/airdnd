class SearchScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchByRefMode: false,
            ref: "",
            highestPrice: 0,
            cityIndex: 0,
            cityList: [],
            refCodeBackgroundColor: 'white'
        };
    }


    handlePriceChange(newPrice) {
        this.setState({highestPrice: newPrice});
    }

    handleCityChange(newCityIndex) {
        this.setState({cityIndex: newCityIndex});
    }

    renderDetailedSearch() {
        if (!this.state.searchByRefMode)
        return (
            <fieldset id="detail-search-fields" className="fieldset">
                <legend>Detaylı Arama</legend>

                <div className="row">
                    <div className="small-9 large-10 large-centered  columns">
                        <span className="label formlabel">Şehir</span>
                         <CitySelect onChange={(x) => this.handleCityChange(x)} />
                    </div>
                </div>

                <div className="row">
                    <div className="small-9 large-10 large-centered columns">
                        <span className="label formlabel">Maksimum Fiyat</span>
                        <input type="number" onChange={(x) => this.handlePriceChange(x.target.value)} id="max-price" min="1" max="999999" maxLength="4" placeholder="150" />
                    </div>
                </div>

            </fieldset>
        );
    }

    validateRefCode(ref) {
        let reg = /[0-9a-f]{6}/g;

        return reg.test(ref) && ref.length === 10;
    }

    onRefChange(newRef) {
        let bg;

        if (newRef === "")
            bg = 'white';
        else if (this.validateRefCode(newRef))
            bg = '#64ff05';
        else
            bg = '#f73636';

        this.setState({ref: newRef, searchByRefMode: (newRef !== ""), refCodeBackgroundColor: bg});
    }

    renderSearchByRef() {
        return (
            <fieldset id="ref-search-fields" className="fieldset">
                <legend>Kod ile Arama</legend>

                <div className="row">
                    <div className="small-9 large-10 large-centered  columns">
                        <span className="label formlabel">Kod</span>
                        <input type="text" onChange={(x) => this.onRefChange(x.target.value)} id="code" style={{textTransform: "uppercase", backgroundColor: this.state.refCodeBackgroundColor}} />
                    </div>
                </div>
            </fieldset>
        );
    }

    handleSearchClick() {
        if (this.state.searchByRefMode) {
            this.props.searchByRefHandler(this.state.ref);
        } else {
            this.props.detailedSearchHandler(this.state.cityIndex, this.state.highestPrice);
        }
    }

    render() {
        return (
            <div className="row" id="searchDiv">
                {this.renderDetailedSearch()}
                {this.renderSearchByRef()}

                <GenericBeatifulButton onClick={() => this.handleSearchClick()} text="Ara" />
            </div>
        );
    }
}