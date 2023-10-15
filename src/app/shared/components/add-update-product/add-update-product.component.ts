import { Component, Input, OnInit,inject } from '@angular/core';
import { FormControl,  FormGroup,  Validators } from '@angular/forms';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.scss'],
})

export class AddUpdateProductComponent  implements OnInit {

    @Input()product:Product

  form = new FormGroup({
    id: new FormControl(''),
    image: new FormControl('',[Validators.required]),
    name: new FormControl('',[Validators.required,Validators.minLength(4)]),
    price: new FormControl('',[Validators.required,Validators.min(0)]),
    soldUnits: new FormControl('',[Validators.required,Validators.min(0)]),
})

firebaseSvc = inject (FirebaseService);
utilsSvc=inject(UtilsService)

user={} as User;

ngOnInit() {
  this.user=this.utilsSvc.getFromLocalStorage('user');
}


//==================tomar/seleccionar imagen========================
async takeImage(){
const DataUrl=(await this.utilsSvc.takePicture('imagen del producto')).dataUrl;
this.form.controls.image.setValue(DataUrl);

}

    submit(){

      
    }

//sirve para crear un producto
async createProduct(){

  if (this.form.valid) {

    let path=`users/${this.user.uid}/products`

    const loading=await this.utilsSvc.loading();

    await loading.present();
    //=============subir la imagen y obtener la url
    let dataUrl=this.form.value.image;
    let imagePath=`${this.user.uid}/${Date.now()}`;
    let imageUrl=await this.firebaseSvc.uploadImage(imagePath,dataUrl);
    this.form.controls.image.setValue(imageUrl);

    delete this.form.value.id


    this.firebaseSvc.addDocument(path,this.form.value).then(async res=>{

      this.utilsSvc.dismissModal({success:true});


    this.utilsSvc.presentToast({

      message: "producto agregado exitosamente",
      duration: 1500,
      color:'success',
      position:'middle',
      icon:'checkmark-circle-outline'
  })

   

    

  }).catch(error=>{
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


//===============================Editar un producto=========================================


async updateProduct(){

  if (this.form.valid) {

    let path=`users/${this.user.uid}/products`

    const loading=await this.utilsSvc.loading();

    await loading.present();
    //=============subir la imagen y obtener la url
    let dataUrl=this.form.value.image;
    let imagePath=`${this.user.uid}/${Date.now()}`;
    let imageUrl=await this.firebaseSvc.uploadImage(imagePath,dataUrl);
    this.form.controls.image.setValue(imageUrl);

    delete this.form.value.id


    this.firebaseSvc.addDocument(path,this.form.value).then(async res=>{

      this.utilsSvc.dismissModal({success:true});


    this.utilsSvc.presentToast({

      message: "producto agregado exitosamente",
      duration: 1500,
      color:'success',
      position:'middle',
      icon:'checkmark-circle-outline'
  })

   

    

  }).catch(error=>{
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


}

