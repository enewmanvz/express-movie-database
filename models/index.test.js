//import the associated models from index.js
const {Cast, Crew, Movie, sequelize} = require('./index')

//test Movie database CRUD
describe('Movie Database', () => {

    beforeAll(async() => {
        //reset database
        await sequelize.sync({force:true})
        //create array of movies
        const arrayOfMovies = [
            {title: 'The Best Man', genre: 'Drama', runtime: 90, releaseDate: '1999-10-10', mPAArating: 'R'},
            {title: 'Avengers', genre: 'Superhero',runtime: 120, releaseDate: '2012-04-05', mPAArating: 'R'},
        ]
        //create array of casts
        const arrayOfCasts =[
            {name: 'Robert Downey Jr.', role: 'Iron Man', isStar: true, filmography: 'Actor|Producer|Writer', numfilmCredit: 94},
            {name: 'Chris Evans', role: 'Captain America', isStar: true, filmography: 'Actor|Producer|Director', numfilmCredit: 58},
            {name: 'Scarlet Johansson', role: 'Black Widow', isStar: true, filmography: 'Actor|Producer|Director', numfilmCredit: 74},
            {name: 'Sanaa Lathan', role: 'Robin', isStar: false, filmography: 'Actor|Producer|Director', numfilmCredit: 49},
            {name: 'Morris Chestnut', role: 'Lance Sullivan', isStar: true, filmography: 'Actor|Producer|Director', numfilmCredit: 54},
            {name: 'Regina Hall', role: 'Candy', isStar: false, filmography: 'Actor|Producer|Soundtrack', numfilmCredit: 59},
        ]
        //create array of crews
        const arrayOfCrews =[
           {name: 'Joss Whedon', crewCredit: 'Director', filmography: 'Writer|Producer|Director', knownFor: 'Writer-Buffy the Vampire Slayer', numfilmCredit: 17},
           {name: 'Zak Penn', crewCredit: 'Writer', filmography: 'Writer|Producer|Actor', knownFor: 'Writer-X2: X-Men United', numfilmCredit: 23},
           {name: 'Malcom Lee', crewCredit: 'Director', filmography: 'Director|Producer|Writer', knownFor: "Director-Girl's Trip", numfilmCredit: 20},
           {name: 'Jon Favreau', crewCredit: 'Producer', filmography: 'Producer|Actor|Director', knownFor: 'Poducer-Iron Man', numfilmCredit: 32},
           {name: 'Malcom Lee', crewCredit: 'Writer', filmography: 'Writer|Producer|Director', knownFor: "Writer-Best Man Holiday", numfilmCredit: 20},
        ]    
        //add arrays to database
        await Movie.bulkCreate(arrayOfMovies)
        await Cast.bulkCreate(arrayOfCasts)
        await Crew.bulkCreate(arrayOfCrews)
    })
        //create instances of Cast Model for testin
        test('Casts have name', async() => {
        //read test instance from db
        const testCast = await Cast.findOne({where: {name: 'Robert Downey Jr.'}});
        expect(testCast.name).toBe('Robert Downey Jr.')
    })

        test('Casts have an role', async() => {
        //read test Cast instance from db
        const testCast = await Cast.findOne({where: {name: 'Robert Downey Jr.'}});
        expect(testCast.role).toBe('Iron Man')
    })
        //create instances of Crew Model for testin
        test('Crew have crew has a name', async() => {
        //read test instance from db
        const testCrew = await Crew.findOne({where: {name: 'Joss Whedon'}});
        expect(testCrew.name).toBe('Joss Whedon')
    })

        test('Crews have an crewCredit', async() => {
        //read test instance from db
        const testCrew = await Crew.findOne({where: {name: 'Joss Whedon'}});
        expect(testCrew.crewCredit).toBe('Director')
    })
        test('can create a Movie', async() => {
        //read test Movie instance from db
        const testMovie = await Movie.findOne({where: {title: 'Avengers'}});
        const testMovie2 = await Movie.findOne({where: {title: 'The Best Man'}});
        expect(testMovie.genre).toBe('Superhero')
        expect(testMovie2.genre).toBe('Drama')
    })

        test('Movies can have many Casts', async()=> {
        //read test Movie instance from db
        const testMovie = await Movie.findOne({where: {title: 'Avengers'}});        
        const testCast1 = await Cast.findOne({where: {name: 'Robert Downey Jr.'}})
        const testCast2 = await Cast.findOne({where: {name: 'Scarlet Johansson'}})
        const testCast3 = await Cast.findOne({where: {name: 'Chris Evans'}})

        await testMovie.addCast(testCast1)
        await testMovie.addCast(testCast2)
        await testMovie.addCast(testCast3)

        //retrieve list of Casts in this Movie
        const CastList = await testMovie.getCasts()
        //assert that the list of Casts is length 2
        expect(CastList.length).toBe(3)
        //assert that the 0th index of the array CastList is an instance of the model Cast
        expect(CastList[0] instanceof Cast).toBeTruthy()
        expect(CastList[0].name).toMatch('Robert Downey Jr.')
        expect(CastList[1].name).toMatch('Chris Evans')
        expect(CastList[2].name).toMatch('Scarlet Johansson')

    })

    afterAll(async()=> {
        // await sequelize.sync({force:true})
        sequelize.close()
    })

})