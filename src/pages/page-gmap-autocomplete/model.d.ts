export module Model {

    export interface AddressComponent {
        long_name: string;
        short_name: string;
        types: string[];
    }

    export interface Location {
        lat: number;
        lng: number;
    }

    export interface Northeast {
        lat: number;
        lng: number;
    }

    export interface Southwest {
        lat: number;
        lng: number;
    }

    export interface Viewport {
        northeast: Northeast;
        southwest: Southwest;
    }

    export interface Geometry {
        location: Location;
        viewport: Viewport;
    }

    export interface Photo {
        height: number;
        html_attributions: string[];
        photo_reference: string;
        width: number;
    }

    export interface Result {
        address_components: AddressComponent[];
        adr_address: string;
        formatted_address: string;
        geometry: Geometry;
        icon: string;
        id: string;
        name: string;
        photos: Photo[];
        place_id: string;
        reference: string;
        scope: string;
        types: string[];
        url: string;
        utc_offset: number;
        vicinity: string;
    }

    export interface RootObject {
        html_attributions: any[];
        result: Result;
        status: string;
    }

}

