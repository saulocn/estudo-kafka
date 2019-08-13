const request = require("request");
const options = {
    method: 'POST',
    url: 'http://localhost:8081/api/transactions/',
    headers: {'content-type': 'application/json'},
    body: {
      transaction: {creation_date: '2020-08-12T08:08:15.572Z', value: 15.2, person_id: 25}
    },
    json: true
  };

const times = []



for (i = 0; i < 100; i++) {
  const inicio = new Date()
  request(options, function (error, response, body) {
    if (error) console.log(error)
    const time = new Date()-inicio
    console.info('Execution time: %dms', time, body)
    times.push(time)
    const total = times.reduce((total, numero) => (total + numero), 0);
    const media = total / times.length
    console.info('Average time: %dms', media)
  });
}
