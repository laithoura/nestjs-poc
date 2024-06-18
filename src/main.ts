import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './common/api-doc/setup-swagger';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('api')
  setupSwagger(app);

  /* Session */
  app.use(session({
    name: 'NESTJS_SESSION_ID',
    secret: 'DKEIEIEJMADKJDNFIEFNJDFNDFNDJFNFJDNFEJJNFEJNF',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000
    }
  }));

  // Enable Passport
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}
bootstrap();
