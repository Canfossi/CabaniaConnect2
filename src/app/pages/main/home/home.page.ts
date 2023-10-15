import { Component, OnInit, inject } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateProductComponent } from 'src/app/shared/components/add-update-product/add-update-product.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  firebaseSvc=inject(FirebaseService);

  utilsSvc = inject(UtilsService);

  products: Product [] = [];

  ngOnInit() {
  }
//==============retornando los datos del usuario=========================
  user(): User
  {
    return this.utilsSvc.getFromLocalStorage('user');
  }
//ejecutar una accion cada vesx que usuario entra en la pagina 

  ionViewWillEnter(){

    this.getProducts();
  }

 

  //==============obtener producto===========
  getProducts(){
      let path=`users/${this.user().uid}/products`;

      let sub = this.firebaseSvc.getCollectionData(path).subscribe({
      next: (res:any)=>{
        console.log(res);
        this.products=res;
        sub.unsubscribe();
      }
    })
 }

  


  //==================agregar o actulizar producto==============
// el signo de interogacion(?) se utiliza cuando un parametro no es requerido
  addUpdateProduct(product?: Product){//recibe un producto en caso de que se necesite editarlo y que va a recibir un producto

    this.utilsSvc.presentModal({
      component: AddUpdateProductComponent,
      cssClass: 'add-update-modal',
      componentProps:{product}
    })
  }
}
