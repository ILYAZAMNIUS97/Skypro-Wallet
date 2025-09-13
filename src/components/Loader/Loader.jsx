import { LoaderContainer, LoaderSpinner, LoaderText } from "./Loader.styled";

const Loader = ({ text = "Загрузка..." }) => {
  return (
    <LoaderContainer>
      <LoaderSpinner />
      <LoaderText>{text}</LoaderText>
    </LoaderContainer>
  );
};

export default Loader;
