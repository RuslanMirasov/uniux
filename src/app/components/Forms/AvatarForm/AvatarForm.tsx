'use client';
import { useForm, Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { avatarValidationSchema } from '@/lib/validationSchemas';
import { Icon, Avatar } from '../../../components';
import css from './AvatarForm.module.scss';
import { useUser } from '@/hooks/useUser';
import { useState } from 'react';

interface AvatarFormProps {
  id: string;
  email: string;
  image?: string | null;
  name?: string | null;
}

interface FormData {
  image: File;
}

const AvatarForm: React.FC<AvatarFormProps> = ({ id, email, name, image }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useUser();
  const {
    register,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(avatarValidationSchema) as Resolver<FormData>,
  });

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList?.length) return;

    const file = fileList[0];
    setValue('image', file);

    const isValidImage = await trigger('image');
    if (!isValidImage) return;

    try {
      setIsLoading(true);
      const { uploadAvatar } = await import('@/lib/uploadAvatar');
      await uploadAvatar(file, id);
      mutate();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form className={css.AvatarForm}>
        <Avatar email={email} name={name} image={image} isLoading={isLoading} />
        <div className={css.AvatarFormIcon}>
          <Icon name="pen" size="10" />
        </div>
        <input type="file" {...register('image')} onChange={handleChange} />
      </form>
      {errors.image?.message && <span className={css.AvatarError}>{errors.image?.message}</span>}
    </>
  );
};

export default AvatarForm;
