var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-equilibrium:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({componentName: 'testComponent'})
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      'testComponent/presentational/testComponent.js'
    ]);
  });
});
