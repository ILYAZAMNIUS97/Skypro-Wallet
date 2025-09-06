import {
  LoaderContainer,
  LoaderContent,
  LoaderColumn,
  LoaderColumnTitle,
  LoaderCard,
  LoaderCardLine,
  LoaderCardShortLine,
} from "./Loader.styled";

const Loader = () => {
  const columns = [
    "Без статуса",
    "Нужно сделать",
    "В работе",
    "Тестирование",
    "Готово",
  ];

  const getCardsCount = (index) => {
    // Более реалистичное распределение карточек по колонкам
    const cardCounts = [3, 4, 2, 1, 2];
    return cardCounts[index] || 0;
  };

  const getCardVariation = (cardIndex, columnIndex) => {
    // Создаем разнообразие в карточках в зависимости от колонки и позиции
    const baseVariations = [
      { lines: 2, hasShort: true },
      { lines: 3, hasShort: false },
      { lines: 2, hasShort: false },
      { lines: 3, hasShort: true },
      { lines: 1, hasShort: true },
    ];

    // Добавляем вариативность на основе колонки
    const variation = baseVariations[cardIndex % baseVariations.length];

    // В колонке "Готово" делаем карточки более компактными
    if (columnIndex === 4) {
      return { lines: Math.max(1, variation.lines - 1), hasShort: true };
    }

    // В колонке "Нужно сделать" делаем карточки более детальными
    if (columnIndex === 1) {
      return {
        lines: Math.min(3, variation.lines + 1),
        hasShort: variation.hasShort,
      };
    }

    return variation;
  };

  return (
    <LoaderContainer>
      <LoaderContent>
        {columns.map((columnTitle, columnIndex) => (
          <LoaderColumn key={columnIndex}>
            <LoaderColumnTitle>{columnTitle}</LoaderColumnTitle>
            {Array.from({ length: getCardsCount(columnIndex) }).map(
              (_, cardIndex) => {
                const variation = getCardVariation(cardIndex, columnIndex);
                return (
                  <LoaderCard key={cardIndex}>
                    {Array.from({ length: variation.lines }).map(
                      (_, lineIndex) => (
                        <LoaderCardLine key={lineIndex} />
                      )
                    )}
                    {variation.hasShort && <LoaderCardShortLine />}
                  </LoaderCard>
                );
              }
            )}
          </LoaderColumn>
        ))}
      </LoaderContent>
    </LoaderContainer>
  );
};

export default Loader;
