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

/**
 * Interceptor de NestJS que registra (log) el tiempo de ejecución de las
 * peticiones de GraphQL. Implementa el requerimiento de AOP (Aspect-Oriented Programming).
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Convertir el contexto a contexto de GraphQL
    const ctx = GqlExecutionContext.create(context);
    const info = ctx.getInfo();
    
    // Si no hay información de GraphQL, procedemos normalmente (evita errores en endpoints REST si existen)
    if (!info) {
      return next.handle();
    }

    const fieldName = info.fieldName;
    const parentType = info.parentType.name;
    const now = Date.now();

    this.logger.log(`[GraphQL Request] Iniciando ${parentType} -> ${fieldName}`);

    return next
      .handle()
      .pipe(
        tap(() =>
          this.logger.log(
            `[GraphQL Response] Completado ${parentType} -> ${fieldName} en ${Date.now() - now}ms`,
          ),
        ),
      );
  }
}
