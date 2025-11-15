import {Entity, model, property, hasMany} from '@loopback/repository';
import {Carrito} from './carrito.model';

@model({settings: {strict: false}})
export class Usuario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      format: 'email'
    }
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string; 

  @hasMany(() => Carrito)
  carritos?: Carrito[];

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}
export interface UsuarioRelations {
}
export type UsuarioWithRelations = Usuario & UsuarioRelations;
