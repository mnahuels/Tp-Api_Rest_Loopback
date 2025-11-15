import {
  repository
} from '@loopback/repository';
import {
  post, get, patch, del, param, requestBody, getModelSchemaRef
} from '@loopback/rest';
import {Articulo} from '../models';
import {ArticuloRepository} from '../repositories';

export class ArticuloController {
  constructor(
    @repository(ArticuloRepository)
    public articuloRepo : ArticuloRepository,
  ) {}

  @post('/articulos', {
    responses: {
      '200': {
        description: 'Crear articulo',
        content: {'application/json': {schema: getModelSchemaRef(Articulo)}},
      },
    },
  })
  async create(
    @requestBody() articulo: Omit<Articulo, 'id'>
  ): Promise<Articulo> {
    return this.articuloRepo.create(articulo);
  }

  @get('/articulos', {
    responses: {
      '200': {
        description: 'Array de articulos',
        content: {'application/json': {schema: {type: 'array', items: getModelSchemaRef(Articulo)}}},
      },
    },
  })
  async find(): Promise<Articulo[]> {
    return this.articuloRepo.find();
  }

  @get('/articulos/{id}')
  async findById(@param.path.string('id') id: string): Promise<Articulo> {
    return this.articuloRepo.findById(id);
  }

  @patch('/articulos/{id}')
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() articulo: Partial<Articulo>
  ) {
    await this.articuloRepo.updateById(id, articulo);
    return {success: true};
  }

  @del('/articulos/{id}')
  async deleteById(@param.path.string('id') id: string) {
    await this.articuloRepo.deleteById(id);
    return {success: true};
  }
}
