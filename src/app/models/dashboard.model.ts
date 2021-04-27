/**
 * Interface for Movie Response 
 */
export interface MoviesResponseModel {
    count: number;
    next: string;
    previous: string;
    results: MoviesModel[]
}
/**
 * Interface for movie details
 */
export interface MoviesModel {
    title: string;
    description: string;
    genres: string;
    uuid: string;
    imageUrl?: string;
    genresList?: string[];
    shortDescription?: string;
}