import { Module } from '@nestjs/common';
import { UserInteractionService } from './user_interaction.service';
import { UserInteractionController } from './user_interaction.controller';

@Module({
  controllers: [UserInteractionController],
  providers: [UserInteractionService]
})
export class UserInteractionModule {}
