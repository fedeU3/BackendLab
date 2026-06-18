import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { ClerkivaModule } from './clerkiva/clerkiva.module';
import { LabClerkivaModule } from './lab-clerkiva/lab-clerkiva.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    ThrottlerModule.forRoot([
      {
        name: 'default',
        ttl: 60000,
        limit: 100,
      },
    ]),

    ScheduleModule.forRoot(),

    ClerkivaModule,
    LabClerkivaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
