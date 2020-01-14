import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, sUserName: string): any {

    const usersArray:any[]=[];
      
    if (sUserName == "") {
      return value;
    }
    
    for (let i = 0; i < value.length; i++) {
      let userName:string = value[i].username;
      if(userName.startsWith(sUserName)){
        usersArray.push(value[i])
      }
    }
    return usersArray;
  }

}
