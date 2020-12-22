/*
* App wrapper
*/

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

class User {
    constructor(user, type){
        this.user = user;
        this.type = type;
    }

    async storeUser(){
        const db = firebase.firestore();
        console.log(this.user.uid);
        const thisUser = {
            uid: this.user.uid,
            type: this.type,
        }
        await db.collection('users').add(thisUser)
        .then(() => {window.location.replace('/tester')});
    }

    async findUser(){

    }
}

export default User;
