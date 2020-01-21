 import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
 import {ContactsService} from '../../../services/contacts.service';
 import {UserContact} from '../../../models/UserContact';
 import {AlertController} from '@ionic/angular';
 import {TranslateService} from '@ngx-translate/core';
 import {ContactType} from '../../../models/ContactType';
 import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
 import {User} from '../../../models/User';

@Component({
  selector: 'app-edit-contacts',
  templateUrl: './edit-contacts.page.html',
  styleUrls: ['./edit-contacts.page.scss'],
})
export class EditContactsPage implements OnInit {
  contacts: UserContact[];
  contactTypes: ContactType[];

  @ViewChild('contactType', {static: false}) contactTypeEl: HTMLSelectElement;
  contactsForm: FormGroup;

  constructor(
      private contactsService: ContactsService,
      private alertController: AlertController,
      private translate: TranslateService,
      private changeDetector: ChangeDetectorRef,
      private formBuilder: FormBuilder
  ) {
    this.contactsForm = formBuilder.group({
      contactsArray: formBuilder.array([]),
      idArray: formBuilder.array([]),
      typesIdArray: formBuilder.array([])
    });
  }
  get contactsArray(): FormArray { return this.contactsForm.get('contactsArray') as FormArray; }
  get idArray(): FormArray { return this.contactsForm.get('idArray') as FormArray; }
  get typesIdArray(): FormArray { return this.contactsForm.get('typesIdArray') as FormArray; }

  async ngOnInit() {
    this.contacts = await this.contactsService.getContacts();
    for (const contact of this.contacts) {
      this.contactsArray.push(new FormControl(contact.value));
      this.idArray.push(new FormControl(contact.id));
      this.typesIdArray.push(new FormControl(contact.contacts_types_id));
    }

    this.contactTypes = await this.contactsService.getTypes();
  }

  async deleteContact(contact, index) {
    const alert = await this.alertController.create({
      header: this.translate.instant('profileContacts.delete.header'),
      message: this.translate.instant('profileContacts.delete.message'),
      buttons: [
        {
          text: this.translate.instant(`app.alerts.btn.cancel`),
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: this.translate.instant(`app.alerts.btn.ok`),
          handler: () => {
            this.contactsService.removeContact(contact).subscribe(() => {
              this.contacts = this.contacts.filter((value, i) => {
                return i !== index;
              });
              this.contactsArray.removeAt(index);
              this.idArray.removeAt(index);
              this.typesIdArray.removeAt(index);
              this.changeDetector.detectChanges();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  addContact() {
    if (this.contactTypeEl.value) {
      const type = this.contactTypes.filter((value) => value.id === parseInt(this.contactTypeEl.value))[0];
      const newContact = {
        id: 0,
        contacts_types_id: parseInt(this.contactTypeEl.value),
        value: null,
        contacts_type: type
      };

      this.contacts.push(newContact);
      this.contactsArray.push(new FormControl(newContact.value));
      this.idArray.push(new FormControl(newContact.id));
      this.typesIdArray.push(new FormControl(newContact.contacts_types_id));
      this.contactTypeEl.value = null;
      this.changeDetector.detectChanges();
    }
  }

  save() {
    this.contactsService.saveContacts({
      id: this.idArray.value,
      contacts_types_id: this.typesIdArray.value,
      value: this.contactsArray.value
    }).then(async res => {
      this.contacts = res as UserContact[];

      this.contactsArray.clear();
      this.idArray.clear();
      this.typesIdArray.clear();
      for (const contact of this.contacts) {
        this.contactsArray.push(new FormControl(contact.value));
        this.idArray.push(new FormControl(contact.id));
        this.typesIdArray.push(new FormControl(contact.contacts_types_id));
      }

      const alert = await this.alertController.create({
        header: this.translate.instant(`app.alerts.success`),
        message: this.translate.instant(`profileContacts.save.success.msg`),
        buttons: [this.translate.instant(`app.alerts.btn.ok`)]
      });
      await alert.present();
    }).catch(async res => {
      const alert = await this.alertController.create({
        header: this.translate.instant(`app.alerts.error`),
        message: this.translate.instant(`profileContacts.save.errors.${res.error.msg}`),
        buttons: [this.translate.instant(`app.alerts.btn.ok`)]
      });
      await alert.present();
    });
  }
}
