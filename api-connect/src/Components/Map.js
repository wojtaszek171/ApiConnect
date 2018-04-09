import React, { Component } from 'react';
import 'jquery-ui-dist/jquery-ui';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
class MapCont extends Component {


    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
        }
    }


    componentDidMount() {

    }

    render() {
        return (
            <div className="map" style={{ height: '400px', 'margin-bottom': '100px'}}>
                <h2>Google Maps API v3</h2>

                    <Map style={{'max-height' : '500px'}}
                         google={this.props.google}
                         initialCenter={{
                            lat: 51.2353202,
                            lng: 22.5440013
                            }}
                         zoom={10}>

                        <Marker
                            title={'Tutaj mieszkam'}
                            name={'Lublin'}
                            position={{lat: 51.2353202, lng: 22.5440013}} />

                        <InfoWindow onClose={this.onInfoWindowClose}>
                            <div>
                                <h1>{this.state.selectedPlace.name}</h1>
                            </div>
                        </InfoWindow>
                    </Map>
                </div>
        );
    }


}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyBrzoiFQHsbnTuso2OuqRS3myj1t_gO8s8")
})(MapCont)
