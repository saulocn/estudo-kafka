const router = new (require('restify-router')).Router()
const uuidv4 = require('uuid/v4')
const sendTransaction = require('../producer/transaction-producer')

const pluck = (object, ...keys) => {
    const newObject = {};
    keys.forEach(key => newObject[key] = object[key])
    return newObject;
};

router.post('/transactions/', function (req, res, next) {
	const transaction = pluck(req.body.transaction, 'creation_date', 'value', 'person_id')
	transaction.creation_date = new Date()
	transaction.id = uuidv4()
	res.json({
		transaction
	});
	sendTransaction(transaction)
	next();
});

module.exports = router;