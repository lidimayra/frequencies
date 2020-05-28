import React from 'react';
import {IntlProvider} from "react-intl";
import { fireEvent, render, screen, within } from '@testing-library/react';
import FrequencyTable from '../../components/FrequencyTable';
import locale_en_us from '../../resources/en-us.json'

test('when rendering frequencies', () => {
  render(
    <IntlProvider locale='en' messages={locale_en_us}>
      <FrequencyTable numbers={[5, 5, 21, 42, 42, 42]} />
    </IntlProvider>
  );

  const frequencies = [
    ['5', '2'],
    ['21', '1'],
    ['42', '3']
  ];

  frequencies.forEach(([xi, fi]) => {
    const row = screen.getByText(xi).closest("tr");
    const utils = within(row);

    expect(utils.getByText(xi)).toBeInTheDocument();
    expect(utils.getByText(fi)).toBeInTheDocument();
  });
});
