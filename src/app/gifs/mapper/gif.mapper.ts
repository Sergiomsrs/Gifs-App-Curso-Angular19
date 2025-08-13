import { API, Result } from "../interfaces/api.interfaces";
import { Gif } from "../interfaces/gif.interface";



export class GifMapper {
    static mapToGif(item: Result): Gif {
        return{
            id: item.id,
            type: item.type,
            url: item.image
        }
    }


    static mapItemToArray(items: Result[]):Gif[]{
        return items.map(this.mapToGif); 
    }


}