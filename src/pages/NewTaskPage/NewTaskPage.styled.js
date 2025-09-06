import styled from "styled-components";

export const NewTaskContainer = styled.div`
  padding: 25px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const NewTaskHeader = styled.div`
  margin-bottom: 30px;
`;

export const NewTaskBackButton = styled.button`
  background: none;
  border: none;
  color: #565eef;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    text-decoration: underline;
  }
`;

export const NewTaskContent = styled.div`
  background: #ffffff;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
`;

export const NewTaskTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 30px;
  color: #000;
`;

export const NewTaskForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const NewTaskGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

export const NewTaskLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #000;
`;

export const NewTaskInput = styled.input`
  padding: 10px 8px;
  border: 0.7px solid #d4dbe5;
  border-radius: 8px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #94a6be;
  }

  &::placeholder {
    color: #94a6be;
  }
`;

export const NewTaskSelect = styled.select`
  padding: 10px 8px;
  border: 0.7px solid #d4dbe5;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  background-color: white;

  &:focus {
    border-color: #94a6be;
  }
`;

export const NewTaskTextarea = styled.textarea`
  padding: 10px 8px;
  border: 0.7px solid #d4dbe5;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  resize: vertical;
  font-family: inherit;

  &:focus {
    border-color: #94a6be;
  }

  &::placeholder {
    color: #94a6be;
  }
`;

export const NewTaskButton = styled.button`
  background-color: #565eef;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  align-self: flex-start;
  margin-top: 10px;

  &:hover {
    background-color: #33399b;
  }
`;
