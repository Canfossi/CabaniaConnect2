import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { title } from 'process';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {


  pages =[ {title:'Inicio',url: '/main/home',icon:'home-outline'},
  {title:'Perfil',url: '/main/profile',icon:'person-outline'},]
   
    router = inject(Router);
    firebaseSvc=inject(FirebaseService);
    utilsSvc = inject(UtilsService);

    currentPath: string='';
  
  constructor() { }

  ngOnInit() {
    this.router.events.subscribe((event:any)=>{
      if(event?.url) this.currentPath = event.url;

    })

  }

  //==============cerrar Sesion================
  signOut(){

    this.firebaseSvc.signOut();
  }

}
