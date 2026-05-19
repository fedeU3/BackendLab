import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { createReadStream, existsSync, readdirSync, statSync, unlinkSync } from 'fs';
import { Response } from 'express';
import { EventEmitter2 } from '@nestjs/event-emitter';

const UPLOADS_DIR = join(process.cwd(), 'uploads');
const ALLOWED_MIMES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB en bytes

/**
 * Controlador de archivos — demuestra upload con Multer y streaming de respuesta.
 *
 * FileInterceptor('file') integra Multer con NestJS y expone el archivo
 * en @UploadedFile(). El campo 'file' debe coincidir con el field name del form.
 *
 * diskStorage guarda el archivo en disco (alternativa: memoryStorage para procesarlo en memoria).
 * fileFilter valida el tipo MIME antes de guardar. Si rechaza, el archivo nunca llega al handler.
 *
 * StreamableFile: NestJS envuelve un ReadStream de Node.js para streamear
 * el archivo directamente sin cargarlo entero en memoria.
 *
 * Los archivos subidos se sirven también como estáticos desde /uploads/* (ver main.ts).
 */
@ApiTags('Lab 3 – Integraciones')
@Controller('lab3/files')
export class FilesController {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: UPLOADS_DIR,
        // Nombre único para evitar colisiones si dos usuarios suben el mismo archivo.
        filename: (_req, file, cb) => {
          const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          cb(null, `${unique}${extname(file.originalname)}`);
        },
      }),
      limits: { fileSize: MAX_SIZE_BYTES },
      // fileFilter decide si aceptar el archivo. Llamar cb(error, false) rechaza sin guardar.
      fileFilter: (_req, file, cb) => {
        if (ALLOWED_MIMES.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new BadRequestException(`Tipo "${file.mimetype}" no permitido. Permitidos: ${ALLOWED_MIMES.join(', ')}`), false);
        }
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: { type: 'object', properties: { file: { type: 'string', format: 'binary' } } } })
  @ApiOperation({ summary: 'Subir archivo — imágenes (JPEG, PNG, GIF, WebP) o PDF, máx 5 MB' })
  @ApiResponse({ status: 201, description: 'Retorna { filename, originalname, mimetype, size, url }' })
  @ApiResponse({ status: 400, description: 'Tipo de archivo no permitido o excede límite de tamaño' })
  upload(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No se proporcionó ningún archivo. Campo esperado: file');
    this.eventEmitter.emit('file.uploaded', { filename: file.filename, mimetype: file.mimetype, size: file.size });
    return {
      data: {
        filename: file.filename,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        url: `/uploads/${file.filename}`,
      },
      message: 'Archivo subido exitosamente',
    };
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los archivos en /uploads' })
  @ApiResponse({ status: 200 })
  list() {
    if (!existsSync(UPLOADS_DIR)) return { data: [] };
    const files = readdirSync(UPLOADS_DIR).map(filename => {
      const stat = statSync(join(UPLOADS_DIR, filename));
      return { filename, size: stat.size, url: `/uploads/${filename}`, uploadedAt: stat.mtime };
    });
    return { data: files };
  }

  @Get(':filename')
  @ApiOperation({ summary: 'Streamear un archivo por nombre — también accesible vía /uploads/:filename' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, description: 'Archivo no encontrado' })
  serve(
    @Param('filename') filename: string,
    @Res({ passthrough: true }) res: Response,
  ): StreamableFile {
    const filePath = join(UPLOADS_DIR, filename);
    if (!existsSync(filePath)) throw new NotFoundException(`Archivo "${filename}" no encontrado`);

    // passthrough: true permite que NestJS siga manejando headers/interceptors
    // mientras nosotros usamos @Res() directamente.
    res.set({ 'Content-Disposition': `inline; filename="${filename}"` });
    return new StreamableFile(createReadStream(filePath));
  }

  @Delete(':filename')
  @ApiOperation({ summary: 'Eliminar un archivo del disco' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, description: 'Archivo no encontrado' })
  remove(@Param('filename') filename: string) {
    const filePath = join(UPLOADS_DIR, filename);
    if (!existsSync(filePath)) throw new NotFoundException(`Archivo "${filename}" no encontrado`);
    unlinkSync(filePath); // eliminación síncrona — correcto para operaciones puntuales
    return { data: { filename }, message: 'Archivo eliminado exitosamente' };
  }
}
