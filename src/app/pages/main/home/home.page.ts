import { Component, OnInit, inject } from '@angular/core';
import { flatMap } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateProductComponent } from 'src/app/shared/components/add-update-product/add-update-product.component';
import{orderBy}from 'firebase/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  firebaseSvc=inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  products: Product [] = [];
  loading: boolean=false;

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
  //refrescar 
  doRefresh(event) {
    setTimeout(() => {
    this.getProducts();
      event.target.complete();
    }, 1000);
  }

  //==========obtener las ganacias =============
  getProfits(){
    return this.products.reduce((index, product)=> index + product.price * product.soldUnits, 0);

  }
 

  //==============obtener producto===========
  getProducts(){
      let path=`users/${this.user().uid}/products`;

      this.loading =true;
      console.log(path);
      let query =[orderBy('soldUnits','desc')]
        
      

      let sub = this.firebaseSvc.getCollectionData(path,query).subscribe({
      next: (res:any)=>{
        console.log(res);
        this.products=res;

          this.loading =false;


        sub.unsubscribe();
      }
    })
 }

  


  //==================agregar o actulizar producto==============
// el signo de interogacion(?) se utiliza cuando un parametro no es requerido
   async addUpdateProduct(product?: Product){//recibe un producto en caso de que se necesite editarlo y que va a recibir un producto

   let success=await this.utilsSvc.presentModal({
      component: AddUpdateProductComponent,
      cssClass: 'add-update-modal',
      componentProps:{product}
    })

    if (success) this.getProducts();
      
    

  }
//===============confirmar  la elimiancion del producto

   async confirmDeleteProduct(product:Product) {

      this.utilsSvc.presentAlert({
          header: 'eliminar producto!',
          message: 'quieres eliminar este producto',
          mode:'ios',
          buttons: [
            {
              text: 'Cancel',
              
            }, {
              text: 'SI, eliminar',
              handler: () => {
                this.deleteProduct(product)
              }
            }
          ]
        });
  
  
  }


  //===============================eliminar un producto=========================================


async deleteProduct(product:Product){

  let path=`users/${this.user().uid}/products/${product.id}`

  const loading=await this.utilsSvc.loading();

  await loading.present();

  let imagePath = await this.firebaseSvc.getfilePath(product.image);
  await this.firebaseSvc.deleteFile(imagePath);

  this.firebaseSvc.deleteDocument(path).then(async res=>{

  this.products =this.products.filter(p=> p.id !==product.id);

      this.utilsSvc.presentToast({

        message: "producto eliminado exitosamente",
        duration: 1500,
        color:'success',
        position:'middle',
        icon:'checkmark-circle-outline'
    })

})

.catch(error=>{
  console.log(error)

  this.utilsSvc.presentToast({

      message: error.message,
      duration: 2500,
      color:'primary',
      position:'middle',
      icon:'alert-circle-outline'
  })


  }).finally(()=>{
    loading.dismiss();
  })


}


}
