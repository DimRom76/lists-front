import React from 'react';
import { Paper } from '@material-ui/core';

export default function HomeView() {
  return (
    <div className="container">
      <Paper className="paper">
        <h1>Списки</h1>
        <p>
          Приложение предназначенио для ведения списков. Например можно делать
          список дел с разбиением дел на мелкие задачи. Или можно создавать
          список покупок с внесеннім товаром
        </p>
      </Paper>
    </div>
  );
}
