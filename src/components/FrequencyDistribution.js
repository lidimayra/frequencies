import React, { Component } from "react";
import { FormattedMessage, injectIntl } from 'react-intl';
import { Button } from 'react-materialize';
import FrequencyTable from './FrequencyTable';

class FrequencyDistribution extends Component {
  constructor(props) {
    super(props);

    this.displayText = this.displayText.bind(this);
    this.displayTable = this.displayTable.bind(this);
    this.state = {
      frequencyCount: null,
      display: false
    };
  }

  componentDidMount() {
    const frequencyCount = Array.from(this.calculate());
    this.setState({ frequencyCount: frequencyCount });
  }

  calculate() {
    return this.props.numbers.reduce(
      (acc, xi) => { acc.set(xi, (acc.get(xi) || 0) + 1); return acc },
      new Map()
    );
  }

  displayTable() {
    this.setState({ display: true });
  }

  displayText() {
    return this.state.frequencyCount.map(([xi, fi]) =>
      <p key={xi}>
        <FormattedMessage
          id='frequencyTable.number-occurrences'
          values={{ xi: <strong>{xi}</strong>, fi: <strong>{fi}</strong> }}/>
      </p>
    );
  }

  displayFrequencies() {
    return this.state.frequencyCount.map(([xi, fi]) =>
      <tr key={xi}>
        <td>{xi}</td>
        <td>{fi}</td>
        {this.props.children}
      </tr>
    );
  }

  render() {
    if (!this.state.frequencyCount) {
      return null
    }

    const { intl } = this.props;

    return(
      <div className="row">
        <div className="col s6">
          <p><FormattedMessage id='frequencyDistribution.analysis' /></p>

          {this.displayText()}

          <p>
            <FormattedMessage id='frequencyDistribution.description' />
          </p>

          { !this.state.display &&
            <Button onClick={this.displayTable}>
              <FormattedMessage id='frequencyDistribution.showInTable' />
            </Button>
          }
        </div>

       { this.state.display &&
        <div className="col s6">
          <FrequencyTable frequencyCount={this.state.frequencyCount}/>
        </div>
       }
      </div>
    );
  }
}

export default injectIntl(FrequencyDistribution);
