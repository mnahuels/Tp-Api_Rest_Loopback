import {ApiRestLoopbackApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export async function main(options: ApplicationConfig = {}) {
  const app = new ApiRestLoopbackApplication(options);

  // Registrar datasource programáticamente (opcional)
  const dsConfig = {
    name: 'mongodb',
    connector: 'mongodb',
    url: process.env.MONGO_URI || '',
  };
  app.dataSource(dsConfig, 'mongodb');

  // Iniciar app
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);
  console.log(`Explorer: ${url}/explorer`);

  return app;
}

if (require.main === module) {
  const config = {
    rest: {
      port: +(process.env.PORT ?? 3000),
      host: process.env.HOST ?? '0.0.0.0',
      openApiSpec: {
        // useful for debugging
        setServersFromRequest: true,
      },
    },
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
