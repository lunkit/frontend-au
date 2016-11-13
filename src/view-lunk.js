import {HttpClient, json} from 'aurelia-fetch-client';
import * as env from 'environment';

let httpClient = new HttpClient();

export class ViewLunk {

  constructor() {
    this.lunk = null;
  }

  activate(params, routeConfig) {
    console.log(params);
    this.getLunk(params.id);
  }

  create() {
    this.created = true;
    console.log(this.message);
    this.sendLunk(this.message);
    //this.encryptMessage(this.message);
    //Send the message to the server
    //Get the response back and display the lunk created view
  }


  getLunk(lunk) {
    httpClient.fetch(`${env.default.api}/lunk/${lunk}`)
    .then(response => response.json())
    .then(data =>{
      console.log(data);
      if (data.status === 'success') {
        this.lunk = data.lunk;
      } else {
        this.lunk = data.message;
      }
      console.log(data);
    });
  }

}
