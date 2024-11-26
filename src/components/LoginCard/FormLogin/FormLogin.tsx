import { ETypeAlertDialog } from '@/components/Layout/AlertDialog/AlertDialog.enum';
import { openAlert } from '@/redux/features/alert-dialog/alert-dialog.slice';
import { InputPassword } from '@/components/InputPassword/InputPassword';
import { inputChange, inputError } from '@/utilities/global.utility';
import { IUserApp } from '@/redux/features/user/user.interface';
import { updateUser } from '@/redux/features/user/user.slice';
import { IFormLogin } from '../LoginCard.interface';
import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import { useSetLocalStorage } from '@/hooks';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';

export function FormLogin(): JSX.Element {
   // Configuration
   const dispatch = useDispatch();

   // States
   const [formLogin, setFormLogin] = useState<IFormLogin>({
      username: { value: '' },
      password: { value: '' }
   });

   const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

   // Methods
   const handleSubmit = async (event: React.FormEvent): Promise<void> => {
      event.preventDefault();

      if (formDataFailed()) {
         return;
      }

      setLoadingSubmit(true);

      try {
         const login = await fetch('/api/login', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               username: formLogin.username.value,
               password: formLogin.password.value
            })
         });

         if (!login.ok) {
            if (login.status === 404) {
               dispatch(openAlert({ type: ETypeAlertDialog.Error, description: 'Usuario no encontrado' }));
            }

            if (login.status === 401) {
               dispatch(openAlert({ type: ETypeAlertDialog.Error, description: 'Contraseña incorrecta' }));
            }
         }

         const userResponse = await login.json();

         if (userResponse) {
            const user = {
               username: userResponse.username ?? '',
               role: userResponse.role ?? ''
            };

            useSetLocalStorage<IUserApp>('user', user);

            dispatch(updateUser(user));
         }
      } catch (error: any) {
         dispatch(openAlert({ type: ETypeAlertDialog.Error, description: 'Ha ocurrido un error' }));
      }

      setLoadingSubmit(false);
   };

   const formDataFailed = (): boolean => {
      let failed: boolean = false;

      if (!formLogin.username.value) {
         inputError<IFormLogin>(setFormLogin, 'username');

         failed = true;
      }

      if (!formLogin.password.value) {
         inputError<IFormLogin>(setFormLogin, 'password');

         failed = true;
      }

      return failed;
   };

   return (
      <form onSubmit={handleSubmit} className='w-full'>
         <Input
            id='username'
            name='username'
            type='username'
            label='Nombre de usuario'
            value={formLogin.username.value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
               inputChange<IFormLogin, string>(setFormLogin, 'username', event.target.value);
            }}
            error={formLogin.username.error}
            errorMessage={formLogin.username.errorMessage}
            fullWidth
         />

         <InputPassword
            label='Constraseña'
            value={formLogin.password.value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
               inputChange<IFormLogin, string>(setFormLogin, 'password', event.target.value);
            }}
            error={formLogin.password.error}
            errorMessage={formLogin.password.errorMessage}
         />

         <div className='w-full flex justify-end mt-2'>
            <Button submit={true} loading={loadingSubmit} fullWidth>
               Ingresar
            </Button>
         </div>
      </form>
   );
}
