import {juggler} from '@loopback/repository';
import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';

const config = {
  name: 'mongodb',
  connector: 'mongodb',
  url: process.env.MONGO_URI  'mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/miBase?retryWrites=true&w=majority',
  host: '',
  port: 0,
  user: '',
  password: '',
  database: '',
  useNewUrlParser: true
};

@lifeCycleObserver('datasource')
export class MongodbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mongodb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mongodb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

export default MongodbDataSource;
