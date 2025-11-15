import {DefaultCrudRepository} from '@loopback/repository';
import {Articulo, ArticuloRelations} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ArticuloRepository extends DefaultCrudRepository<
  Articulo,
  typeof Articulo.prototype.id,
  ArticuloRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Articulo, dataSource);
  }
}
