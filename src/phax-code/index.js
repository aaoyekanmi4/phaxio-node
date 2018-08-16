const request = require('request-promise-native');

module.exports = class {
  constructor(apiKey, apiSecret, url) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.url = url;

    this.auth = { user: this.apiKey, pass: this.apiSecret };
  }

  create(options = { metadata: null, type: null }) {
    return new Promise((resolve, reject) => {
      const formData = {};
      Object.keys(options).forEach((rec) => {
        if (options[rec] !== null) formData[rec] = options[rec];
      });

      const req = {
        method: 'POST',
        url: `${this.url}/phax_codes`,
        auth: this.auth,
      };

      if (formData.length !== 0) req.formData = formData;

      request(req)
        .then(response => resolve(JSON.parse(response)))
        .catch(err => reject(err));
    });
  }

  get(options = { id: null, type: null }) {
    return new Promise((resolve, reject) => {
      let phaxCode;
      if (options.id === null) {
        phaxCode = 'phax_code';
      } else {
        phaxCode = `phax_codes/${options.id}`;
      }

      const req = {
        method: 'GET',
        url: `${this.url}/${phaxCode}`,
        auth: this.auth,
      };

      if (options.type !== null) req.type = options.type;

      request(req)
        .then(response => resolve(JSON.parse(response)))
        .catch(err => reject(err));
    });
  }
};
