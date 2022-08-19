const { describe, it, beforeEach } = require('mocha');
const chai = require('chai');
const chaiHTTP = require('chai-http');

chai.use(chaiHTTP);
const { expect } = chai;

const Movie = require('../db');

const server = require('../index');

describe('CRUD Testing', () => {
  let id;

  beforeEach(async () => {
    try {
      await Movie.deleteMany({});
      const testMovie = await Movie.create({
        title: 'Furious 10',
        description: 'Movie Descrption',
        dateReleased: '2015-03-04T00:00:00.000Z',
        ratings: 9,
      });
      id = testMovie._id;
    } catch (err) {
      console.error(err);
    }
  });

  it('should create a movie', (done) => {
    const newMovie = {
        title: 'Furious 10',
        description: 'Movie Descrption',
        dateReleased: '2015-03-04T00:00:00.000Z',
        ratings: 1,
    };
    chai.request(server).post('/createMovie').send(newMovie).end((err, res) => {
      expect(err).to.be.null;
      expect(res.status).to.equal(201);
      expect(res.body).to.include(newMovie);
      expect(res.body._id).to.not.be.null;

      return done();
    });
  });

  it('should update a movie', (done) => {
    chai.request(server).patch(`/updateMovie/${id}`).query({ name: 'Furious 10' }).end((err, res) => {
      expect(err).to.be.null;
      expect(res.status).to.equal(200);
      expect(res.body).to.include({
        _id: id.toString(),
        title: 'Furious 10',
        description: 'Movie Descrption',
        dateReleased: '2015-03-04T00:00:00.000Z',
        ratings: 9,
      });

      return done();
    });
  });

  it('should delete a movie', (done) => {
    chai.request(server).delete(`/removeMovie/${id}`).query({ name: 'Furious 11' }).end((err, res) => {
      expect(err).to.be.null;
      expect(res.status).to.equal(204);
      expect(res.body._id).to.not.be.null;
      return done();
    });
  });

  it('should get all movies', (done) => {
    chai.request(server).get('/getAllMovies').query({ name: 'Furious 11' }).end((err, res) => {
      expect(err).to.be.null;
      expect(res.status).to.equal(200);
      expect(res.body._id).to.not.be.null;
      return done();
    });
  });




});