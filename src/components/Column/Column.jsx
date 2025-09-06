import { useState } from "react";
import Card from "../Card/Card";
import { ColumnContainer, ColumnTitle, CardsContainer } from "./Column.styled";

function Column({ title, cards, onCardClick, onCardDrop, onDragStart }) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault(); // Необходимо для разрешения drop
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    // Проверяем, что мы действительно покидаем колонку, а не переходим к дочернему элементу
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    if (onCardDrop) {
      onCardDrop(title);
    }
  };

  return (
    <ColumnContainer
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        backgroundColor: isDragOver ? "#f0f0f0" : "transparent",
        transition: "background-color 0.2s ease",
      }}
    >
      <ColumnTitle>
        <p>{title}</p>
      </ColumnTitle>
      <CardsContainer>
        {cards.map((card) => (
          <Card
            key={card._id}
            id={card._id}
            topic={card.topic}
            title={card.title}
            date={card.date}
            cardData={card}
            onCardClick={onCardClick}
            onDragStart={onDragStart}
          />
        ))}
      </CardsContainer>
    </ColumnContainer>
  );
}

export default Column;
