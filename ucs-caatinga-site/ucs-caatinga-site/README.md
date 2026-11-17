# UCs CAATINGA: Fortalecendo a Conservação Municipal

Site de acompanhamento do projeto (Graça e Maranguape), em um único arquivo `index.html` (HTML, CSS e JavaScript, sem dependências e sem etapa de build).

## Publicar no GitHub Pages

1. No GitHub, crie um repositório novo (ex.: `ucs-caatinga`).
2. Envie `index.html`, `README.md` e `.nojekyll` para a raiz do repositório (botão **Add file > Upload files**).
3. Em **Settings > Pages**, em *Build and deployment*, escolha **Deploy from a branch**, branch `main` e pasta `/ (root)`, e salve.
4. Após alguns minutos o site fica em `https://SEU-USUARIO.github.io/ucs-caatinga/`.

## Como os dados são guardados

Links do Google Drive, mapas, datas de campo e avisos ficam no `localStorage` do navegador de cada pessoa. Eles **não são compartilhados** entre os membros da equipe nem entre aparelhos. Para compartilhar, é preciso ligar o site a um banco de dados externo (por exemplo Firebase ou Supabase).

## Observações

- Os arquivos e pastas do Google Drive precisam estar compartilhados com quem for acessar.
- Se um PDF, SIG ou painel não aparecer dentro da página, use o botão **Abrir em nova aba**.
- Para alterar o conteúdo fixo (produtos, entregas, cronograma, link do Drive do projeto), edite as listas no início do bloco `<script>` do `index.html`.
