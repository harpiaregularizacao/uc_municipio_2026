# Armazenar os dados na planilha do Google e enviar e-mails

O site (GitHub Pages) não consegue gravar direto numa planilha nem enviar e-mails. Por isso usamos um pequeno script do Google (Apps Script) ligado à planilha. O script lê e grava os dados (links, pastas, mapas, datas de campo, avisos e equipe) e envia o e-mail de notificação dos avisos.

## Configurar pela primeira vez (conta dona da planilha)

1. Abra a planilha e vá em **Extensões > Apps Script**.
2. Apague o código que aparecer e cole o conteúdo de `Code.gs`. Salve.
3. Clique em **Implantar > Nova implantação > Tipo: App da Web**.
   - **Executar como:** Eu
   - **Quem pode acessar:** Qualquer pessoa
4. Clique em **Implantar** e autorize o acesso quando o Google pedir.
5. Copie a URL do app da Web (termina em `/exec`).
6. No `index.html`, cole a URL entre as aspas em `var SHEET_URL="...";`.
7. Envie o `index.html` atualizado para o GitHub.

## Atualizar o script já implantado (mantém a mesma URL e os dados)

1. Em **Extensões > Apps Script**, substitua o código pelo novo `Code.gs` e salve.
2. Clique em **Implantar > Gerenciar implantações**, no ícone de lápis da implantação existente.
3. Em **Versão**, escolha **Nova versão** e clique em **Implantar**. A URL continua a mesma.
4. Na primeira vez, o Google pede uma nova autorização, porque agora o script envia e-mails. Autorize com a conta dona da planilha (se aparecer "O Google não verificou este app", clique em **Avançado** e depois em **Acessar**).

Os dados que já estão na aba **dados** não são alterados. A equipe fica na mesma aba, com a coleção `equipe`.

## Como funciona o e-mail dos avisos

- Ao clicar em **Publicar aviso**, cada membro cadastrado em **Cadastrar equipe** recebe um e-mail com o assunto "Notificação Projeto UC Municipais 2026" e, no corpo, o texto do aviso.
- Os e-mails saem da conta que implantou o script. Cada membro recebe uma mensagem individual e não vê os outros destinatários.
- Os e-mails da equipe ficam só na planilha e não são enviados ao navegador. O site recebe apenas os nomes.
- Cota do Google: contas gratuitas (Gmail) enviam até cerca de 100 destinatários por dia, e contas Google Workspace até cerca de 1.500. Cada membro conta como um destinatário por aviso.
- Há um limite de segurança de 10 avisos com e-mail a cada 10 minutos, para evitar abuso.

## Observações

- O site consulta a planilha a cada 30 segundos, então uma alteração pode levar esse tempo para aparecer para os outros usuários.
- Como a URL fica visível no código do site, qualquer pessoa que a encontre consegue ler e alterar os dados e disparar avisos (dentro do limite acima). Para uso interno isso costuma bastar. Se precisar de mais proteção, dá para exigir um código da equipe antes de gravar.
