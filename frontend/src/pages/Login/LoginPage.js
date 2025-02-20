import React,{useEffect} from 'react'
import { useForm } from 'react-hook-form';
import { Form, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import classes from './loginPage.module.css'
import Title from '../../components/Title/Title';
import Input from '../../components/Input/Input';

export default function LoginPage() {

  const {handleSubmit,register,formState :{errors} , }=useForm();
  const navigate=useNavigate();
  const {user,login}=useAuth();
  const [params]=useSearchParams();
  const returnUrl=params.get('returnUrl');
  useEffect(()=>{
    if(!user) return ;
    returnUrl ? navigate(returnUrl) :navigate('/');
},[user]
);

const submit=async({ email,password})=>{
    await login(email,password);
}

  return  <div className={classes.container}>
         <div className={classes.details}>
            <Title title='login'/>
            <form onSubmit={handleSubmit(submit)} noValidate>
                <Input type='email' label='Email' {...register('email',{
                    required:true,
                    pattern:{value:/^[\w-.]+@([\w-]+\.)+[\w-]{2,63}$/i,
                    message:'Email Is Not Valid !'
                    }
                })}/>
            </form>
            
         </div>
    </div>;
  
}
