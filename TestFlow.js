var request = require('request');
var myoptions = {
  method: 'post',
  body: {
    type: 'rest',
    name: 'my connection from local testflow using api',
    rest: {
      baseURI: 'http://demo9624631.mockable.io/',
      mediaType: 'json',
      authType: 'basic',
      pingRelativeURI: 'rs1/emp',
      pingMethod: 'GET',
      basicAuth: {
        username: 'abc',
        password: ''
      }
    }
  },
  json: true,
  url: 'https://api.integrator.io/v1/connections',
  headers: {
    Authorization: 'Bearer **',
  }
}

request(myoptions, function(err, res, body) {
  if (err) {
    console.log('Error :', err)
    return
  } else {
    console.log(' Body :', body._id);
    exportsNew(body._id);
  }

});

function exportsNew(id) {
  var exportoptions = {
    method: 'post',
    body: {
      name: 'export from testflow',
      _connectionId: id,
      apiIdentifier: '**',
      asynchronous: true,
      sampleData: {
        department: 'Technology',
        company: 'Celigo Inc.',
        age: '23',
        fname: 'sharat'
      },
      rest: {
        relativeURI: 'rs1/emp',
        method: 'GET'
      }
    },
    json: true,
    url: 'https://api.integrator.io/v1/exports',
    headers: {
      Authorization: 'Bearer **',
    }
  }

  request(exportoptions, function(err, res, body) {
    if (err) {
      console.log('Error :', err)
      return
    } else {
      console.log(' Body from export:', body._id);
      importsNew(body._id, id);
    }

  });
}

function importsNew(exportid, id) {

  var importoptions = {
    method: 'post',
    body: {
      name: 'import from local',
      sampleData: {
        name: 'abc',
        How_old_are_you: '22',
        Orgnisataion: 'google',
        Title: 'Developer'
      },
      responseTransform: {
        version: '1'
      },
      _connectionId: id,
      distributed: false,
      apiIdentifier: '**',
      mapping: {
        fields: [{
          extract: 'fname',
          generate: 'name'
        }, {
          extract: 'age',
          generate: 'How_old_are_you'
        }, {
          extract: '{{department}},{{company}}',
          generate: 'Title'
        }]
      },
      rest: {
        relativeURI: [
          'RS2/person'
        ],
        method: [
          'POST'
        ],
        body: [
          null
        ],
        responseIdPath: [
          null
        ],
        successPath: [
          null
        ]
      }
    },
    json: true,
    url: 'https://api.integrator.io/v1/imports',
    headers: {
      Authorization: 'Bearer **',
    }
  }

  request(importoptions, function(err, res, body) {
    if (err) {
      console.log('Error :', err)
      return
    } else {
      console.log(' imports Body :', body._id);
      flowstest(exportid, body._id);
    }

  });
}

function flowstest(exportid, importid, connectionid) {
  var flowoptions = {
    method: 'post',
    body: {
      name: 'My first flow from local',
      disabled: false,
      timezone: 'Asia/Calcutta',
      _exportId: exportid,
      _importId: importid,
      '_integrationId': '**',
      skipRetries: false,
    },
    json: true,
    url: 'https://api.integrator.io/v1/flows',
    headers: {
      Authorization: 'Bearer **',
    }
  }

  request(flowoptions, function(err, res, body) {
    if (err) {
      console.log('Error :', err)
      return
    } else {
      console.log(' Body :', body._id);
    }

  });
}
