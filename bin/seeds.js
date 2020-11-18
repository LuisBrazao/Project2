// bin/seeds.js
const mongoose = require('mongoose');
const Painting = require('../models/Painting.js');
const DB_NAME = 'project2';
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const paintings = [
  {
    title: "Mona Lisa",
    author: "Leonardo da Vinci",
    paintedIn: 1519,
    image_url: "https://uploads7.wikiart.org/images/leonardo-da-vinci/mona-lisa.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "The Starry Night",
    author: "Vincent van Gogh",
    paintedIn: 1889,
    image_url: "https://uploads4.wikiart.org/00142/images/vincent-van-gogh/the-starry-night.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "The Persistence of Memory",
    author: "Salvador Dali",
    paintedIn: 1931,
    image_url: "https://uploads6.wikiart.org/images/salvador-dali/the-persistence-of-memory-1931.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "In Bed, The Kiss",
    author: "Henri de Toulouse-Lautrec",
    paintedIn: 1892,
    image_url: "https://uploads8.wikiart.org/images/henri-de-toulouse-lautrec/in-bed-the-kiss-1892.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "The Birth of Venus",
    author: "Sandro Botticelli",
    paintedIn: 1485,
    image_url: "https://uploads6.wikiart.org/images/sandro-botticelli/the-birth-of-venus-1485(1).jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "The Two Fridas",
    author: "Frida Kahlo",
    paintedIn: 1939,
    image_url: "https://uploads5.wikiart.org/images/magdalena-carmen-frieda-kahlo-y-calderón-de-rivera/the-two-fridas-1939.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "The School of Athens",
    author: "Raphael",
    paintedIn: 1511,
    image_url: "https://uploads6.wikiart.org/images/raphael/school-of-athens-detail-from-right-hand-side-showing-diogenes-on-the-steps-and-euclid-1511.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "The Son of Man",
    author: "Rene Magritte",
    paintedIn: 1964,
    image_url: "https://uploads3.wikiart.org/images/rene-magritte/son-of-man-1964(1).jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Camille Monet and a Child in the Artist’s Garden in Argenteuil",
    author: "Claude Monet",
    paintedIn: 1875,
    image_url: "https://uploads0.wikiart.org/images/claude-monet/madame-monet-and-child(1).jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Self-Portrait",
    author: "Pablo Picasso",
    paintedIn: 1907,
    image_url: "https://uploads3.wikiart.org/images/pablo-picasso/self-portrait-1907.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Composition A",
    author: "Piet Mondrian",
    paintedIn: 1923,
    image_url: "https://uploads3.wikiart.org/images/piet-mondrian/composition-a-1923.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Ballerina in a Death's Head",
    author: "Salvador Dali",
    paintedIn: 1939,
    image_url: "https://uploads3.wikiart.org/images/salvador-dali/ballerina-in-a-death-s-head.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "The Kiss",
    author: "Gustav Klimt",
    paintedIn: 1908,
    image_url: "https://uploads0.wikiart.org/images/gustav-klimt/the-kiss-1908(1).jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Philistines",
    author: "Jean-Michel Basquiat",
    paintedIn: 1982,
    image_url: "https://uploads3.wikiart.org/images/jean-michel-basquiat/philistines.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Woman in a White Shirt",
    author: "Lucian Freud",
    paintedIn: 1957,
    image_url: "https://uploads2.wikiart.org/images/lucian-freud/woman-in-a-white-shirt-1957.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Flowers",
    author: "Andy Warhol",
    paintedIn: 1970,
    image_url: "https://uploads1.wikiart.org/images/andy-warhol/flowers-4.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Impression, sunrise",
    author: "Claude Monet",
    paintedIn: 1872,
    image_url: "https://uploads0.wikiart.org/00129/images/claude-monet/impression-sunrise.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Lady with Fan",
    author: "Gustav Klimt",
    paintedIn: 1918,
    image_url: "https://uploads2.wikiart.org/images/gustav-klimt/lady-with-fan-1918.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Study of horses",
    author: "Leonardo da Vinci",
    paintedIn: 1490,
    image_url: "https://uploads4.wikiart.org/images/leonardo-da-vinci/study-of-horses.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Basket of Apples",
    author: "Paul Cezanne",
    paintedIn: 1895,
    image_url: "https://uploads1.wikiart.org/images/paul-cezanne/still-life-with-bottle-and-apple-basket-1894.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Portrait of Lydia Delectorskaya",
    author: "Henri Matisse",
    paintedIn: 1947,
    image_url: "https://uploads0.wikiart.org/images/henri-matisse/portrait-of-l-n-delekorskaya-1947.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "The false mirror",
    author: "Rene Magritte",
    paintedIn: 1928,
    image_url: "https://uploads0.wikiart.org/images/rene-magritte/the-false-mirror-1928(1).jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "No.8",
    author: "Mark Rothko",
    paintedIn: 1952,
    image_url: "https://uploads1.wikiart.org/images/mark-rothko/no-8-1952.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Fruit",
    author: "Alphonse Mucha",
    paintedIn: 1897,
    image_url: "https://uploads5.wikiart.org/images/alphonse-mucha/fruit-1897.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Eye",
    author: "M.C. Escher",
    paintedIn: 1946,
    image_url: "https://uploads3.wikiart.org/images/m-c-escher/eye.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Job",
    author: "Alphonse Mucha",
    paintedIn: 1896,
    image_url: "https://uploads3.wikiart.org/images/alphonse-mucha/job-1896.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "The Wounded Deer",
    author: "Frida Kahlo",
    paintedIn: 1946,
    image_url: "https://uploads7.wikiart.org/images/magdalena-carmen-frieda-kahlo-y-calderón-de-rivera/the-wounded-deer-1946.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Female Head",
    author: "Leonardo da Vinci",
    paintedIn: 1490,
    image_url: "https://uploads0.wikiart.org/images/leonardo-da-vinci/female-head.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "The Flight of the dragonfly in Front of the Sun",
    author: "Joan Miro",
    paintedIn: 1968,
    image_url: "https://uploads1.wikiart.org/images/joan-miro/the-flight-of-the-dragonfly-in-front-of-the-sun.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "The Eye of Silence",
    author: "Max Ernst",
    paintedIn: 1943,
    image_url: "https://uploads4.wikiart.org/images/max-ernst/the-eye-of-silence-1943.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "The treachery of images (This is not a pipe)",
    author: "Rene Magritte",
    paintedIn: 1929,
    image_url: "https://uploads8.wikiart.org/images/rene-magritte/the-treachery-of-images-this-is-not-a-pipe-1948(2).jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "The Luncheon on the Grass",
    author: "Edouard Manet",
    paintedIn: 1863,
    image_url: "https://uploads6.wikiart.org/images/edouard-manet/the-luncheon-on-the-grass-1863.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Woman's Head",
    author: "Leonardo da Vinci",
    paintedIn: 1473,
    image_url: "https://uploads1.wikiart.org/images/leonardo-da-vinci/woman-s-head.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Zodiac",
    author: "Alphonse Mucha",
    paintedIn: 1896,
    image_url: "https://uploads6.wikiart.org/images/alphonse-mucha/zodiac-1896.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "The Garden of Earthly Delights",
    author: "Hieronymus Bosch",
    paintedIn: 1515,
    image_url: "https://uploads7.wikiart.org/images/hieronymus-bosch/the-garden-of-earthly-delights-1515-7.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Head of a Young Woman with Tousled Hair (Leda)",
    author: "Leonardo da Vinci",
    paintedIn: 1508,
    image_url: "https://uploads6.wikiart.org/images/leonardo-da-vinci/head-of-a-young-woman-with-tousled-hair-leda.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "House of Parliament Sun",
    author: "Claude Monet",
    paintedIn: 1903,
    image_url: "https://uploads7.wikiart.org/images/claude-monet/house-of-parliament-sun.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Evening in the Studio",
    author: "Lucian Freud",
    paintedIn: 1993,
    image_url: "https://uploads5.wikiart.org/images/lucian-freud/evening-in-the-studio.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "The Baptism of Christ",
    author: "Leonardo da Vinci",
    paintedIn: 1475,
    image_url: "https://uploads1.wikiart.org/images/leonardo-da-vinci/the-baptism-of-christ.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Sky Blue",
    author: "Wassily Kandinsky",
    paintedIn: 1940,
    image_url: "https://uploads2.wikiart.org/images/wassily-kandinsky/sky-blue-1940.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Black Man Attacked by a Jaguar",
    author: "Henri Rousseau",
    paintedIn: 1910,
    image_url: "https://uploads8.wikiart.org/images/henri-rousseau/negro-attacked-by-a-jaguar-1910.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Not to be Reproduced",
    author: "Rene Magritte",
    paintedIn: 1937,
    image_url: "https://uploads4.wikiart.org/images/rene-magritte/not-to-be-reproduced-1937(1).jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Skull",
    author: "Jean-Michel Basquiat",
    paintedIn: 1981,
    image_url: "https://uploads5.wikiart.org/images/jean-michel-basquiat/head.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Drawing Hands",
    author: "M.C. Escher",
    paintedIn: 1948,
    image_url: "https://uploads4.wikiart.org/images/m-c-escher/drawing-hands.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Portrait of Adele Bloch-Bauer I",
    author: "Gustav Klimt",
    paintedIn: 1907,
    image_url: "https://uploads0.wikiart.org/images/gustav-klimt/portrait-of-adele-bloch-bauer-i(1).jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Leeches",
    author: "Jean-Michel Basquiat",
    paintedIn: 1983,
    image_url: "https://uploads8.wikiart.org/images/jean-michel-basquiat/leeches.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Avond (Evening): The Red Tree",
    author: "Piet Mondrian",
    paintedIn: 1910,
    image_url: "https://uploads7.wikiart.org/images/piet-mondrian/avond-evening-the-red-tree-1910.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Elvis I & II",
    author: "Andy Warhol",
    paintedIn: 1963,
    image_url: "https://uploads8.wikiart.org/images/andy-warhol/elvis-presley(1).jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Jeanne Hebuterne",
    author: "Amedeo Modigliani",
    paintedIn: 1919,
    image_url: "https://uploads1.wikiart.org/images/amedeo-modigliani/jeanne-hebuterne-1919.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Woman with Long Hair",
    author: "Man Ray",
    paintedIn: 1929,
    image_url: "https://uploads4.wikiart.org/images/man-ray/woman-with-long-hair-1929.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Composition IV",
    author: "Wassily Kandinsky",
    paintedIn: 1911,
    image_url: "https://uploads8.wikiart.org/images/wassily-kandinsky/composition-iv-1911.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Irony of the Negro Policeman",
    author: "Jean-Michel Basquiat",
    paintedIn: 1981,
    image_url: "https://uploads8.wikiart.org/images/jean-michel-basquiat/ironew-york-of-the-negro-policeman.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Ophelia",
    author: "John William Waterhouse",
    paintedIn: 1889,
    image_url: "https://uploads7.wikiart.org/images/john-william-waterhouse/ophelia-1889.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "The blank signature",
    author: "Rene Magritte",
    paintedIn: 1965,
    image_url: "https://uploads3.wikiart.org/images/rene-magritte/the-blank-signature-1965(1).jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Bird on Money",
    author: "Jean-Michel Basquiat",
    paintedIn: 1981,
    image_url: "https://uploads5.wikiart.org/images/jean-michel-basquiat/bird-on-money.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Flint Castle",
    author: "J.M.W. Turner",
    paintedIn: 1838,
    image_url: "https://uploads7.wikiart.org/images/william-turner/flint-castle.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Café Terrace at Night (Place du Forum, Arles)",
    author: "Vincent van Gogh",
    paintedIn: 1888,
    image_url: "https://uploads2.wikiart.org/images/vincent-van-gogh/cafe-terrace-place-du-forum-arles-1888(1).jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Annunciation",
    author: "Leonardo da Vinci",
    paintedIn: 1472,
    image_url: "https://uploads1.wikiart.org/00226/images/leonardo-da-vinci/1503990074029518-568314.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Modern Rhapsody",
    author: "Salvador Dali",
    paintedIn: 1957,
    image_url: "https://uploads0.wikiart.org/images/salvador-dali/modern-rhapsody.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Portrait of woman in d`hermine pass (Olga)",
    author: "Pablo Picasso",
    paintedIn: 1923,
    image_url: "https://uploads0.wikiart.org/images/pablo-picasso/utitle-1937-8.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Yellow-Red-Blue",
    author: "Wassily Kandinsky",
    paintedIn: 1925,
    image_url: "https://uploads0.wikiart.org/images/wassily-kandinsky/yellow-red-blue-1925.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Soap factory of Bagnolet",
    author: "Alphonse Mucha",
    paintedIn: 1897,
    image_url: "https://uploads6.wikiart.org/images/alphonse-mucha/soap-factory-of-bagnolet-1897.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Lizard",
    author: "M.C. Escher",
    paintedIn: 1942,
    image_url: "https://uploads8.wikiart.org/images/m-c-escher/lizard-1.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "The Manneport",
    author: "Claude Monet",
    paintedIn: 1882,
    image_url: "https://uploads6.wikiart.org/images/claude-monet/the-manneport.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Water Lilies",
    author: "Claude Monet",
    paintedIn: 1916,
    image_url: "https://uploads8.wikiart.org/images/claude-monet/water-lilies-40.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "50 cent Piece",
    author: "Jean-Michel Basquiat",
    paintedIn: 1983,
    image_url: "https://uploads5.wikiart.org/images/jean-michel-basquiat/50-cent-piece.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "The Trappistine",
    author: "Alphonse Mucha",
    paintedIn: 1897,
    image_url: "https://uploads6.wikiart.org/images/alphonse-mucha/the-trappistine-1897.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Piazza d'Italia",
    author: "Giorgio de Chirico",
    paintedIn: 1913,
    image_url: "https://uploads1.wikiart.org/images/giorgio-de-chirico/piazza-d-italia-1913.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Mosaic II",
    author: "M.C. Escher",
    paintedIn: 1957,
    image_url: "https://uploads0.wikiart.org/images/m-c-escher/mosaic-ii.jpg!Large.jpg",
    price: 10000,
    total: 5
},
{
    title: "Three Dancers in an Exercise Hall",
    author: "Edgar Degas",
    paintedIn: 1880,
    image_url: "https://uploads7.wikiart.org/images/edgar-degas/three-dancers-in-an-exercise-hall.jpg!Large.jpg",
    price: 10000,
    total: 5
}
];
Painting.create(paintings)
  .then(paintingsFromDB => {
    console.log(`Created ${paintingsFromDB.length} paitings`);
    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating paintings from the DB: ${err}`));