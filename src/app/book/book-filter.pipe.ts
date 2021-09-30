import { Pipe, PipeTransform } from '@angular/core';
import {Book} from "../model/book";

@Pipe({
  name: 'bookFilter'
})
export class BookFilterPipe implements PipeTransform {

  transform(list: Book[], searchText:string): any {
    if (!list){
      return null;
    }
    if (!searchText){
      return list;
    }
    searchText = searchText.toLocaleLowerCase();
    list = list.filter(s=>{
      return s.title.toLocaleLowerCase().includes(searchText);
    })
    return list;
  }

}
