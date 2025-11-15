import {Entity, model, property} from '@loopback/repository';

@model()
export class Articulo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true
  })
  id?: string;

  @property({
    type: 'string',
    required: true
  })
  nombre: string;

  @property({
    type: 'string'
  })
  descripcion?: string;

  @property({
    type: 'number',
    required: true
  })
  precio: number;

  @property({
    type: 'number',
    required: true,
    default: 0
  })
  stock: number;

  constructor(data?: Partial<Articulo>) {
    super(data);
  }
}

export interface ArticuloRelations {}
export type ArticuloWithRelations = Articulo & ArticuloRelations;
