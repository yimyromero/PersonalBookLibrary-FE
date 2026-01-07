export const isValidPassword = (password) => {
	const PWD_REGEX = /^(?=.*[a-zA-Z])(?=.*[!@#$%])(?=.*[0-9]).{8,}$/;

	return PWD_REGEX.test(password);
};
