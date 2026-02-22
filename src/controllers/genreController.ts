import type { Request, Response, NextFunction } from 'express';
import { GenreRepository } from 'src/repositories/GenreRepository.js';

const getGenreByName = async (req: Request, res: Response) => {
	if (!req.params.genreName || typeof(req.params.genreName) != 'string' || !req.params.genreName.trim()) {
		return res.status(400).json({
			success: false,
			message: 'Nome do gênero não foi fornecido!'
		});
	}

	try {
		const genre = await GenreRepository.getGenreByName(req.params.genreName);
		if (!genre) {
			return res.status(404).json({
				success: false,
				message: `Gênero ${req.params.genreName} não encontrado.`
			});
		}
		return res.status(200).json({
			success: true,
			data: genre
		});
	} catch (error) {
		console.error(`Erro ao buscar gênero por nome: ${error}`);
		return res.status(500).json({
			success: false,
			error: error.message
		});
	}