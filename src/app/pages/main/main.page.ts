import { Component, OnInit } from '@angular/core';
import { title } from 'process';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {


  pages =[ {title:'Inicio',url: 'home',icon:'home-outline'},
  {title:'Perfil',url: 'profile',icon:'person-outline'},]
   

  
  constructor() { }

  ngOnInit() {
  }

}
