class ResultScreen extends React.Component {
    render() {
        let ret = [];
        let row = [];

        for (let index = 0; index < this.props.results.length; ++index) {
            row.push(<td key={this.props.results[index].id} className="search-table-data" width="500"><ResultElement elementInfo={this.props.results[index]} /></td>);

            if (index % 3 === 2 || index === (this.props.results.length - 1)) {
                ret.push(<tr key={index / 3} >{row}</tr>);
                row = [];
            }
        }

        return (
            <div className="row" id="results">
                <table><tbody>{ret}</tbody></table>
            </div>
        );
    }
}