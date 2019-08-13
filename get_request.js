const request = require("request");
const options = { method: 'GET', url: 'http://localhost:8081/api/transactions/', time : true };

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
