if ! git merge-base --is-ancestor origin/develop HEAD; then	
	echo "::error::Sua branch não está atualizada com a develop."
	exit 1
fi
