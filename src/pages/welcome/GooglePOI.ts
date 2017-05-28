export module GooglePOI {

    export interface Location {
        lat: number;
        lng: number;
    }

    export interface Viewport {
        south: number;
        west: number;
        north: number;
        east: number;
    }

    export interface Geometry {
        location: Location;
        viewport: Viewport;
    }

    export interface Photo {
        height: number;
        html_attributions: string[];
        width: number;
    }

    export interface POI {
        geometry: Geometry;
        icon: string;
        id: string;
        name: string;
        photos: Photo[];
        place_id: string;
        rating: number;
        reference: string;
        scope: string;
        types: string[];
        vicinity: string;
        html_attributions: any[];
    }

}
