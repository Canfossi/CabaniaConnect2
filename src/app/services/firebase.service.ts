import { Injectable, inject } from '@angular/core';
import{AngularFireAuth}from '@angular/fire/compat/auth';
import{getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword,updateProfile,sendPasswordResetEmail}from'firebase/auth';
import { User } from '../models/user.model';
import{ AngularFirestore }from '@angular/fire/compat/firestore';
import{getFirestore,setDoc,doc,getDoc,addDoc,collection,collectionData,query}from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import{AngularFireStorage}from '@angular/fire/compat/storage';
import{getStorage,uploadString,ref,getDownloadURL}from"firebase/storage";


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore=inject(AngularFirestore);
  storage = inject(AngularFireStorage);
  utilsSvc=inject(UtilsService);

  //===================autenticacion=============================

  getAuth(){
    return getAuth();
  }

  //=============acceder====================
   signIn(user:User){
    return signInWithEmailAndPassword(getAuth(),user.email,user.password)

   }

   //=============crear usuario====================
   signUp(user:User){
    return createUserWithEmailAndPassword(getAuth(),user.email,user.password)

   }
//=============actualizar usuario====================

   updateUser(displayName:string){
    return updateProfile(getAuth().currentUser,{displayName})

   }

   //=============enviar email para restablecer contraseña====================
   sendRecoveryEmail(email:string){
    return sendPasswordResetEmail(getAuth(),email)

   }

  //===============cerrar sesion=====================
   signOut(){

      getAuth().signOut();
      localStorage.removeItem('user')
      this.utilsSvc.routeLink('/auth');
   }


   //========================base de datos======================

   //===========obtener documentos de una coleccion========== Aqui esta la falla estoy seguro
   getCollectionData(path: string, collectionQuery?: any){
      const ref = collection(getFirestore(), path);
      return collectionData(query(ref, collectionQuery));

   }

   //============setear document se utiliza en un principio para guardar los datos de un usuario ================
   setDocument(path:string,data:any){
    return setDoc(doc(getFirestore(),path),data);
   }

   //===========obtener un documento================
   async getDocument(path:string){
    return (await getDoc(doc(getFirestore(),path))).data();

   }

    //===========agregar documento================

    addDocument(path:string,data:any){
      return addDoc(collection(getFirestore(),path),data);
     }

     //=============almacenamiento imagen en el local storage========================

     async uploadImage(path:string,data_url:string){
        return uploadString(ref(getStorage(),path),data_url,'data_url').then(()=>{
          return getDownloadURL(ref(getStorage(),path))
        })

     }
}
