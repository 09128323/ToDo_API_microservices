import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
    const logger = new Logger('Bootstrap');

    try {
        const app = await NestFactory.createMicroservice<MicroserviceOptions>(
            AppModule,
            {
                transport: Transport.RMQ,
                options: {
                    urls: ['amqp://localhost:5672'],
                    queue: 'auth_queue',
                    queueOptions: {
                        durable: false,
                    },
                },
            }
        );

        await app.listen();
        logger.log('Microservice is listening');
    } catch (error) {
        logger.error('Error starting microservice', error);
    }
}

bootstrap();
