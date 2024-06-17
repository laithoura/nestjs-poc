import type { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('NestJS API Doc')
    .setVersion('1.0.0')
    .setContact('Thoura Lai', 'https://www.linkedin.com/in/thoura-lai-0700a2155/', 'laithoura.web@gmail.com')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("doc", app, document);
}