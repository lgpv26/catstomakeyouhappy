import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { PhotoModel } from '../photo.model';

const API = 'https://api.thecatapi.com/v1/images/search'
@Injectable({providedIn: 'root'})
export class GifsService {
    
    constructor(private http: HttpClient) {}

    public getImages(mimeType: string = 'gif') {
        return this.http
            .get<PhotoModel[]>(`${API}`, {
                headers: new HttpHeaders({'x-api-key': 'de4115fc-c4f0-48d2-9a3b-15aa02ea2f51'}),
                params: new HttpParams()
                    .append('mime_types', mimeType)
                    .append('limit', '9')
            })
    }

    public getImageById(id: string) {
        return this.http
            .get<PhotoModel>(`${API}`, {
                headers: new HttpHeaders({'x-api-key': 'de4115fc-c4f0-48d2-9a3b-15aa02ea2f51'}),
                params: new HttpParams().append('id', id)
            })
    }
}