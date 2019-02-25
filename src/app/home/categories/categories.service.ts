import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CategoriesPhotoModel } from './categories-photo.model';
import { PhotoModel } from '../photo.model';

const API_URL = 'https://api.thecatapi.com/v1/images/search'
const API_ALL = 'https://api.thecatapi.com/v1/categories'
@Injectable({providedIn: 'root'})
export class CategoriesService {
    
    constructor(private http: HttpClient) {}

    public getAllCategories() {
        return this.http
            .get<CategoriesPhotoModel[]>(`${API_ALL}`, {
                headers: new HttpHeaders({'x-api-key': 'de4115fc-c4f0-48d2-9a3b-15aa02ea2f51'})
            })
    }

    public getCategoriesById(id: number) {
        return this.http
            .get<PhotoModel[]>(`${API_URL}`, {
                headers: new HttpHeaders({'x-api-key': 'de4115fc-c4f0-48d2-9a3b-15aa02ea2f51'}),
                params: new HttpParams()
                    .append('category_ids', id.toString())
                    .append('limit', '9')
                    .append('order', 'Rand')
            })
    }
}