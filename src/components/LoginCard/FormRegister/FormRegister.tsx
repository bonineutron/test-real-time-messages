import { RadioButtonsGroup } from '@/components/RadioButtonsGroup/RadioButtonsGroup';
import { ETypeAlertDialog } from '@/components/Layout/AlertDialog/AlertDialog.enum';
import { openAlert } from '@/redux/features/alert-dialog/alert-dialog.slice';
import { ERoleUser, IUserApp } from '@/redux/features/user/user.interface';
import { InputPassword } from '@/components/InputPassword/InputPassword';
import { inputChange, inputError } from '@/utilities/global.utility';
import { updateUser } from '@/redux/features/user/user.slice';
import { IFormRegister } from '../LoginCard.interface';
import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import { useSetLocalStorage } from '@/hooks';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';

export function FormRegister(): JSX.Element {
   // Configuration
   const dispatch = useDispatch();

   const roleOptions = [
      {
         value: ERoleUser.Student,
         label: 'Estudiante'
      },
      {
         value: ERoleUser.Moderator,
         label: 'Moderador'
      }
   ];

   // States
   const [formRegister, setFormRegister] = useState<IFormRegister>({
      username: { value: '' },
      password: { value: '' },
      confirmPassword: { value: '' }
   });

   const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

   const [roleUser, setRoleUser] = useState<number>(ERoleUser.Student);

   // Methods
   const handleSubmit = async (event: React.FormEvent): Promise<void> => {
      event.preventDefault();

      if (formDataFailed()) {
         return;
      }

      setLoadingSubmit(true);

      try {
         const createUser = await fetch('/api/users', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               username: formRegister.username.value,
               password: formRegister.password.value,
               role: roleUser
            })
         });

         if (!createUser.ok) {
            throw new Error('Error al registrar el usuario');
         }

         const userResponse = await createUser.json();

         if (userResponse) {
            const user = {
               username: userResponse.username ?? '',
               role: userResponse.role ?? ''
            };

            useSetLocalStorage<IUserApp>('user', user);

            dispatch(updateUser(user));

            dispatch(openAlert({ type: ETypeAlertDialog.Success, description: 'Usuario creado exitosamente' }));
         }
      } catch (error: any) {
         dispatch(openAlert({ type: ETypeAlertDialog.Error, description: 'Ha ocurrido un error' }));
      }

      setLoadingSubmit(false);
   };

   const formDataFailed = (): boolean => {
      let failed: boolean = false;

      if (!formRegister.username.value) {
         inputError<IFormRegister>(setFormRegister, 'username');

         failed = true;
      }

      if (!formRegister.password.value) {
         inputError<IFormRegister>(setFormRegister, 'password');

         failed = true;
      }

      if (!formRegister.confirmPassword.value) {
         inputError<IFormRegister>(setFormRegister, 'confirmPassword');

         failed = true;
      }

      if (
         formRegister.password.value &&
         formRegister.confirmPassword.value &&
         formRegister.password.value !== formRegister.confirmPassword.value
      ) {
         dispatch(openAlert({ type: ETypeAlertDialog.Error, description: 'No coinciden las contraseñas' }));

         failed = true;
      }

      return failed;
   };

   return (
      <form onSubmit={handleSubmit} className='w-full'>
         <RadioButtonsGroup label='Rol:' value={roleUser} setValue={setRoleUser} options={roleOptions} />

         <Input
            id='username'
            name='username'
            type='username'
            label='Nombre de usuario'
            value={formRegister.username.value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
               inputChange<IFormRegister, string>(setFormRegister, 'username', event.target.value);
            }}
            error={formRegister.username.error}
            errorMessage={formRegister.username.errorMessage}
            fullWidth
         />

         <InputPassword
            label='Constraseña'
            value={formRegister.password.value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
               inputChange<IFormRegister, string>(setFormRegister, 'password', event.target.value);
            }}
            error={formRegister.password.error}
            errorMessage={formRegister.password.errorMessage}
         />

         <InputPassword
            id='confirm-password'
            label='Confirmar constraseña'
            value={formRegister.confirmPassword.value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
               inputChange<IFormRegister, string>(setFormRegister, 'confirmPassword', event.target.value);
            }}
            error={formRegister.confirmPassword.error}
            errorMessage={formRegister.confirmPassword.errorMessage}
         />

         <div className='w-full flex justify-end mt-2'>
            <Button submit={true} loading={loadingSubmit} fullWidth>
               Registrarse
            </Button>
         </div>
      </form>
   );
}
