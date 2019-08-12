const sendTransaction = require('./producer/transaction-producer')
const uuidv4 = require('uuid/v4')
const getPessId = () => (Math.random() * (9999999 - 0) + 0).toFixed(0)
const getAmount = () => (Math.random() * (9999999.99 - 0.01) + 0.01).toFixed(2)
const randomDate = () => {
	const start = new Date('01/01/2000')
	const end = new Date()
	const date = new Date(+start + Math.random() * (end - start));
	const hour = 0 + Math.random() * (24 - 0) | 0;
	date.setHours(hour);
	return date;
}

const generateTransaction = () => ({
	id: uuidv4(),
	value: getAmount(),
	person_id: getPessId(),
	creation_date: randomDate()
})

const enviaNTransactions =  times => new Promise(async resolve => {
	for (i = 0; i < times; i++) {
		await sendTransaction(generateTransaction())
	}
	resolve()
})

const inicio = new Date()
enviaNTransactions(100)
.then(()=>{
	const time = new Date()-inicio
	console.info('Execution time: %dms', time)
	process.exit(0);
})