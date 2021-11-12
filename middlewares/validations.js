const passwordVerification = (req, res, next) => {
	const { password, passwordConfirm } = req.body;

	if (!(password === passwordConfirm)) {
		return res.status(400).json({ error: "contraseñas no coinciden" });
	}
	next();
};

module.exports = { passwordVerification };
