const {Cast, Crew, Movie, sequelize} = require('./index')

//test Movie database CRUD
describe('Movie Database', () => {

    beforeAll(async() => {

        await sequelize.sync({force:true})

        const arrayOfMovies = [
            {title: 'The Best Man', genre: 'Drama', runtime: 90, released: '1999-10-10', MPAA_rate: "R", movie_id: 1},
            {title: 'Avengers', genre: 'Superhero',runtime: 120, released: '2012-04-05', MPAA_rate: "R", movie_id: 2},
            {title: 'Sherlock Holmes', genre: 'Mystery',runtime: 120, released: '2012-04-05', MPAA_rate: "R", movie_id: 3},
            {title: 'Girl`s Trip', genre: 'Comedy',runtime: 120, released: '2019-04-05', MPAA_rate: "R", movie_id: 4},
            {title: 'Catch Me If You Can', genre: 'Drama',runtime: 120, released: '2002-25-12', MPAA_rate: "R", movie_id: 5},
            {title: 'Forest Gump', genre: 'Drama',runtime: 120, released: '1994-25-12', MPAA_rate: "PG-13", movie_id: 6},
            {title: 'The Apprentice', genre: 'Drama',runtime: 120, released: 'n/a', MPAA_rate: "n/a", movie_id: 7},

        ]

        const arrayOfCasts =[
            {name: 'Robert Downey Jr.',castCredit: 'Leading Man', role: 'Iron Man', isStar: true, filmography: 'Actor|Producer|Writer', numfilmCredit: 94},
            {name: 'Chris Evans', castCredit: 'Leading Man', role: 'Captain America', isStar: true, filmography: 'Actor|Producer|Director', numfilmCredit: 58},
            {name: 'Scarlet Johansson', castCredit: 'Leading Lady', role: 'Black Widow', isStar: true, filmography: 'Actor|Producer|Director', numfilmCredit: 74},
            {name: 'Sanaa Lathan', castCredit: 'Supporting Actress', role: 'Robin', isStar: false, filmography: 'Actor|Producer|Director', numfilmCredit: 49},
            {name: 'Morris Chestnut', castCredit: 'Leading Man', role: 'Lance Sullivan', isStar: true, filmography: 'Actor|Producer|Director', numfilmCredit: 54},
            {name: 'Regina Hall', castCredit: 'Supporting Actress', role: 'Candy', isStar: false, filmography: 'Actor|Producer|Soundtrack', numfilmCredit: 59},
            {name: 'Robin Wright', castCredit: 'null', role: 'null', isStar: false, filmography: 'Actor|Producer|Director', numfilmCredit: 61},

        ]

        const arrayOfCrews =[
           {name: 'Joss Whedon', crewCredit: 'Director', filmography: 'Writer|Producer|Director', knownFor: 'Writer-Buffy the Vampire Slayer', numfilmCredit: 17},
           {name: 'Zak Penn', crewCredit: 'Writer', filmography: 'Writer|Producer|Actor', knownFor: 'Writer-X2: X-Men United', numfilmCredit: 23},
           {name: 'Jon Favreau', crewCredit: 'Producer', filmography: 'Producer|Actor|Director', knownFor: 'Poducer-Iron Man', numfilmCredit: 32},
           {name: 'Malcom Lee', crewCredit: 'Director', filmography: 'Director|Producer|Writer', knownFor: "Director-Girl's Trip", numfilmCredit: 20},
           {name: 'Malcom D.Lee', crewCredit: 'Writer', filmography: 'Writer|Producer|Director', knownFor: "Writer-Best Man Holiday", numfilmCredit: 20},
           {name: 'John Roberts', crewCredit: 'Writer', filmography: 'Writer|Producer|Director', knownFor: "Writer-Best Man Holiday", numfilmCredit: 20},
        ]    

        await Movie.bulkCreate(arrayOfMovies)
        await Cast.bulkCreate(arrayOfCasts)
        await Crew.bulkCreate(arrayOfCrews)
    })

        test('Casts have name', async() => {

        const testCast = await Cast.findOne({where: {name: 'Robert Downey Jr.'}});
        expect(testCast.name).toBe('Robert Downey Jr.')
    })

        test('Casts have an role', async() => {

        const testCast = await Cast.findOne({where: {name: 'Robert Downey Jr.'}});
        expect(testCast.role).toBe('Iron Man')
    })

        test('Crew have crew has a name', async() => {

        const testCrew = await Crew.findOne({where: {name: 'Joss Whedon'}});
        expect(testCrew.name).toBe('Joss Whedon')
    })

        test('Crews have an crewCredit', async() => {

        const testCrew = await Crew.findOne({where: {name: 'Joss Whedon'}});
        expect(testCrew.crewCredit).toBe('Director')
    })
        test('can create a Movie', async() => {

        const testMovie = await Movie.findOne({where: {title: 'Avengers'}});
        const testMovie2 = await Movie.findOne({where: {title: 'The Best Man'}});
        expect(testMovie.genre).toBe('Superhero')
        expect(testMovie2.genre).toBe('Drama')
    })

        test('Movies have many Casts and Crew', async()=> {
        //read test Movie instance from db
        const testMovie = await Movie.findOne({where: {title: 'Avengers'}});
        const testMovie2 = await Movie.findOne({where: {title: 'The Best Man'}});        
        const testCast1 = await Cast.findOne({where: {name: 'Robert Downey Jr.'}})
        const testCast2 = await Cast.findOne({where: {name: 'Scarlet Johansson'}})
        const testCast3 = await Cast.findOne({where: {name: 'Chris Evans'}})
        
        const testCast4 = await Cast.findOne({where: {name: 'Sanaa Lathan'}})
        const testCast5 = await Cast.findOne({where: {name: 'Morris Chestnut'}})
        const testCast6 = await Cast.findOne({where: {name: 'Regina Hall'}})

        const testCrew1 = await Crew.findOne({where: {name: 'Joss Whedon'}})
        const testCrew2 = await Crew.findOne({where: {name: 'Zak Penn'}})
        const testCrew3 = await Crew.findOne({where: {name: 'Jon Favreau'}})

        const testCrew4 = await Crew.findOne({where: {name: 'Malcom Lee'}})
        const testCrew5 = await Crew.findOne({where: {name: 'Malcom D.Lee'}})
        const testCrew6 = await Crew.findOne({where: {name: 'John Roberts'}})
        
        //associations-add cast and crew to Movie
        await testMovie.addCast(testCast1)
        await testMovie.addCast(testCast2)
        await testMovie.addCast(testCast3)

        await testMovie2.addCast(testCast4)
        await testMovie2.addCast(testCast5)
        await testMovie2.addCast(testCast6)

        await testMovie.addCrew(testCrew1)
        await testMovie.addCrew(testCrew2)
        await testMovie.addCrew(testCrew3)

        await testMovie2.addCrew(testCrew4)
        await testMovie2.addCrew(testCrew5)        
        await testMovie2.addCrew(testCrew6)

        const CastList = await testMovie.getCasts()
        const CrewList = await testMovie.getCrews()

        const CastList2 = await testMovie2.getCasts()
        const CrewList2 = await testMovie2.getCrews()

        expect(CastList.length).toBe(3)
        expect(CastList[0] instanceof Cast).toBeTruthy()
        expect(CastList[0].name).toMatch('Robert Downey Jr.')
        expect(CastList[1].name).toMatch('Chris Evans')
        expect(CastList[2].name).toMatch('Scarlet Johansson')

        expect(CastList2[0].name).toMatch('Sanaa Lathan')
        expect(CastList2[1].name).toMatch('Morris Chestnut')
        expect(CastList2[2].name).toMatch('Regina Hall')

        expect(CrewList.length).toBe(3)
        expect(CrewList[0] instanceof Crew).toBeTruthy()
        expect(CrewList[0].name).toMatch('Joss Whedon')
        expect(CrewList[1].name).toMatch('Zak Penn')
        expect(CrewList[2].name).toMatch('Jon Favreau')

        expect(CrewList2[0].name).toMatch('Malcom Lee')
        expect(CrewList2[0].name).toMatch('Malcom Lee')
        expect(CrewList2[2].name).toMatch('John Roberts')
        




    })

    afterAll(async()=> {
        // await sequelize.sync({force:true})
        sequelize.close()
    })

})