import React, { FC } from 'react';
import { Image } from 'antd';
import s from './profilePicture.module.css';
type ProfilePictureProps = {
  remove_profile_picture_checked: boolean;
  profile_picture_path: string | null;
};

const ProfilePicture: FC<ProfilePictureProps> = ({
  remove_profile_picture_checked,
  profile_picture_path,
}) => {
  return (
    <>
      {!remove_profile_picture_checked && profile_picture_path ? (
        <Image
          className={s.profileImg}
          src={profile_picture_path}
          alt="Профиль"
        />
      ) : (
        <Image
          className={s.profileImg}
          src={
            'https://static.vecteezy.com/system/resources/previews/007/225/199/non_2x/robot-chat-bot-concept-illustration-vector.jpg'
          }
          alt="Профиль"
        />
      )}
    </>
  );
};

export default ProfilePicture;
