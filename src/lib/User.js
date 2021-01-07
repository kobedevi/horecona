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
                  this.user = user;
                  // if type == business and it has an extra info stored
                  if (relevant.type === 'Business' && !(userInfo.docs[0] === undefined)) {
                    relevant.business = userInfo.docs[0].data().Business;
                  }
                  // if an info collection is found pass the name
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
    // select the correct user
    await db.collection('users').where('uid', '==', this.user.user).get()
      .then(async (data) => {
        // set relevant data and docID for ease
        docID = data.docs[0].id;
        const infoData = {
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
              await db.collection('users').doc(docID).collection('info').add(infoData);
            } else {
              // otherwise update the existing info
              await db.collection('users').doc(docID).collection('info').doc(res.docs[0].id)
                .update(infoData);
            }
          })
          // then go to dashboard
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
    checkinInfo.docid = userData.docid;
    checkinInfo.uid = userData.user;
    checkinInfo.username = userData.username;
    // add to business checkins
    await db.collection('registeredBusinesses').where('name', '==', businessName).get()
      .then(async (docRef) => {
        await db.collection('registeredBusinesses').doc(docRef.docs[0].id).collection('checkins').add(checkinInfo)
          .then(() => {
            window.location.replace('/dashboard');
          });
      });
  }

  async checkout(userData, businessData) {
    const db = firebase.firestore();
    // set user checkin active to false
    await db.collection('users').doc(userData.docid).collection('checkin').where('active', '==', true)
      .get()
      .then(async (docRef) => {
        await db.collection('users').doc(userData.docid).collection('checkin').doc(docRef.docs[0].id)
          // .get();
          .update({ active: false });
      });
    // get business docid
    await db.collection('registeredBusinesses').where('name', '==', businessData.data.name).get()
      .then(async (docRef) => {
        // get docid of user active
        // eslint-disable-next-line newline-per-chained-call
        await db.collection('registeredBusinesses').doc(docRef.docs[0].id).collection('checkins').where('uid', '==', userData.user).where('active', '==', true).get()
          .then(async (uidDoc) => {
            await db.collection('registeredBusinesses').doc(docRef.docs[0].id).collection('checkins').doc(uidDoc.docs[0].id)
              .update({ active: false })
              .then(() => {
                if (!(businessData.businessCheckout)) {
                  window.location.replace('/dashboard');
                }
              });
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
