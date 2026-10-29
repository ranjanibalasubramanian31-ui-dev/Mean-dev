import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import type {
  CreatePolicyRequest,
  Policy,
} from "../models/policy";

@Injectable({
  providedIn: "root",
})
export class PolicyService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = "http://localhost:3000/api/policies";

  createPolicy(policy: CreatePolicyRequest): Observable<Policy> {
    return this.http.post<Policy>(this.apiUrl, policy);
  }

 getPolicy(): Observable<Policy[]> {
  return this.http.get<Policy[]>(this.apiUrl);
}
}