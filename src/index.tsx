import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
  models: {
    transaction: Model
  },

seeds(server){
  server.db.loadData({
    transactions:[
      {
        id: 1,
        title: 'FreeLance de WebSite' ,
        type: 'deposit',
        category: 'Dev',
        amount: 6000,
        createdAt: new Date('2021-05-19 09:00:00')
      },
      {
        id: 2,
        title: 'Salario do Mês' ,
        type: 'deposit',
        category: 'Emprego',
        amount: 8000,
        createdAt: new Date('2021-05-20 09:00:00')
      },
      {
        id: 3,
        title: 'Mecânico (Manutenção)' ,
        type: 'withdraw',
        category: 'Despesas',
        amount: 4500,
        createdAt: new Date('2021-05-25 09:00:00')
      },
    ]
  })
},

  routes() {
    this.namespace = 'api';
    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })
    this.post('/transactions', (schema, request)=>{
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', data)
    })
  }
})


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
