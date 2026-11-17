# UCs CAATINGA: Fortalecendo a Conservação Municipal

Site de acompanhamento do projeto (Graça e Maranguape). Não precisa de instalação nem de build.

## Estrutura

```
ucs-caatinga-site/
├── index.html        # página (HTML, CSS e JavaScript)
├── assets/
│   ├── logo.jpg      # logo da Associação Caatinga
│   └── fluxo.jpg     # fluxo das atividades
├── apps-script/
│   ├── Code.gs       # script que grava na planilha
│   └── LEIA-ME.md
├── .nojekyll
└── README.md
```

O `index.html` carrega as imagens por caminho relativo (`assets/...`), então mantenha a pasta `assets` ao lado dele. Para usar, abra o `index.html` com duplo clique ou publique a pasta inteira.

## Publicar no GitHub Pages

1. Crie um repositório e envie o **conteúdo** da pasta (index.html, assets, .nojekyll, README.md).
2. Em **Settings > Pages**, escolha **Deploy from a branch**, branch `main` e pasta `/ (root)`.
3. O site fica em `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

## Dados (links, mapas, datas de campo e avisos)

Os dados ficam em uma planilha do Google compartilhada, por meio de um Apps Script. Siga `apps-script/LEIA-ME.md` e cole a URL do script em `SHEET_URL` no `index.html`. Enquanto `SHEET_URL` estiver vazia, o site funciona em modo local: os dados ficam só no navegador de cada pessoa.

## Editar o conteúdo fixo

Produtos, entregas, cronograma e o link do Drive do projeto ficam nas listas no início do bloco `<script>` do `index.html`.
