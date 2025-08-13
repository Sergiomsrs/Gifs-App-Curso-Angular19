import {Component, inject, signal } from '@angular/core';
import { GifsListComponent } from "../../components/gifs-list/gifs-list.component";
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifsListComponent],
  templateUrl: './search-page.component.html',
})
export default class SearchPageComponent { 

  gifService = inject(GifsService)

  searchGifs = signal<Gif[]>([]);


  onSearch( filters: { name?: string; status?: string; species?: string; type?: string; gender?: string } ){
    this.gifService.searchCharacters(filters)
    .subscribe( resp => this.searchGifs.set(resp) )
    console.log(filters);
  }

  /* https://rickandmortyapi.com/api/character/?status=alive */


}
