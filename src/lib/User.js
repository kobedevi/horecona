/*
* App wrapper
*/

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

class User {
  constructor(user, type) {
    this.user = user;
    this.type = type;
  }

  async getThisUser() {
    // promise might need to be refactored? safer to keep resolved now
    return new Promise((resolve, reject) => {
      try {
        firebase.auth().onAuthStateChanged((user) => {
          this.user = user;
          resolve(user);
        });
        // check array of possible answers and add score if correct
      } catch (err) {
        reject(err);
      }
    });
  }

  async getThisUser2() {
    // promise might need to be refactored? safer to keep resolved now
    return new Promise((resolve, reject) => {
      try {
        firebase.auth().onAuthStateChanged(async (user) => {
          await firebase.firestore().collection('users').where('uid', '==', user.uid).get()
            .then(async (data) => {
              await firebase.firestore().collection('users').doc(data.docs[0].id).collection('info')
                .get()
                .then((userInfo) => {
                  const relevant = {
                    docid: data.docs[0].id,
                    user: data.docs[0].data().uid,
                    type: data.docs[0].data().type,
                  };
                  if (!(userInfo.docs[0] === undefined)) {
                    relevant.username = `${userInfo.docs[0].data().firstName} ${userInfo.docs[0].data().surName}`;
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
    console.log(this.user.uid);
    const thisUser = {
      uid: this.user.uid,
      // if user logs in via provider without an account, default usertype to user
      type: (this.type !== null) ? this.type : 'user',
    };
    // store key userData in localStorage
    localStorage.setItem('user', JSON.stringify(thisUser));

    // check if this user has a record in db
    // if so, don't change it and relocate
    // else, just relocate
    await db.collection('users').where('uid', '==', thisUser.uid).get()
      .then(async (data) => {
        if (data.docs[0] === undefined) {
          await db.collection('users').add(thisUser)
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
    await db.collection('users').where('uid', '==', this.user.uid).get()
      .then(async (data) => {
        docID = data.docs[0].id;
        const infoData = {
          firstName: formData.get('firstName'),
          surName: formData.get('surname'),
          dateOfBirth: formData.get('dateOfBirth'),
          phoneNumber: formData.get('phone'),
        };
        await db.collection('users').doc(docID).collection('info').add(infoData)
          .then(() => window.location.replace('/dashboard'));
      });
  }

  async getCheckinData(userData) {
    return new Promise((resolve, reject) => {
      try {
        const db = firebase.firestore();
        // eslint-disable-next-line newline-per-chained-call
        db.collection('users').doc(userData.docid).collection('checkin').where('active', '==', true).get()
          .then((checkinData) => {
            if (checkinData.docs[0] !== undefined) {
              const resultData = {
                data: checkinData.docs[0].data(),
                id: checkinData.docs[0].id,
              };
              resolve(resultData);
            } else {
              resolve(null);
            }
          });
      } catch (err) {
        reject(err);
      }
    });
  }

  async checkin(userData, businessName) {
    const db = firebase.firestore();
    const {
      serverTimestamp,
    } = firebase.firestore.FieldValue;

    const checkinInfo = {
      name: businessName,
      active: true,
    };
    checkinInfo.createdOn = serverTimestamp();
    // add to users checkins
    await db.collection('users').doc(userData.docid).collection('checkin').add(checkinInfo);
    // eslint-disable-next-line max-len
    delete checkinInfo.name;
    checkinInfo.uid = userData.user;
    checkinInfo.username = userData.username;
    // add to business checkins
    await db.collection('registeredBusinesses').where('name', '==', businessName).get()
      .then(async (docRef) => {
        console.log(docRef.docs[0].id);
        console.log(checkinInfo);
        await db.collection('registeredBusinesses').doc(docRef.docs[0].id).collection('checkins').add(checkinInfo)
          .then(() => {
            window.location.replace('dashboard');
          });
      });
  }

  async checkout(userData, businessData) {
    const db = firebase.firestore();
    console.log(userData);
    console.log(businessData);

    // set user checkin active to false
    await db.collection('users').doc(userData.docid).collection('checkin').doc(businessData.id)
      .update({ active: false });
    // get business docid
    await db.collection('registeredBusinesses').where('name', '==', businessData.data.name).get()
      .then(async (docRef) => {
        // get docid of user active
        // eslint-disable-next-line newline-per-chained-call
        await db.collection('registeredBusinesses').doc(docRef.docs[0].id).collection('checkins').where('uid', '==', userData.user).get()
          .then(async (uidDoc) => {
            await db.collection('registeredBusinesses').doc(docRef.docs[0].id).collection('checkins').doc(uidDoc.docs[0].id)
              .update({ active: false })
              .then(() => window.location.replace('/dashboard'));
          });
      });
  }

  async history(userData) {
    return new Promise((resolve) => {
      const db = firebase.firestore();
      db.collection('users').doc(userData.docid).collection('checkin').orderBy('createdOn', 'desc')
        .get()
        .then((checkins) => {
          resolve(checkins);
        });
    });
  }
}

export default User;
