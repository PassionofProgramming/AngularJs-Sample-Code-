import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'filter' })
export class DataFilterPipe implements PipeTransform {
  transform(categories: any, searchText: any): any {
    if(searchText == null) return categories;

    return categories.filter(function(filter){
      return filter.group_name.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    })
  }
}
