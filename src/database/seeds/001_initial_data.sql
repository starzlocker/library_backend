-- Inserir categorias padrão
INSERT INTO categories (name, description) VALUES
('Ficção', 'Livros de literatura e ficção'),
('Não-Ficção', 'Livros informativos e educacionais'),
('Biografia', 'Biografias e autobiografias'),
('História', 'Livros sobre história e eventos históricos'),
('Ciência', 'Livros sobre ciências exatas e naturais'),
('Tecnologia', 'Livros sobre tecnologia e computação'),
('Filosofia', 'Livros sobre filosofia e pensamento'),
('Psicologia', 'Livros sobre psicologia e comportamento'),
('Autoajuda', 'Livros de desenvolvimento pessoal'),
('Romance', 'Livros de romance e relacionamentos'),
('Suspense', 'Livros de suspense e mistério'),
('Fantasia', 'Livros de fantasia e ficção científica'),
('Infantil', 'Livros para crianças'),
('Juvenil', 'Livros para adolescentes e jovens'),
('Acadêmico', 'Livros acadêmicos e didáticos');

-- Inserir alguns autores famosos
INSERT INTO authors (name, biography, nationality) VALUES
('Machado de Assis', 'Joaquim Maria Machado de Assis foi um escritor brasileiro, considerado um dos maiores nomes da literatura brasileira e mundial.', 'Brasileira'),
('Clarice Lispector', 'Clarice Lispector foi uma escritora e jornalista brasileira, uma das mais importantes escritoras brasileiras do século XX.', 'Brasileira'),
('Paulo Coelho', 'Paulo Coelho é um romancista, jornalista e teatrólogo brasileiro, um dos escritores mais lidos do mundo.', 'Brasileira'),
('José Saramago', 'José Saramago foi um escritor português, Prêmio Nobel de Literatura de 1998.', 'Portuguesa'),
('Gabriel García Márquez', 'Gabriel García Márquez foi um escritor, jornalista, editor e ativista político colombiano, Prêmio Nobel de Literatura de 1982.', 'Colombiana');

-- Inserir um usuário administrador padrão
INSERT INTO users (name, email, password_hash, role) VALUES
('Administrador', 'admin@biblioteca.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');
-- Senha padrão: "password" (deve ser alterada no primeiro login)

-- Inserir alguns usuários de exemplo
INSERT INTO users (name, email, password_hash, role, phone) VALUES
('João Silva', 'joao@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'user', '(11) 99999-1111'),
('Maria Santos', 'maria@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'librarian', '(11) 99999-2222'),
('Pedro Oliveira', 'pedro@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'user', '(11) 99999-3333');

-- Inserir alguns livros de exemplo
WITH fiction_category AS (SELECT id FROM categories WHERE name = 'Ficção'),
     machado_author AS (SELECT id FROM authors WHERE name = 'Machado de Assis'),
     clarice_author AS (SELECT id FROM authors WHERE name = 'Clarice Lispector'),
     paulo_author AS (SELECT id FROM authors WHERE name = 'Paulo Coelho')

INSERT INTO books (title, isbn, publisher, publication_date, pages, synopsis, category_id, total_copies, available_copies, location) 
SELECT 'Dom Casmurro', '978-85-359-0277-5', 'Companhia das Letras', '2008-01-01', 256, 
       'Romance narrado em primeira pessoa por Bento Santiago, que conta a história de seu amor por Capitu.',
       fiction_category.id, 3, 3, 'Estante A-1'
FROM fiction_category;

INSERT INTO books (title, isbn, publisher, publication_date, pages, synopsis, category_id, total_copies, available_copies, location)
SELECT 'A Hora da Estrela', '978-85-359-0123-4', 'Rocco', '1998-01-01', 104,
       'Último romance de Clarice Lispector, conta a história de Macabéa, uma jovem nordestina.',
       fiction_category.id, 2, 2, 'Estante A-2'
FROM fiction_category;

INSERT INTO books (title, isbn, publisher, publication_date, pages, synopsis, category_id, total_copies, available_copies, location)
SELECT 'O Alquimista', '978-85-250-5444-3', 'Planeta', '2014-01-01', 208,
       'A história de Santiago, um jovem pastor que empreende uma jornada em busca de um tesouro.',
       fiction_category.id, 5, 5, 'Estante B-1'
FROM fiction_category;

-- Relacionar livros com autores
INSERT INTO book_authors (book_id, author_id)
SELECT b.id, a.id
FROM books b, authors a
WHERE b.title = 'Dom Casmurro' AND a.name = 'Machado de Assis';

INSERT INTO book_authors (book_id, author_id)
SELECT b.id, a.id
FROM books b, authors a
WHERE b.title = 'A Hora da Estrela' AND a.name = 'Clarice Lispector';

INSERT INTO book_authors (book_id, author_id)
SELECT b.id, a.id
FROM books b, authors a
WHERE b.title = 'O Alquimista' AND a.name = 'Paulo Coelho';
