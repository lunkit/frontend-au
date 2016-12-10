import openpgp from 'openpgp';

export class welcome {
  constructor() {
  }

  decrypt(encrypted) {
    let options = {
      message: openpgp.message.read(encrypted), // parse encrypted bytes
      password: 'secret stuff', // decrypt with password
      format: 'binary' // output as Uint8Array
    };

    openpgp.decrypt(options).then(function(plaintext) {
      console.log(plaintext.data);
      console.log('^^^^^-^^^^^^^');
      return plaintext.data; // Uint8Array([0x01, 0x01, 0x01])
    });
  }

}
