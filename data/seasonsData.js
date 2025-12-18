// rop-map/data/seasonsData.js
const DATA_SEASONS = [
    {
        id: 1,
        name: "Rings of Power - Season 1",
        episodes: 8,
        characters: ["Arondir","Elendil","Elrond","Galadriel","Halbrand","Nori"],
        markersRelevant: marker => marker.episodes.some(e => e.season === 1)
    },
    {
        id: 2,
        name: "Rings of Power - Season 2",
        episodes: 8,
        characters: ["Galadriel","Arondir"], // add more for S2
        markersRelevant: marker => marker.episodes.some(e => e.season === 2)
    },
    {
        id: 3,
        name: "Rings of Power - Season 3",
        episodes: 8,
        characters: ["Elendil","Elrond","Halbrand","Nori"],
        markersRelevant: marker => marker.episodes.some(e => e.season === 2)
    },
    {
        id: 100,
        name: "The Lord of the Rings (Movies)",
        episodes: 1,
        characters: ["Frodo and Sam"],
        markersRelevant: marker => marker.episodes.some(e => e.season === 100 || e.season === 101)
    },
        {
        id: 104,
        name: "The Hobbit (Movies)",
        episodes: 1,
        characters: ["Bilbo and Thorin"],
        markersRelevant: marker => marker.episodes.some(e => e.season === 100 || e.season === 101)
    }
];