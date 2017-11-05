class ResultElement extends React.Component {
    onDivClicked() {
        window.open(this.props.elementInfo.url, '_blank');
    }

    shortenDesc(desc) {
        if (desc.length < 150)
            return desc;
        else
            return desc.substr(0, 147) + '...';
    }

    render() {
        return (
           <div style={{cursor: "pointer"}} onClick={() => this.onDivClicked()}>
                <p><img src={this.props.elementInfo.data.image_url} width="350" height="350" /></p>
                <p><b>Fiyat = </b>{this.props.elementInfo.data.price} TL</p>
                <p><b>Bilgi: </b><i>{this.shortenDesc(this.props.elementInfo.data.description)}</i></p>
            </div>
        );
    }
}