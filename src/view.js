import {HttpClient} from 'aurelia-fetch-client';
import * as env from 'environment';
import * as openpgp from 'openpgp';


let httpClient = new HttpClient();

export class View {

  constructor() {
    this.lunk = null;
    this.password = null;
    this.decodedLunk = 'Please Enter Password to view Message.';
    this.noLunk = false;
  }

  activate(params, routeConfig) {
    this.getLunk(params.path.replace('/', ''));
  }

  create() {
    this.created = true;
    this.sendLunk(this.message);
    //this.encryptMessage(this.message);
    //Send the message to the server
    //Get the response back and display the lunk created view
  }


  getLunk(lunk) {
    httpClient.fetch(`${env.default.api}/lunk/${lunk}`)
    .then(response => response.json())
    .then(data =>{
      if (data.status === 'success') {
        this.lunk = data.lunk;
        if (window.location.hash) {
          this.password = window.location.hash.replace('#', '');
          this.decode();
        }
      } else {
        this.noLunk = true;
        this.lunk = data.message;
      }
    });
  }

  decode() {
    let options = {
      message: openpgp.message.readArmored(this.lunk), // parse armored message
      password: this.password                         // decrypt with password
    };
    openpgp.decrypt(options).then(plaintext => {
      console.log(plaintext.data);
      this.decodedLunk = plaintext.data;
    });
  }

}
