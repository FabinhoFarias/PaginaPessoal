# Galeria do portfólio

Os projetos e suas informações ficam em [`../../data/projetos.json`](../../data/projetos.json). Cada projeto pode ter uma pasta de fotos com o mesmo nome informado em `gallery.folder`. A galeria não detecta arquivos novos sozinha: cada foto também precisa ser cadastrada no JSON.

Os nomes e as descrições iniciais dos projetos existentes já estão preenchidos. Edite os campos `name` e `description` do projeto correspondente para personalizar o texto exibido no site.

Para visualizar o site localmente, abra a pasta por um servidor local (por exemplo, a extensão Live Server do VS Code). O navegador bloqueia o carregamento do JSON quando `index.html` é aberto diretamente como `file://`.

```text
img/galeria/
  DonRuan/
    DonRuanNoCIn.jpg
    Marco0.jpg
    OpenDay1.jpg
    OpenDay2.jpg
    OpenDay3.jpg
    openDaydiretoria.jpg
    professoresDonRuan.jpg
  Graduacao/
    FabinhoJam.jpg
    FotoComPoster.jpg
```

Mantenha cada foto na pasta do projeto correspondente e cadastre-a na lista `gallery.photos` desse projeto no JSON.

Para adicionar uma foto:

1. Coloque o arquivo na pasta do projeto.
2. Adicione um item em `gallery.photos` no JSON com `file`, `order` e `alt`.
3. Use números únicos em `order` para definir a sequência.

Até 3 fotos usam o layout compacto; mais de 3 usam o layout de álbum. Para novos projetos, inclua todos os campos do exemplo abaixo e ajuste os valores. Use `hasLink: false` e `linkUrl: null` quando não houver redirecionamento. Marque `isApplication: true` para aplicativos.

```json
{
  "id": "novo-projeto",
  "name": "Novo projeto",
  "description": "Uma breve descrição do projeto.",
  "category": "aplicacao",
  "icon": "✦",
  "displayOrder": 5,
  "showInHighlights": true,
  "isApplication": true,
  "hasLink": true,
  "linkUrl": "https://exemplo.com",
  "linkLabel": "Visitar projeto",
  "gallery": {
    "folder": "NovoProjeto",
    "photos": [
      {
        "file": "TelaInicial.jpg",
        "order": 1,
        "alt": "Tela inicial do projeto."
      }
    ]
  }
}
```

A seção de graduação já está preparada. Adicione suas fotos em `Graduacao` e registre cada uma no JSON; depois, o arquivo `ADICIONE-FOTOS.txt` pode ser removido.
