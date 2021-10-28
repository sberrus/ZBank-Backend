/**
 * @description Check if only one query is sended
 * @returns
 */
const singleQuery = (req, res, next) => {
	const { transactionID, accountID } = req.query;
	if (transactionID && accountID) {
		return res
			.status(400)
			.json({ error: "Demasiados parametros para la consulta" });
	}
	next();
};

module.exports = { singleQuery };
