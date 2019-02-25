import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BreedsPhotoModel } from './breeds-photo.model';
import { PhotoModel } from '../photo.model';

const API_URL = 'https://api.thecatapi.com/v1/breeds'
const API = 'https://api.thecatapi.com/v1/images/search'
@Injectable({providedIn: 'root'})
export class BreedsService {

    constructor(private http: HttpClient) {}

    public getAllBreeds() {
        return this.http
            .get<BreedsPhotoModel[]>(`${API_URL}`, {
                headers: new HttpHeaders({'x-api-key': 'de4115fc-c4f0-48d2-9a3b-15aa02ea2f51'})
            })
    }

    public getBreeds(id: string) {
        return this.http
            .get<PhotoModel[]>(API, {
                headers: new HttpHeaders({'x-api-key': 'de4115fc-c4f0-48d2-9a3b-15aa02ea2f51'}),
                params: new HttpParams().append('breed_id', id).append('limit', '5')
            })
    }
}