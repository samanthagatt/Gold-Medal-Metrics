var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./gold_medals.sqlite');


const mostWins = (country, column, season) => {
    return `
        SELECT ${column}, COUNT(*) AS 'count'
        FROM GoldMedal
        WHERE country = '${country}'${season ? ` AND season = '${season}'` : ''}
        GROUP BY ${column}
        ORDER BY 2 DESC
        LIMIT 1;
    `;
};

const countForBestYear = (country, season) => {
    return mostWins(country, 'year', season);
};

const numberOfWinsByGender = (country, men) => {
    return `
        SELECT gender, COUNT(DISTINCT name)
        FROM GoldMedal
        WHERE country = '${country}' AND gender = '${men ? 'Men' : 'Women'}';
    `;
}


/*
Returns a SQL query string that will create the Country table with four columns: name (required), code (required), gdp, and population.
*/

const createCountryTable = () => {
    return `CREATE TABLE Country (
        name TEXT NOT NULL,
        code TEXT NOT NULL,
        gdp INTEGER,
        population INTEGER
    );`;
};

/*
Returns a SQL query string that will create the GoldMedal table with ten columns (all required): id, year, city, season, name, country, gender, sport, discipline, and event.
*/

const createGoldMedalTable = () => {
    return `CREATE TABLE GoldMedal (
        id INTEGER PRIMARY KEY,
        year INTEGER NOT NULL,
        city TEXT NOT NULL,
        season TEXT NOT NULL,
        name TEXT NOT NULL,
        country TEXT NOT NULL,
        gender TEXT NOT NULL,
        sport TEXT NOT NULL,
        discipline TEXT NOT NULL,
        event TEXT NOT NULL
    );`;
};

/*
Returns a SQL query string that will find the number of gold medals for the given country.
*/

const goldMedalNumber = country => {
    return `
        SELECT COUNT(*) AS 'count'
        FROM GoldMedal
        WHERE country = '${country}';
    `;
};

/*
Returns a SQL query string that will find the year where the given country 
won the most summer medals, along with the number of medals aliased to 'count'.
*/

const mostSummerWins = country => {
    return countForBestYear(country, 'Summer');
};

/*
Returns a SQL query string that will find the year where the given country 
won the most winter medals, along with the number of medals aliased to 'count'.
*/

const mostWinterWins = country => {
    return countForBestYear(country, 'Winter');
};

/*
Returns a SQL query string that will find the year where the given country 
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestYear = country => {
    return countForBestYear(country);
};


/*
Returns a SQL query string that will find the discipline this country has 
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestDiscipline = country => {
    return mostWins(country, 'discipline');
};

/*
Returns a SQL query string that will find the sport this country has 
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestSport = country => {
    return mostWins(country, 'sport');
};

/*
Returns a SQL query string that will find the event this country has 
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestEvent = country => {
    return mostWins(country, 'event');
};

/*
Returns a SQL query string that will find the number of male medalists.
*/

const numberMenMedalists = country => {
    return numberOfWinsByGender(country, true);
};

/*
Returns a SQL query string that will find the number of female medalists.
*/

const numberWomenMedalists = country => {
    return numberOfWinsByGender(country);
};

/*
Returns a SQL query string that will find the athlete with the most medals.
*/

const mostMedaledAthlete = country => {
    return mostWins(country, 'name');
};

/*
Returns a SQL query string that will find the medals a country has won
optionally ordered by the given field in the specified direction.
*/

const orderedMedals = (country, field, sortAscending) => {
    const direction = sortAscending ? '' : ' DESC';
    const orderBy = field ? `
        GROUP BY ${field}
        ORDER BY ${field}${direction}` : '';
    return `
        SELECT *
        FROM GoldMedal
        WHERE country = '${country}'${orderBy};
    `;
};

/* BONUS:
Returns a SQL query string that will find the sports a country has
won medals in. It should include the number of medals, aliased as 'count',
as well as the percentage of this country's wins the sport represents,
aliased as 'percent'. Optionally ordered by the given field in the specified direction.
*/

const orderedSports = (country, field, sortAscending) => {
    return;
};

module.exports = {
    createCountryTable,
    createGoldMedalTable,
    goldMedalNumber,
    mostSummerWins,
    mostWinterWins,
    bestDiscipline,
    bestSport,
    bestYear,
    bestEvent,
    numberMenMedalists,
    numberWomenMedalists,
    mostMedaledAthlete,
    orderedMedals,
    orderedSports
};
