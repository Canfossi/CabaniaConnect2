import { Injectable,inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

loadingCtrl=inject(LoadingController);
toastCtrl = inject(ToastController);
router = inject(Router)

//===================loading===========================
loading(){
return this.loadingCtrl.create({spinner:'crescent'})

}

//==============toast==========================
async presentToast(opts?: ToastOptions){

  const toast=await this.toastCtrl.create(opts);
  toast.present();

}
//=====================enruta a cualquier pagina disponible======================
routeLink(url:string){
return this.router.navigateByUrl(url);

}

//============================guardar un elemento en localstorage==============================
  saveInLocalStorage(key: string, value: any){
    return localStorage.setItem(key,JSON.stringify(value))
  }

//============================obtine un elemento del localstorage==============================

getFromLocalStorage(key:string){
return  JSON.parse(localStorage.getItem(key));

}





}
