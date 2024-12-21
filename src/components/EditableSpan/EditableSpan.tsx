import { ChangeEvent, useState } from 'react';

type EditableSpanPropsType = {
  title: string;
  onChangeTitleHandler: (newValue: string) => void;
};

export const EditableSpan = ({
  title,
  onChangeTitleHandler,
}: EditableSpanPropsType) => {
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const activateEditMode = () => {
    setEditMode(true);
    setInputValue(title);
  };

  const activateViewMode = () => {
    setEditMode(false);
    onChangeTitleHandler(inputValue);
  };

  return editMode ? (
    <input
      value={inputValue}
      onBlur={activateViewMode}
      autoFocus
      onChange={onChangeInputHandler}
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{title}</span>
  );
};
