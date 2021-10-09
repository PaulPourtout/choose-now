import React from 'react';

export const ChoicesContext = React.createContext({
  choices: ['Yes', 'No'],
  setChoices(newChoices: string[]) {
    this.choices = [...newChoices];
  },
});
