import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';
import { Transaction } from 'sequelize/types';
import { isBefore, parseJSON } from 'date-fns';

import { Time } from '../models/Time';
import { TimeDto } from '../dtos/TimeDto';
import { ProjectService } from './ProjectService';

@Injectable()
export class TimeService {
  constructor(
    private sequelize: Sequelize,
    private projectService: ProjectService,
  ) {}

  async create(newTime: TimeDto): Promise<Time> {
    let transaction: Transaction;

    try {
      transaction = await this.sequelize.transaction();

      const parsedEndedAt = parseJSON(newTime.ended_at);
      const parsedStartedAt = parseJSON(newTime.started_at);

      if (isBefore(parsedEndedAt, parsedStartedAt)) {
        throw new BadRequestException('The ended_at must be after started_at!');
      }

      // checks if time is already allocated
      const isTimeAlreadyAllocated = await Time.count({
        where: {
          project_id: newTime.project_id,
          [Op.or]: {
            started_at: {
              [Op.gte]: newTime.started_at,
              [Op.lte]: newTime.ended_at,
            },
            ended_at: {
              [Op.gte]: newTime.started_at,
              [Op.lte]: newTime.ended_at,
            },
          },
        },
      });

      if (isTimeAlreadyAllocated) {
        throw new ConflictException('This time already allocated');
      }

      await this.projectService.findById(newTime.project_id, {
        transaction,
      });

      const time = await Time.create(newTime, { transaction });
      await transaction.commit();

      return time;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async findByProject(projectId: number): Promise<Time[]> {
    const project = await this.projectService.findById(projectId, {
      include: [Time],
    });

    return project.times;
  }
}
