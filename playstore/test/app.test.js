const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');

describe('GET /apps', () => {
    it('should return an array of apps', () => {
        return request(app)
        .get('/apps')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.lengthOf.at.least(1);
            const app = res.body[0];
            expect(app).to.include.all.keys('App', 'Rating', 'Genres');
        });
    })

    it('should be 400 if sort is incorrect', () => {
        return request(app)
            .get('/apps')
            .query({sort: 'MISTAKE'})
            .expect(400, 'Sort must be either "App" or "Rating"');
    });

    it('should be 400 if genre is incorrect', () => {
        return request(app)
            .get('/apps')
            .query({genres: 'MISTAKE'})
            .expect(400, 'Genres must be one of the following: "Action", "Puzzle", "Strategy", "Casual", "Arcade", "Card"');
    });

    it('should filter by search input', () => {
        return request(app)
        .get('/apps')
        .query({search: 'clash'})
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.lengthOf.at.least(1);
            for (let i = 0; i < res.body.length; i++) {
                const appLower = res.body[i].App.toLowerCase();
                expect(appLower).to.include('clash');
            }
        });
    });

    it('should sort by App name', () => {
        return request(app)
            .get('/apps')
            .query({sort: 'App'})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                let i = 0;
                let sorted = true;
                while(sorted && i < res.body.length - 1) {
                    sorted = sorted && res.body[i].App < res.body[i + 1].App;
                    i++;
                }
                expect(sorted).to.be.true;
            });
    });

    it('should sort by Rating', () => {
        return request(app)
            .get('/apps')
            .query({sort: 'Rating'})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                let i = 0;
                let sorted = true;
                while(sorted && i < res.body.length - 1) {
                    sorted = sorted && res.body[i].Rating <= res.body[i + 1].Rating;
                    i++;
                }
                expect(sorted).to.be.true;
            });
    });
});