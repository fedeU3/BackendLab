import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AuthUser } from '../auth/jwt.strategy';

@ApiTags('Lab 3 – Integraciones')
@Controller('lab3/posts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOperation({ summary: 'List published posts (paginated). Login first at /lab3/auth/login' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200 })
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return { data: await this.postsService.findPublished(+page, +limit) };
  }

  @Get('my')
  @ApiOperation({ summary: "List the authenticated user's own posts (published and unpublished)" })
  @ApiResponse({ status: 200 })
  async findMine(@CurrentUser() user: AuthUser) {
    return { data: await this.postsService.findMine(user) };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one post by ID (public if published, own/admin if unpublished)' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404 })
  async findOne(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: AuthUser) {
    return { data: await this.postsService.findOne(id, user) };
  }

  @Post()
  @ApiOperation({ summary: 'Create a post (always starts as unpublished)' })
  @ApiResponse({ status: 201 })
  async create(@Body() dto: CreatePostDto, @CurrentUser() user: AuthUser) {
    return { data: await this.postsService.create(dto, user), message: 'Post created' };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Partially update a post (author or admin only)' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 403, description: 'Not the author or admin' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePostDto,
    @CurrentUser() user: AuthUser,
  ) {
    return { data: await this.postsService.update(id, dto, user), message: 'Post updated' };
  }

  @Put(':id/publish')
  @ApiOperation({ summary: 'Toggle published status (author or admin only)' })
  @ApiResponse({ status: 200 })
  async togglePublish(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: AuthUser) {
    return { data: await this.postsService.togglePublish(id, user), message: 'Publish status toggled' };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post (author or admin only)' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 403, description: 'Not the author or admin' })
  async remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: AuthUser) {
    return { data: await this.postsService.remove(id, user), message: 'Post deleted' };
  }
}
