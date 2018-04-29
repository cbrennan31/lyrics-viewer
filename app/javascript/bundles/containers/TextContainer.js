import React, { Component } from 'react';
import Text from '../components/Text';
import ActionCable from 'actioncable';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import EventIndexContainer from '../containers/EventIndexContainer';

const font = "'Fira Sans', sans-serif";

const muiTheme = getMuiTheme({
  fontFamily: font
});

class TextContainer extends Component {
  constructor(props) {
    super(props);

    let text = null;
    let defaultText =
      'Welcome to BCE Lyrics. There are no events currently in progress.';
    let code = this.props.code;

    if (this.props.lyrics) {
      text = this.props.lyrics;
    } else if (this.props.current_event) {
      text = this.props.current_event;
    } else {
      text = defaultText;
    }

    this.state = {
      cable: ActionCable.createConsumer('/cable'),
      subscription: false,
      text: text,
      languages: null,
      origText: text,
      code: this.props.code,
      codeChange: false,
      defaultText:
        'Welcome to BCE Lyrics. There are no events currently in progress.'
    };

    this.translate = this.translate.bind(this);
  }

  componentDidMount() {
    this.state.subscription = this.state.cable.subscriptions.create(
      {
        channel: 'VersesChannel'
      },
      {
        received: data => {
          let code = this.state.codeChange ? this.state.code : data.code;
          if (data.lyrics) {
            this.translate(data.lyrics, code);
          } else if (data.current_event) {
            this.translate(data.current_event, code);
          } else {
            this.translate(this.state.defaultText, code);
          }
        }
      }
    );
    fetch('api/v1/translations')
      .then(response => response.json())
      .then(json => {
        this.setState({ languages: json.languages });
      });
  }

  translate(text, code, codeChange = this.state.codeChange) {
    fetch(`/api/v1/translations`, {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify({
        code: code,
        text: text
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          text: json.translation.text,
          origText: text,
          code: code,
          codeChange: codeChange
        });
      })
      .catch(error => console.log('An error occurred.', error));
  }

  render() {
    let dropdownLabel = '(auto-detected - select to change)';

    if (this.state.codeChange) {
      dropdownLabel = '(selected)';
    }

    let text;

    if (this.state.text) {
      text = this.state.text;
    } else {
      if (this.state.codeChange) {
        text = this.translate(this.state.defaultText, this.state.code);
      } else {
        text = this.state.defaultText;
      }
    }

    let textArray = text.split('<br />');

    let displayText = textArray.map(line => {
      if (textArray.indexOf(line) != textArray.length - 1) {
        return (
          <div>
            <span>{line}</span>
            <br />
          </div>
        );
      } else {
        return <span>{line}</span>;
      }
    });

    let content = <Text text={displayText} languages={this.state.languages} />;

    let selectLang;

    if (this.state.languages) {
      let langOptions = this.state.languages.map(lang => {
        return <MenuItem value={lang.code} primaryText={lang.name} />;
      });

      selectLang = (
        <SelectField
          floatingLabelText={`Language ${dropdownLabel}`}
          onChange={(e, index, value) =>
            this.translate(this.state.origText, value, true)
          }
          style={{
            fontSize: '14px'
          }}
          value={this.state.code}
        >
          {langOptions}
        </SelectField>
      );
    }

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="text-container">
          <div style={{ display: 'inline-block', textAlign: 'left' }}>
            {content}
          </div>
          <br />
          <div style={{ display: 'inline-block', textAlign: 'left' }}>
            {selectLang}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default TextContainer;
