var yeoman = require('yeoman-generator');
// var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');
var changeCase = require('change-case');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'The proportion of ingredients is important, but the final result is also a matter of how you put them together. Equilibrium is key.'
    ));

    var prompts = [{
      type: 'rawlist',
      name: 'componentType',
      message: 'What type of component would you like to generate?',
      choices: [
        'ES6 Class',
        'Functional'
      ]
    }, {
      type: 'rawlist',
      name: 'styleType',
      message: 'What type of style processorare you using?',
      choices: [
        'styl',
        'less',
        'sass',
        'none'
      ]
    }, {
      type: 'input',
      name: 'componentName',
      message: 'Component name(CamelCased):'
    }];

    return this.prompt(prompts).then(function (props) {
      this.props = props;

      if (props.componentName.length === 0) {
        throw new Error(`A component name must be specified.`);
      }
    }.bind(this));
  },

  writing: function () {
    const className = changeCase.pascalCase(this.props.componentName);
    const fileName = changeCase.paramCase(this.props.componentName);
    const componentFolder = `${this.destinationRoot()}/${fileName}`;
    const cssMoudleStyleName = changeCase.camelCase(fileName);

    // Create folder structure.
    mkdirp.sync(`${fileName}/container`);
    mkdirp.sync(`${fileName}/presentational`);
    mkdirp.sync(`${fileName}/test`);

    // Copy template files.
    this.destinationRoot(componentFolder);

    this.fs.copyTpl(
      this.templatePath('component-stateless'),
      this.destinationPath(`presentational/${fileName}.js`), {
        className,
        styleName: cssMoudleStyleName
      }
    );

    this.fs.copyTpl(
      this.templatePath('index'),
      this.destinationPath(`index.js`), {
        className,
        fileName
      }
    );

    this.fs.copyTpl(
      this.templatePath('style-index'),
      this.destinationPath(`style/index.${this.props.styleType}`), {
        styleName: fileName
      }
    );
  },

  install: function () {
    this.installDependencies();
  }
});
