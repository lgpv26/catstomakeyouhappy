import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { PhotoModel } from './photo.model';

const URL_API = 'https://api.thecatapi.com/v1/images/search'
@Injectable({providedIn: 'root'})
export class PhotoListService {

    constructor(private http: HttpClient) {}

    public listPhotos(limit: number, order: string) {
        return this.http.get<PhotoModel[]>(`${URL_API}`, {
            headers: new HttpHeaders({'x-api-key': 'de4115fc-c4f0-48d2-9a3b-15aa02ea2f51'}),
            params: new HttpParams()
                .append('limit', limit.toString())
                .append('order', order)
        })
    }

}