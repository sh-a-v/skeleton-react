import React, {PropTypes, Component} from 'react';
import Translate from 'react-translate-component';

export default class Translator extends Component {
  static childContextTypes = {
    translator: Translate.translatorType
  };

  constructor(props, context) {
    super(props, context);
  }

  getChildContext() {
    return {
      translator: this.props.translator
    }
  }

  render() {
    return this.props.children();
  }
}
