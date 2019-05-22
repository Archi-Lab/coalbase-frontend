import {Injectable} from "@angular/core";
import {CacheService} from "../../services/cache/cache.service";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  constructor(private readonly cacheService: CacheService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method.toLowerCase() === "get") {
      const cachedResponse = this.cacheService.get(req);
      return cachedResponse ? of(cachedResponse) : this.sendRequest(req, next);
    } else {
      this.cacheService.deleteAll();
      return this.sendRequest(req, next);
    }
  }

  sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse && event.status == 200 && req.method.toLowerCase() === "get") {
          this.cacheService.put(req, event);
        }
      })
    );
  }
}
