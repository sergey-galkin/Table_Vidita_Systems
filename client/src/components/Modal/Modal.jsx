import React, { useEffect, useMemo, useState } from 'react';
import css from './Modal.module.css';
import { useSpring, animated } from '@react-spring/web'
import EventHandler from '../../libs/EventHandler';
import { useSelector } from 'react-redux';
import { selectChosenDocs } from '../Table/chosenDocsSlice';
import Button from '../Button/Button';
import axios from 'axios'

const Modal = ({ closeModal }) => {
  const chosenDocs = useSelector(selectChosenDocs);
  const [requestStage, setRequestStage] = useState(0);
  const [message, setMessage] = useState('');

  const animationDudation = 100;
  const [styles, api] = useSpring(() => ({
    from: { opacity: 0 },
    config: {
      duration: animationDudation,
    }
  }))

  useEffect(() => {
    api.start({ opacity: 1 });
    escapeKeydownEH.add();

    return () => escapeKeydownEH.remove();
  }, [])

  const closeModalHandler = () => {
    api.start({ opacity: 0 })
    setTimeout( () => {
      closeModal();
    }, animationDudation);
  };

  const anullDocs = () => {
    setRequestStage(1);
    axios.post('/cancel', chosenDocs.map(doc => doc.id))
      .then(res => {
        setRequestStage(2);
        setMessage(res.data);
      })
      .catch(err => {
        setRequestStage(2);
        setMessage('Во время передачи данных произошла ошибка.');
      })
    ;
  };

  const escapeKeydownEH = useMemo(() =>
    new EventHandler(
      document, { 'keydown': handleEscapeButton }
    )
  , [])

  function handleEscapeButton(e) {
    e = e || window.event;
    if (e.code !== 'Escape') return;
    closeModalHandler();
  }

  return (
    <animated.div style={styles} className={css['modal-container']} >
      <div className={css.modal} >
        <div className={css['content-holder']}>
          <h1 className={css.header}>Запрос на аннулирование</h1>
          {chosenDocs.length === 0 ?
            <>
              <h2 className={[css.subHeader, css.waiting].join(' ')}>Вы не выбрали товары</h2>
              <Button onClick={closeModalHandler}>Закрыть</Button>
            </>
            : requestStage === 0 ?
            <>
              <h2 className={css.subHeader}>Вы уверены что хотите аннулировать товар(ы):</h2>
              <p>
                {chosenDocs.map((doc, i) => {
                  const separator = i === chosenDocs.length - 1 ? '.' : ', ';
                  return <span key={doc.id}>{doc.name + separator}</span>
                })}
              </p>
              <div className={css.buttonsHolder}>
                <Button onClick={anullDocs} classesArr={[css.acceptBtn]}>Применить</Button>
                <Button onClick={closeModalHandler}>Отклонить</Button>
              </div>
            </>
            : requestStage === 1 ?
            <>
              <h2 className={[css.subHeader, css.waiting].join(' ')}>Ожидание ответа сервера...</h2>
            </>
            : 
            <>
              <h2 className={[css.subHeader, css.waiting].join(' ')}>{message}</h2>
              <Button onClick={closeModalHandler}>Закрыть</Button>
            </>
          }
        </div>
        <div className={css.cross} onClick={closeModalHandler} />
      </div>
    </animated.div>
  );
}

export default Modal;
