import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { API } from '../interfaces/api.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingLoading = signal(true);

  searchHistory = signal<Record<string, Gif[]>>({});
  searchHistoryKeys = computed( ()=>  Object.keys(this.searchHistory()))


  constructor(){
    this.loadCharacter();
  }

  loadCharacter(){
    
    this.http.get<API>(`${environment.baseUrl}/character`)
    .subscribe((resp)=> {
      const gifs = GifMapper.mapItemToArray(resp.results)
      this.trendingGifs.set(gifs)
      this.trendingLoading.set(false)
      console.log(gifs)
    }
    )
   
  }

  searchByStatus(query: string){

    this.http.get<API>(`${environment.baseUrl}/character/?status=alive`, {
      params: {
        q: query
      }
    })
    .subscribe((resp)=> {
      const gifs = GifMapper.mapItemToArray(resp.results)
      console.log({search: gifs})
    }
    )




  }

  searchCharacters(filters: { name?: string; status?: string; species?: string; type?: string; gender?: string }) {
    const params: any = {};
    if (filters.name) params.name = filters.name;
    if (filters.status) params.status = filters.status;
    if (filters.species) params.species = filters.species;
    if (filters.type) params.type = filters.type;
    if (filters.gender) params.gender = filters.gender;

    return this.http.get<API>(`${environment.baseUrl}/character`, { params })
      .pipe(
        map(({ results }) => GifMapper.mapItemToArray(results)),
        tap((items) => {
          if (filters.name) {
            this.searchHistory.update(history => ({
              ...history,
              [filters.name!]: items
            }));
          }
        })
      );
  }

}
