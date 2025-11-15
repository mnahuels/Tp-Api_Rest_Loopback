import {BootMixin} from '@loopback/boot';
import {ApplicationConfig, BindingKey} from '@loopback/core';
import {RepositoryMixin, SchemaMigrationOptions} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {RestExplorerBindings, RestExplorerComponent} from '@loopback/rest-explorer';
import path from 'path';
import {MongodbDataSource} from './mongodb.datasource';
import {UsuarioRepository, ArticuloRepository, CarritoRepository} from './repositorios';

export {ApplicationConfig};

export class ApiRestLoopbackApplication extends BootMixin(
  RepositoryMixin(RestApplication),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Configuración REST
    this.static('/', path.join(__dirname, '../public'));

    // Configuramos el explorer (OpenAPI)
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    this.bootOptions = {
      controllers: {
        // namespace controllers under controllers/
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };

    // Data sources y repositorios serán enlazados por el CLI/boot si usas archivos index
  }
    }
