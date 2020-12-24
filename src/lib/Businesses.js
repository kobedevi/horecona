/*
* get business
*/

import 'regenerator-runtime/runtime';
import firebase from 'firebase/app';
import 'firebase/firestore';

const Businesses = {
  getAll: async () => new Promise((resolve) => {
    const url = 'https://data.stad.gent/api/records/1.0/search/?dataset=koop-lokaal-horeca&q=&rows=500&facet=postcode&facet=gemeente&refine.postcode=9000';
    fetch(url)
      .then((data) => data.json())
      .then(async (data) => {
        const result = [];

        // get relevantData out of api
        // eslint-disable-next-line no-restricted-syntax
        for (const [, value] of Object.entries(data.records)) {
          const relevantInfo = {
            name: value.fields.naam,
          };
          result.push(relevantInfo);
        }
        resolve(result);
      });
  }),

  getNonRegistered: async () => new Promise((resolve) => {
    // get all businesses
    Businesses.getAll()
      .then(async (data) => {
        const filterArray = [];
        // get the already registered businesses out of firebase
        const db = firebase.firestore();
        await db.collection('registeredBusinesses').get()
          .then((filterer) => {
            // push all results to filterArray
            filterer.forEach((filter) => {
              filterArray.push(filter.data());
            });
            // filter results, so only non registered businesses show up
            // taken from: https://stackoverflow.com/questions/21987909/how-to-get-the-difference-between-two-arrays-of-objects-in-javascript
            // eslint-disable-next-line max-len
            const resultTwo = data.filter(({ name: id1 }) => !filterArray.some(({ name: id2 }) => id2 === id1));
            resolve(resultTwo);
          });
      });
  }),
};

export default Businesses;
