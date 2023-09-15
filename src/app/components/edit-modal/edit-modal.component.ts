import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnInit {

  public name!: string;
  public newName: string = '';

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() { }

  handleInput(event: any) {
    this.newName = event.target.value;
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.newName, 'confirm');
  }

}
