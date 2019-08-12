const router = new (require('restify-router')).Router()
const uuidv4 = require('uuid/v4')
const sendTransaction = require('../producer/transaction-producer')
const consumeTransaction = require('../consumer/transaction-consumer')


const getTransaction = reqBody => {
	const transaction = {}
	transaction.person_id = Number(reqBody.transaction.person_id)
	transaction.value = Number(reqBody.transaction.value)
	transaction.creation_date = new Date(reqBody.transaction.creation_date)
	transaction.id = uuidv4()
	return transaction
}

router.post('/transactions/', function (req, res, next) {
	const transaction = getTransaction(req.body)
	res.json({
		transaction
	});
	sendTransaction(transaction)
	next();
});

router.get('/transactions/', function (req, res, next) {
	consumeTransaction()
	.then(transaction => {
		res.json({
			transaction
		});
		next();
	})
	.catch(err => {
		console.error(err)
		res.status(500)
	})
});

module.exports = router;