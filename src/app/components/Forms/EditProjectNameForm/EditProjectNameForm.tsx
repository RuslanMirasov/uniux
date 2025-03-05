'use client';

import { useEffect, useRef } from 'react';
import { InputError } from '../../../components';
import css from './EditProjectNameForm.module.scss';

interface EditProjectNameFormProps {
  projectName: string;
  setProjectName: React.Dispatch<React.SetStateAction<string>>;
  setDirtyStates: React.Dispatch<React.SetStateAction<{ [taskId: string]: boolean }>>;
}

const EditProjectNameForm: React.FC<EditProjectNameFormProps> = ({ projectName, setProjectName, setDirtyStates }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = '0px';
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [projectName]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProjectName(e.target.value);
    setDirtyStates(prev => ({ ...prev, ['prjectName']: !!e.target.value }));
  };

  return (
    <div className={css.TextareaWrapper}>
      <textarea
        ref={textareaRef}
        name="name"
        className={`${css.Textarea} ${!projectName ? css.Invalid : ''}`}
        value={projectName}
        onInput={handleInput}
      />
      {!projectName && <InputError text="Project name can not be empty!" />}
    </div>
  );
};

export default EditProjectNameForm;
