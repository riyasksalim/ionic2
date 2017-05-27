export module FacebookResponse {



    export interface Datum {
        name: string;
        id: string;
        created_time: Date;
    }

    export interface Cursors {
        before: string;
        after: string;
    }

    export interface Paging {
        cursors: Cursors;
        next: string;
    }

    export interface Likes {
        data: Datum[];
        paging: Paging;
    }

    export interface Location {
        latitude: number;
        longitude: number;
        city: string;
        country: string;
        street: string;
        zip: string;
        located_in: string;
    }

    export interface Place {
        id: string;
        location: Location;
        name: string;
    }

    export interface Datum2 {
        id: string;
        created_time: Date;
        place: Place;
    }

    export interface Cursors2 {
        before: string;
        after: string;
    }

    export interface Paging2 {
        cursors: Cursors2;
        next: string;
    }

    export interface TaggedPlaces {
        data: Datum2[];
        paging: Paging2;
    }

    export interface FacebookRoot {
        likes: Likes;
        tagged_places: TaggedPlaces;
        id: string;
    }
}
