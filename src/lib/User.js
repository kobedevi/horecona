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

    async getThisUser(){        
        // promise might need to be refactored? safer to keep resolved now
        return new Promise((resolve, reject) => {
            try {
                firebase.auth().onAuthStateChanged((user) => {
                    this.user = user;
                    resolve(user)
                });
                // check array of possible answers and add score if correct
            } catch (err) {
                reject(err);
            }
        });
    }

    async storeUser(){
        const db = firebase.firestore();
        console.log(this.user.uid);
        const thisUser = {
            uid: this.user.uid,
            // if user logs in via provider without an account, default usertype to user
            type: (this.type!==null) ? this.type : "user",
        }

        // check if this user has a record in db
        // if so, don't change it and relocate
        // else, just relocate
        await db.collection('users').where('uid', '==', thisUser.uid).get()
            .then( async(data) => {
                if(data.docs[0] === undefined){
                    await db.collection('users').add(thisUser)
                        // add a filter for businessowners to redirect to their page
                        .then(() => window.location.replace('/profileInfo'));
                } else {
                    window.location.replace('/tester');
                }
            });
    }

    // add aditional info
    async aditionalInfo(formData){
        let docID;
        const db = firebase.firestore();
        await db.collection('users').where('uid', '==', this.user.uid).get()
            .then(async(data) => {
                docID = data.docs[0].id;
                const infoData = {
                    firstName: formData.get('firstName'),
                    surName: formData.get('surname'),
                    dateOfBirth: formData.get('dateOfBirth'),
                    phoneNumber: formData.get('phone'),
                }
                await db.collection('users').doc(docID).collection('info').add(infoData)
                .then(() => window.location.replace('/tester'))
            });
    }
}

export default User;
