# modelagent

[SuperAgent](https://github.com/visionmedia/superagent) with promise and url pattern support.

## Promises
Returns an [ES6 promise](https://github.com/jakearchibald/es6-promise) if no callback is specified.

```javascript
request.get('/api/pets').end().then(function(res) {
  // do something with res
}).catch(function(err) {
  // caught an error
});
```

## URL pattern
Creates a reusable url pattern based agent. Unspecified keys will be removed from the url.

```javascript
var pets = request.api('/pets/:id');

// GET /pets
pets.get().end()

// GET /pets/1
pets.get({id: 1}).end()

// POST /pets
pets.post({name: 'Old Yeller'}).end();

// PATCH /pets/1
// id is not included in body
pets.patch({id: 1, name: 'New Yeller'}).end();
```
