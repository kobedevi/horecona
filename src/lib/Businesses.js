/*
* get business
*/

import 'regenerator-runtime/runtime';

const Businesses = {
  getAll: async () => new Promise((resolve) => {
    const url = 'https://data.stad.gent/api/records/1.0/search/?dataset=koop-lokaal-horeca&q=&rows=500&facet=postcode&facet=gemeente&refine.postcode=9000';
    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        const result = [];

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
};

export default Businesses;
