/*
* App wrapper
*/

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

class Business {
  constructor(user, type) {
    this.user = user;
    this.type = type;
  }

  async getThisUser() {
    // promise might need to be refactored? safer to keep resolved now
    return new Promise((resolve, reject) => {
      try {
        firebase.auth().onAuthStateChanged(async (user) => {
          await firebase.firestore().collection('users').where('uid', '==', user.uid).get()
            .then(async (data) => {
              const relevant = {
                docid: data.docs[0].id,
                user: data.docs[0].data().uid,
                type: data.docs[0].data().type,
              };
              this.user = relevant;
              // eslint-disable-next-line newline-per-chained-call
              await firebase.firestore().collection('users').doc(data.docs[0].id).collection('info').get()
                .then((info) => {
                  if (info.docs[0] !== undefined) {
                    relevant.name = info.docs[0].data().Business;
                    resolve(relevant);
                  }
                  resolve(relevant);
                });
            });
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  async storeUser() {
    const db = firebase.firestore();
    const thisUser = {
      uid: this.user.uid,
      // if user logs in via provider without an account, default usertype to user
      type: (this.type !== null) ? this.type : 'user',
    };

    // check if this user has a record in db
    // if so, don't change it and relocate
    // else, just relocate
    await db.collection('users').where('uid', '==', thisUser.uid).get()
      .then(async (data) => {
        if (data.docs[0] === undefined) {
          await db.collection('users').add(thisUser)
          // add a filter for businessowners to redirect to their page
            .then(() => window.location.replace('/profileInfo'));
        } else {
          window.location.replace('/dashboard');
        }
      });
  }

  // add additional info
  async additionalInfo(formData) {
    let docID;
    const db = firebase.firestore();
    await db.collection('users').where('uid', '==', this.user.user).get()
      .then(async (data) => {
        docID = data.docs[0].id;
        const infoData = {
          // Business: formData.get('businessName'),
          maxcap: formData.get('maximumCapacity'),
          firstName: formData.get('firstName'),
          surName: formData.get('surname'),
          dateOfBirth: formData.get('dateOfBirth'),
          phoneNumber: formData.get('phone'),
        };

        // get userinfo
        await db.collection('users').doc(docID).collection('info').get()
          .then(async (res) => {
            // check if it exists if it doesn't add it
            if (res.docs[0] === undefined) {
              // append business name to object
              infoData.Business = formData.get('businessName');
              // add it to users info and add the name to registeredBusinesses
              await db.collection('users').doc(docID).collection('info').add(infoData)
                .then(async () => {
                  await db.collection('registeredBusinesses').add({ name: infoData.Business });
                });
            } else {
              // otherwise just update the existing info
              await db.collection('users').doc(docID).collection('info').doc(res.docs[0].id)
                .update(infoData);
            }
          })
          // then go to dashboard
          .then(() => window.location.replace('/dashboard'));
      });
  }

  async history(businessData) {
    return new Promise((resolve) => {
      const db = firebase.firestore();
      // get business docid
      db.collection('registeredBusinesses').where('name', '==', businessData.Business).get()
        .then((docRef) => {
          db.collection('registeredBusinesses').doc(docRef.docs[0].id).collection('checkins').orderBy('createdOn', 'desc')
            .get()
            .then((checkins) => {
              // empty old list
              const oldList = document.getElementById('historyContainer');
              if (oldList) {
                oldList.remove();
              }
              // select history by date
              resolve(checkins);
            });
        });
    });
  }

  async activeUsers(businessData) {
    return new Promise((resolve) => {
      const db = firebase.firestore();
      // get business docid
      db.collection('registeredBusinesses').where('name', '==', businessData.Business).get()
        .then((docRef) => {
          db.collection('registeredBusinesses').doc(docRef.docs[0].id).collection('checkins').where('active', '==', true)
            .get()
            .then((checkins) => {
              // empty old list
              const oldList = document.getElementById('historyContainer');
              if (oldList) {
                oldList.remove();
              }
              // select history by date
              resolve(checkins);
            });
        });
    });
  }
}

export default Business;
