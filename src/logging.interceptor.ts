import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const info = GqlExecutionContext.create(context).getInfo();

    // El interceptor es global, así que también intercepta peticiones
    // que no son de GraphQL (si algún día hay un endpoint REST suelto).
    if (!info) return next.handle();

    const { fieldName, parentType } = info;
    const start = Date.now();

    this.logger.log(`[GraphQL Request] Iniciando ${parentType.name} -> ${fieldName}`);

    return next.handle().pipe(
      tap(() =>
        this.logger.log(
          `[GraphQL Response] Completado ${parentType.name} -> ${fieldName} en ${Date.now() - start}ms`,
        ),
      ),
    );
  }
}