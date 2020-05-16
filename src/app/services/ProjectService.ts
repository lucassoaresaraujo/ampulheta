import { Injectable, NotFoundException } from '@nestjs/common';
import { Project } from '../models/Project';
import { ProjectDto } from '../dtos/Project.dto';
import { UserService } from './UserService';
import { Sequelize } from 'sequelize-typescript';
import { Transaction, FindOptions } from 'sequelize/types';
import { User } from '../models/User';
import { ProjectUsers } from '../models/ProjectUsers';

@Injectable()
export class ProjectService {
  constructor(private sequelize: Sequelize, private userService: UserService) {}

  async create(newProject: ProjectDto): Promise<Project> {
    let transaction: Transaction;
    let project: Project;

    try {
      transaction = await this.sequelize.transaction();

      project = await Project.create(newProject, { transaction });

      await Promise.all(
        this.createPromisesInsertProjectUsers(
          newProject.user_id,
          project,
          transaction,
        ),
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
    return project;
  }

  // returns an array of promises that associate the project to each of the users
  private createPromisesInsertProjectUsers(
    userIds: number[],
    project: Project,
    transaction: Transaction,
  ): Promise<void>[] {
    return userIds.map(userId => {
      return new Promise(async resolve => {
        const user = await this.userService.findById(userId, { transaction });
        await project.$add('users', user, { transaction });
        resolve();
      });
    });
  }

  async findByIdWithUsers(id: number): Promise<Project> {
    const project = await Project.findByPk(id, {
      include: [
        {
          as: 'users',
          model: User,
          attributes: ['id', 'name', 'login', 'email'],
          through: { attributes: [] },
        },
      ],
    });

    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async findById(
    id: number,
    options?: Omit<FindOptions, 'where'>,
  ): Promise<Project> {
    const project = await Project.findByPk(id, options);
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async findAll(): Promise<Project[]> {
    return await Project.findAll();
  }

  async update(id: number, projectData: ProjectDto): Promise<Project> {
    let transaction: Transaction;
    let updatedProject: Project;

    try {
      transaction = await this.sequelize.transaction();

      const project = await this.findById(id, { transaction });

      updatedProject = await project.update(projectData, { transaction });

      await ProjectUsers.destroy({
        force: true,
        where: { project_id: id },
        transaction,
      });

      await Promise.all(
        this.createPromisesInsertProjectUsers(
          projectData.user_id,
          updatedProject,
          transaction,
        ),
      );
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }

    return updatedProject;
  }
}
