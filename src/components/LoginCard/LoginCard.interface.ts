import { IField } from '@/interfaces/global.interface';

export interface IFormLogin {
   username: IField<string>;
   password: IField<string>;
}

export interface IFormRegister {
   username: IField<string>;
   password: IField<string>;
   confirmPassword: IField<string>;
}
