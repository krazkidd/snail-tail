import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage: Promise<Storage> = this._storage.create();

  constructor(private _storage: Storage) {

  }

  async get(key: string) {
    return this.storage.then(storage => storage.get(key));
  }

  async set(key: string, value: any) {
    return this.storage.then(storage => storage.set(key, value));
  }

  async remove(key: string) {
    return this.storage.then(storage => storage.remove(key));
  }

}
