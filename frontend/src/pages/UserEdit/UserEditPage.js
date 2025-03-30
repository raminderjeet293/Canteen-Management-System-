import React, { useEffect } from 'react'
import { getById, register, updateUser } from '../../services/userService';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import classes from './UserEdit.module.css'
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button.js';
import Title from '../../components/Title/Title';
import { EMAIL } from '../../constants/pattern';
export default function UserEditPage() {

    const {
        register,
        reset,
        handleSubmit,
        formState:{errors},
    } =useForm();

const {userId}=useParams();
const isEditMode=userId;

useEffect(()=>
{
   if(isEditMode)
       loadUser();
   
}, [userId]);

const loadUser = async () => {
    const user = await getById(userId);
    reset(user);
  };

const submit = (userData) => {
    updateUser(userData)
  };

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Title title={isEditMode ? 'Edit User' : 'Add User'} />
        <form onSubmit={handleSubmit(submit)} noValidate>
          <Input
            label="Name"
            {...register('name', { required: true, minLength: 3 })}
            error={errors.name}
          />
        
        <Input
            label="Email"
            {...register('email', { required: true, pattern: EMAIL })}
            error={errors.email}
          />

        

          <Input label="Is Admin" type="checkbox" {...register('isAdmin')} />
          <Button type="submit" text="Submit" width="150px"  fontSize='1.3rem'/>

        </form>
      </div>
    </div>
  )
}

