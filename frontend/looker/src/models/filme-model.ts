export interface FilmeModel {
  id: number;
  titulo: string;
  diretor: string;
  anoLancamento: number;
  genero: string;
  duracao: number;
  classificacaoIndicativa: string;
  sinopse: string;
  elenco: string[];
  idioma: string;
  paisOrigem: string;
  avaliacaoCritica: number;
  numeroVotos: number;

  disponivelAluguel: boolean;
  precoAluguel: number;
  dataAdicao: Date;
  posterUrl: string;
}

export const mockFilmes: FilmeModel[] = [
  {
    id: 1,
    titulo: 'O Poderoso Chefão',
    diretor: 'Francis Ford Coppola',
    anoLancamento: 1972,
    genero: 'Crime, Drama',
    duracao: 175,
    classificacaoIndicativa: '14 anos',
    sinopse: 'O patriarca envelhecido de uma dinastia do crime organizado transfere o controle de seu império clandestino para seu filho relutante.',
    elenco: ['Marlon Brando', 'Al Pacino', 'James Caan'],
    idioma: 'Inglês, Italiano',
    paisOrigem: 'EUA',
    avaliacaoCritica: 9.2,
    numeroVotos: 1980000,
    disponivelAluguel: true,
    precoAluguel: 14.99,
    dataAdicao: new Date('2023-01-15T10:00:00Z'),
    posterUrl: 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/uP46DujkD3nwcisOjz9a0Xw0Knj.jpg'
  },
  {
    id: 2,
    titulo: 'Interestelar',
    diretor: 'Christopher Nolan',
    anoLancamento: 2014,
    genero: 'Ficção Científica, Aventura',
    duracao: 169,
    classificacaoIndicativa: '10 anos',
    sinopse: 'Uma equipe de exploradores viaja através de um buraco de minhoca no espaço, na tentativa de garantir a sobrevivência da humanidade.',
    elenco: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
    idioma: 'Inglês',
    paisOrigem: 'EUA',
    avaliacaoCritica: 8.6,
    numeroVotos: 1800000,
    disponivelAluguel: true,
    precoAluguel: 12.99,
    dataAdicao: new Date('2023-02-20T12:30:00Z'),
    posterUrl: 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/6ricSDD83BClJsFdGB6x7cM0MFQ.jpg'
  },
  {
    id: 3,
    titulo: 'Parasita',
    diretor: 'Bong Joon Ho',
    anoLancamento: 2019,
    genero: 'Comédia, Drama, Suspense',
    duracao: 132,
    classificacaoIndicativa: '16 anos',
    sinopse: 'A família de Ki-taek, desempregada, se interessa pela abastada família Park para se infiltrar em suas vidas e obter uma renda.',
    elenco: ['Song Kang-ho', 'Choi Woo-shik', 'Park So-dam'],
    idioma: 'Coreano',
    paisOrigem: 'Coreia do Sul',
    avaliacaoCritica: 8.5,
    numeroVotos: 850000,
    disponivelAluguel: false,
    precoAluguel: 9.99,
    dataAdicao: new Date('2023-03-10T09:15:00Z'),
    posterUrl: 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/bik2BZjmVjeE6LOZqtuTjb4jJPQ.jpg'
  },
  {
    id: 4,
    titulo: 'Pulp Fiction: Tempo de Violência',
    diretor: 'Quentin Tarantino',
    anoLancamento: 1994,
    genero: 'Crime, Drama',
    duracao: 154,
    classificacaoIndicativa: '18 anos',
    sinopse: 'As vidas de dois assassinos de aluguel, um boxeador, a esposa de um gangster e dois ladrões de lanchonete se entrelaçam em quatro contos de violência e redenção.',
    elenco: ['John Travolta', 'Samuel L. Jackson', 'Uma Thurman'],
    idioma: 'Inglês',
    paisOrigem: 'EUA',
    avaliacaoCritica: 8.9,
    numeroVotos: 2100000,
    disponivelAluguel: true,
    precoAluguel: 11.99,
    dataAdicao: new Date('2023-04-05T15:45:00Z'),
    posterUrl: 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/tptjnB2LDbuUWya9Cx5sQtv5hqb.jpg'
  }
];
