//typescript
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class MyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}
`
This is a basic example of a middleware class that logs "Request..." to the console whenever a request is made to your server. 
  To use this middleware, you would need to register it in your module like this:
`
//typescript
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MyMiddleware } from './my.middleware';
import { AppController } from './app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [MyMiddleware],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MyMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
`This code registers the 
MyMiddleware
 class as a global middleware, meaning it will be applied to all routes and HTTP methods. 

You can customize the middleware by adding more logic to the 
use
 method, or by creating additional middleware classes and registering them as needed.
 `
