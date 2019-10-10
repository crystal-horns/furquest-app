import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../models/User';
import {UserContact} from '../models/UserContact';
import {ContactType} from '../models/ContactType';

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};
@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private contactsUrl = environment.apiUrl + 'users/current/contacts';

  constructor(
      private http: HttpClient
  ) { }

  /**
   * Fetch current user's contacts data
   *
   * @return Promise<UserContact[]>
   */
  getContacts(): Promise<UserContact[]> {
    return this.http.get(this.contactsUrl, httpOptions).toPromise() as Promise<UserContact[]>;
  }

  /**
   * Removes selected contact
   * @param contact
   */
  removeContact(contact) {
    return this.http.delete(`${this.contactsUrl}/${contact}`, httpOptions);
  }

  saveContacts(contacts) {
    return this.http.post(`${this.contactsUrl}/save`, contacts, httpOptions).toPromise();
  }

  /**
   * Get all contact types
   */
  getTypes(): Promise<ContactType[]> {
    return this.http.get(`${environment.apiUrl}contact-types`, httpOptions).toPromise() as Promise<ContactType[]>;
  }
}
