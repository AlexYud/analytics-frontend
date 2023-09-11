import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private loading: any;

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
  ) { }

  async showLoading() {
    if (this.loading) this.loading.present();

    this.loading = await this.loadingCtrl.create({ message: 'Loading...' });
    this.loading.present();
  }

  async dismissLoading() {
    if (this.loading) this.loading.dismiss();
  }

  async showToast(msg: string, color: string, icon: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      color,
      icon,
      duration: 2000,
    });
    toast.present();
  }

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}