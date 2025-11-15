import {
  repository
} from '@loopback/repository';
import {
  post, get, requestBody, getModelSchemaRef, param, HttpErrors
} from '@loopback/rest';
import {Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
import * as bcrypt from 'bcryptjs';

export class UsuarioController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepo : UsuarioRepository,
  ) {}

  @post('/usuarios', {
    responses: {
      '200': {
        description: 'Usuario creado',
        content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {exclude: ['id']}),
        },
      },
    })
    usuario: Omit<Usuario, 'id'>,
  ): Promise<Usuario> {
    // Hash de password antes de persistir
    const hashed = await bcrypt.hash(usuario.password, 10);
    usuario.password = hashed;
    return this.usuarioRepo.create(usuario);
  }

  @get('/usuarios/{id}', {
    responses: {
      '200': {
        description: 'Obtener usuario por id',
        content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
      },
    },
  })
  async findById(
    @param.path.string('id') id: string
  ): Promise<Usuario> {
    return this.usuarioRepo.findById(id, {fields: {password: false}});
  }

  @post('/usuarios/login', {
    responses: {
      '200': {
        description: 'Login usuario (simple)',
      },
    },
  })
  async login(
    @requestBody() credentials: {email: string; password: string;}
  ) {
    const users = await this.usuarioRepo.find({where: {email: credentials.email}});
    if (!users || users.length === 0) throw new HttpErrors.Unauthorized('Email o password inválidos');
    const user = users[0];
    const passwordMatch = await bcrypt.compare(credentials.password, user.password);
    if (!passwordMatch) throw new HttpErrors.Unauthorized('Email o password inválidos');
    // Para el TP devolvemos el usuario (sin password)
    const u = user.toJSON ? user.toJSON() : user;
    delete u.password;
    return u;
  }
}
