# Armazenar os links na planilha do Google

O site (GitHub Pages) não consegue gravar direto numa planilha. Por isso usamos um pequeno script do Google (Apps Script) ligado à planilha. O script lê e grava os dados, e o site conversa com ele.

## Configurar (uma vez, com a conta dona da planilha)

1. Abra a planilha e vá em **Extensões > Apps Script**.
2. Apague o código que aparecer e cole o conteúdo de `Code.gs`. Salve.
3. Clique em **Implantar > Nova implantação > Tipo: App da Web**.
   - **Executar como:** Eu
   - **Quem pode acessar:** Qualquer pessoa
4. Clique em **Implantar** e autorize o acesso quando o Google pedir.
5. Copie a URL do app da Web (termina em `/exec`).
6. No `index.html`, na linha `var SHEET_URL="";`, cole a URL entre as aspas:
   `var SHEET_URL="https://script.google.com/macros/s/XXXX/exec";`
7. Envie o `index.html` atualizado para o GitHub.

O script cria sozinho a aba **dados** na planilha. Quem usa o site não precisa de acesso à planilha.

## Observações

- Se mudar o `Code.gs` depois, faça uma nova implantação (Implantar > Gerenciar implantações > editar > Nova versão).
- O site consulta a planilha a cada 30 segundos, então uma alteração pode levar esse tempo para aparecer para os outros usuários.
- Como a URL fica visível no código do site, qualquer pessoa que a encontre consegue ler e alterar os dados. Para uso interno isso costuma bastar. Se precisar de mais proteção, dá para exigir um código da equipe antes de gravar.
