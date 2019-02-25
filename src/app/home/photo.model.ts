import { CategoriesPhotoModel } from './categories/categories-photo.model';
import { BreedsPhotoModel } from './breeds/breeds-photo.model';

export interface PhotoModel {
    id: string
    url: string
    sub_id: string
    created_at: string
    original_filename: string
    categories: Array<CategoriesPhotoModel>
    breeds: Array<BreedsPhotoModel>
}