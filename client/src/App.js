import React, { useState } from 'react';
import { useGetDocs1Query, useGetDocs2Query } from './api/apiSlice';
import Button from './components/Button/Button';
import Container from './components/Container/Container';
import Modal from './components/Modal/Modal';
import Table from './components/Table/Index/Index';
import SearchBar from './components/SearchBar/SearchBar';

const headers = [
  {key: 'name', value: 'Название'},
  {key: 'status', value: 'Статус'},
  {key: 'sum', value: 'Стоимость'},
  {key: 'qty', value: 'Количество'},
  {key: 'volume', value: 'Объём'},
  {key: 'currency', value: 'Валюта'},
  {key: 'delivery_date', value: 'Дата доставки'},
];

function App() {
  const [modal, setModal] = useState(false);
  const {isLoading: isLoading1} = useGetDocs1Query();
  const {isLoading: isLoading2} = useGetDocs2Query();
  const loaded = !isLoading1 && !isLoading2;
  return (
    <Container>
      { loaded
        ?
        <>
          <SearchBar headers={headers} />
          <main>
            <Table headers={headers} />
            <Button onClick={() => modal ? null : setModal(true)}>
              Аннулировать
            </Button>

          </main>
          { modal && <Modal closeModal={() => setModal(false)}/>}
        </>
        :
        <div>LOADING...</div>
      }
    </Container>
  );
}

export default App;
