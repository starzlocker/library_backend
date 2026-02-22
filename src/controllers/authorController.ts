const getAuthorByName = async (authorName) {
	if (!authorName || typeof(authorName) != 'string' || !authorName.strip()) {
		throw new Error('Nome do autor não foi fornecido!');
	}

	
}
