import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators'

@Injectable()
export class MetaService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private taURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  criar(meta: String): Observable<String> {
    return this.http.post<any>(this.taURL + "/meta/"+ meta, {headers: this.headers})
             .pipe( 
                retry(2),
                map( res => {if (res.success) {return meta;} else {return null;}} )
              ); 
  }

//   atualizar(meta: String): Observable<Aluno> {
//     return this.http.put<any>(this.taURL + "/aluno",JSON.stringify(aluno), {headers: this.headers})          .pipe( 
//                 retry(2),
//                 map( res => {if (res.success) {return aluno;} else {return null;}} )
//               ); 
//   }

  remover(meta: String): Observable<String> {
    return this.http.delete<any>(this.taURL + "/meta/"+ meta, {headers: this.headers})
            .pipe( 
                retry(2),
                map( res => {if (res.success) {return meta;} else {return null;}} )
              ); 
  }

  getMetas(): Observable<String[]> {
    return this.http.get<String[]>(this.taURL + "/metas")
              .pipe(
                 retry(2)
               );
  }

}