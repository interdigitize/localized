'use strict';
const dbUtils = require('../lib/utils.js');
const models = require('../models');
const expect = require('chai').expect;


describe('Tables exists', () => {

  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });

  afterEach(function (done) {
    dbUtils.rollback(done);
  });

  it('Contain Auth table', (done) => {
    expect(models.Auth).to.exist;
    done();
  });

  it('Contain Profile table', (done) => {
    expect(models.Profile).to.exist;
    done();
  });

  it('Contain posts table', (done) => {
    expect(models.Posts).to.exist;
    done();
  });

});