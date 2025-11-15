import {
  repository
} from '@loopback/repository';
import {
  post, get, param, requestBody, HttpErrors
} from '@loopback/rest';
import {Carrito} from '../models';
import {CarritoRepository, ArticuloRepository, UsuarioRepository} from '../repositories';

export class CarritoController {
  constructor(
    @repository(CarritoRepository)
    public carritoRepo: CarritoRepository,
    @repository(ArticuloRepository)
    public articuloRepo: ArticuloRepository,
    @repository(UsuarioRepository)
    public usuarioRepo: UsuarioRepository
  ) {}

  @post('/carritos', {
    responses: {
      '200': {
        description: 'Crear carrito',
      },
    },
  })
  async create(
    @requestBody() carrito: Omit<Carrito, 'id'|'total'>
  ): Promise<Carrito> {
    // calcular total si vienen items
    let total = 0;
    if (carrito.items && carrito.items.length > 0) {
      for (const it of carrito.items) {
        const art = await this.articuloRepo.findById(it.articuloId);
        if (!art) throw new HttpErrors.NotFound('Articulo no encontrado: ' + it.articuloId);
        total += art.precio * (it.cantidad || 1);
      }
    }
    carrito.total = total;
    return this.carritoRepo.create(carrito);
  }

  @get('/carritos/{id}')
  async findById(@param.path.string('id') id: string) {
    const carrito = await this.carritoRepo.findById(id);
    if (!carrito) throw new HttpErrors.NotFound('Carrito no encontrado');
    return carrito;
  }

  // Endpoint: agregar item al carrito
  @post('/carritos/{id}/items', {
    responses: {
      '200': {
        description: 'Agregar item al carrito',
      },
    },
  })
  async addItem(
    @param.path.string('id') id: string,
    @requestBody() item: {articuloId: string; cantidad: number}
  ) {
    const carrito = await this.carritoRepo.findById(id);
    if (!carrito) throw new HttpErrors.NotFound('Carrito no encontrado');
    const art = await this.articuloRepo.findById(item.articuloId);
    if (!art) throw new HttpErrors.NotFound('Articulo no encontrado');
    carrito.items = carrito.items || [];
    carrito.items.push({articuloId: item.articuloId, cantidad: item.cantidad || 1});
    carrito.total = (carrito.total || 0) + art.precio * (item.cantidad || 1);
    await this.carritoRepo.update(carrito);
    return carrito;
  }

  @get('/usuarios/{usuarioId}/carritos')
  async findByUsuario(@param.path.string('usuarioId') usuarioId: string) {
    const user = await this.usuarioRepo.findById(usuarioId);
    if (!user) throw new HttpErrors.NotFound('Usuario no encontrado');
    return this.carritoRepo.find({where: {usuarioId}});
  }
}
