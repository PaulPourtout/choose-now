import React from 'react';

export const ChoicesContext = React.createContext({
  choices: [''],
  setChoices(newChoices: string[]) {
    this.choices = [...newChoices];
  },
});
