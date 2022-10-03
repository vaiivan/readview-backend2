import { Injectable, Logger } from '@nestjs/common';
import {
  AddCommentDto,
  CreateDiscussionDto,
} from './dto/create-discussion.dto';
import { UpdateDiscussionDto } from './dto/update-discussion.dto';
import { InjectKnex, Knex } from 'nestjs-knex';
import { ok } from 'assert';

@Injectable()
export class DiscussionService {
  constructor(@InjectKnex() private readonly knex: Knex) {}
  private readonly logger = new Logger();

  async create(userId: number, createDiscussionDto: CreateDiscussionDto) {
    try {
      const res = await this.knex
        .insert({
          user_id: userId,
          title: createDiscussionDto.title,
          info: createDiscussionDto.info,
        })
        .into('discussion');
      return { status: 200, message: 'Topic submitted successfully' };
    } catch (e) {
      return { status: 400, message: 'Topic submission unsuccessful' };
    }
  }

  async allDiscussion(pageNo:number) {
    const page = pageNo * 10
    try {
      const result = await this.knex.raw(`
      select substring(discussion.title,1,100), username, users.id as userId, discussion.id as discussionId, discussion.info, cast (count(case when user_discussion.like then 1 end) as INT) as likes, 
      cast (count(case when user_discussion.unlike then 1 end) as INT) as unlikes, discussion.updated_at from discussion 
      left join user_discussion on user_discussion.discussion_id = discussion.id
      left join users on discussion.user_id = users.id
      group by discussion.title, discussion.info, discussion.id, discussion.updated_at, username, users.id
      order by discussion.created_at desc limit 10 offset ?     
      `,[page]);
      return result.rows;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'Topic submission unsuccessful' }];
    }
  }

  async discussionLead(discussionId: number) {
    try {
      const result = await this.knex.raw(
        `select substring(discussion.title,1,100) , username, users.id as userId, discussion.id as discussionId, discussion.info, cast (count(case when user_discussion.like then 1 end) as INT) as likes, 
        cast (count(case when user_discussion.unlike then 1 end) as INT) as unlikes, discussion.updated_at from discussion 
        left join user_discussion on user_discussion.discussion_id = discussion.id
        left join users on discussion.user_id = users.id
        where discussion.id = ?
        group by discussion.title, discussion.info, users.id, discussion.id, discussion.updated_at, username`,
        [discussionId],
      );
      return result.rows;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'Topic fetch unsuccessful' }];
    }
  }

  async discussionComments(discussionId: number) {
    try {
      const result = await this.knex.raw(
        `select username, users.id as userId, discussion_comment.updated_at, discussion_comment.content from discussion
      inner join discussion_comment on discussion.id = discussion_comment.discussion_id 
      inner join users on discussion_comment.user_id = users.id
      where discussion.id = ?`,
        [discussionId],
      );
      return result.rows;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'Topic submission unsuccessful' }];
    }
  }

  update(id: number, updateDiscussionDto: UpdateDiscussionDto) {
    return `This action updates a #${id} discussion`;
  }

  async like(discussionId: number, userId: number) {
    try {
      const res = await this.knex
        .insert({
          discussion_id: discussionId,
          user_id: userId,
          like: true,
          unlike: false,
        })
        .into('user_discussion');

      return { status: 200, message: 'liked' };
    } catch (e) {
      return { status: 400, message: 'internal server error' };
    }
  }

  async unlike(discussionId: number, userId: number) {
    try {
      const res = await this.knex
        .insert({
          discussion_id: discussionId,
          user_id: userId,
          like: false,
          unlike: true,
        })
        .into('user_discussion');
      return { status: 200, message: 'unliked' };
    } catch (e) {
      return { status: 400, message: 'internal server error' };
    }
  }

  async removeLikeUnlike(discussionId: number, userId: number) {
    try {
      const res = await this.knex.raw(
        `DELETE FROM user_discussion WHERE discussion_id=? AND user_id=?`,
        [discussionId, userId],
      );
      return { status: 200, message: 'status removed' };
    } catch (e) {
      return { status: 400, message: 'internal server error' };
    }
  }

  async checkStatus(discussionId: number, userId: number) {
    const res = await this.knex.raw(
      `SELECT * FROM user_discussion WHERE discussion_id=? AND user_id=?`,
      [discussionId, userId],
    );

    if (!res.rowCount) {
      return { status: 'no status' };
    }

    if (res.rows[0]['like']) {
      return { status: 'liked' };
    } else if (res.rows[0]['unlike']) {
      return { status: 'unliked' };
    }
  }

  async addComment(
    userId: number,
    addCommentDto: AddCommentDto,
    discussionId: number,
  ) {
    try {
      const res = await this.knex
        .insert({
          discussion_id: discussionId,
          user_id: userId,
          content: addCommentDto['content'],
        })
        .into('discussion_comment');
      return { status: 200, message: 'Comment submitted successfully' };
    } catch (e) {
      return { status: 400, message: 'Comment submission unsuccessful' };
    }
  }
}
