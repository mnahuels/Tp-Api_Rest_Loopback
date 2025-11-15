import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Usuario} from './usuario.model';
import {Articulo} from './articulo.model';

@model()
export class Carrito extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true
  })
  id?: string;

  @belongsTo(() => Usuario)
  usuarioId: string;
  // Guardamos items como array de objetos { articuloId, cantidad }
  @property.array(Object)
  items?: {articuloId: string; cantidad: number;}[];

  @property({
    type: 'number',
    default: 0
  })
  total?: number;

  constructor(data?: Partial<Carrito>) {
    super(data);
  }
}

export interface CarritoRelations {}
export type CarritoWithRelations = Carrito & CarritoRelations;
