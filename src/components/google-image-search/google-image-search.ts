import { Component } from '@angular/core';
import { Api } from '../../providers/api';

/**
 * Generated class for the GoogleImageSearchComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'google-image-search',
  templateUrl: 'google-image-search.html'
})
export class GoogleImageSearchComponent {

  text: string;

  constructor(public api:Api) {
    console.log('Hello GoogleImageSearchComponent Component');
    this.text = 'Hello World';
  debugger;
    let keys={
        key: "AIzaSyCzb6SI_JRrp6xLLYV617Ary6n59h36ros",
        cx: "004286675445984025592:ypgpkv9fjd4",
        filter: "1",
        searchType: "image",
        //imgSize: "small",
        q:"cat"
    }
    debugger;
    var s=this.api.getimage("https://www.googleapis.com/customsearch/v1/",keys)
 this.api.getimage1("https://www.googleapis.com/customsearch/v1/",keys).subscribe((data)=>{
debugger;
console.log(data);
 },(err)=>{
debugger;
console.log(err);
 })


  }

}
