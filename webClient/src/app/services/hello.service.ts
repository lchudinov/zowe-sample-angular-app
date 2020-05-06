

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface HelloResponseBody {
  _objectType: string,
  _metaDataVersion: string,
  requestBody: string,
  requestURL: string,
  serverResponse: string;
}

@Injectable()
export class HelloService {
  private destination:string;
  
  constructor(private http: HttpClient){}

  setDestination(path: string):void {
    this.destination = path;
  }

  sayHello(text: string): Observable<HelloResponseBody> {
    const requestBody = {
      "_objectType": "org.zowe.zlux.sample.angular.request.hello",
      "_metaDataVersion": "1.0.0",
      "messageFromClient": text
    }
    return this.http.post<HelloResponseBody>(this.destination, requestBody);
  }
  
  get(key: string): Observable<string> {
    let uri = this.destination;
    if (!uri.endsWith('/')) {
      uri += '/';
    }
    uri += key;
    return this.http.get<{ key: string, value: string, ok: boolean }>(uri).pipe(map(body => body.value));
  }

  set(key: string, value: string): Observable<boolean> {
    let uri = this.destination;
    if (!uri.endsWith('/')) {
      uri += '/';
    }
    uri += key;
    return this.http.put<{ key: string, value: string, ok: boolean }>(uri, { value })
      .pipe(map(body => body.ok));
  }

}

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

