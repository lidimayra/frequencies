import React from 'react';
import {IntlProvider} from "react-intl";
import { fireEvent, render, screen, within } from '@testing-library/react';
import FrequencyTable from '../../components/FrequencyTable';
import locale_en_us from '../../resources/en-us.json'

xtest('when rendering frequencies', () => {
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

  screen.getByRole('button').click();

  frequencies.forEach(([xi, fi]) => {
    // TODO: Make it work. This test is not working anymore after addition on
    // InlineMath component in FrequencyTable.js
    expect(screen.getByRole('row', { name: `${xi} ${fi}`})).toBeInTheDocument();
  });
});

