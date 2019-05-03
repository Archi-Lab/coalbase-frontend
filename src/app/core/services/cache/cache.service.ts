import {Injectable} from "@angular/core";
import {HttpRequest, HttpResponse} from "@angular/common/http";

@Injectable({providedIn: "root"})
export class CacheService {

  private readonly cache: Map<string, CacheResponse>;
  private readonly maxAge: number = 600000;

  constructor() {
    this.cache = new Map();
  }

  public get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    const url: string = this.getUrl(req);
    const cacheResponse: CacheResponse | undefined = this.cache.get(url);

    if (!cacheResponse) {
      return undefined;
    }

    if (this.isExpired(cacheResponse)) {
      this.cache.delete(url);
      return undefined;
    }
    return cacheResponse.data;
  }

  public put(req: HttpRequest<any>, res: HttpResponse<any>): void {
    const contentType: string = res.headers.get("Content-Type") as string;
    if (contentType != undefined && contentType.includes("application/json")) {
      const url: string = this.getUrl(req);
      const expiresOn: number = Date.now() + this.maxAge;
      this.cache.set(url, {expiresOn, data: res});
    }
  }

  public deleteAll(): void {
    this.cache.forEach((value, key) => this.cache.delete(key));
  }

  public delete(req: HttpRequest<any>): void {
    const url: string = this.getUrl(req);
    const cacheResponse: CacheResponse | undefined = this.cache.get(url);

    if (cacheResponse) {
      this.cache.delete(url);
    }
  }

  private isExpired(cacheResponse: CacheResponse): boolean {
    return cacheResponse.expiresOn <= Date.now();
  }

  private getUrl(req: HttpRequest<any>): string {
    return this.trimUrl(req.urlWithParams)
  }

  private trimUrl(url: string): string {
    if (url.charAt(url.length - 1) === '/') {
      return url.substr(0, url.length - 1);
    }
    return url;
  }
}

interface CacheResponse {
  expiresOn: number,
  data: HttpResponse<any>
}
