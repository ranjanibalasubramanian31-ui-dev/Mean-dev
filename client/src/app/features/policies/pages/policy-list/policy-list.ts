import { Component, inject } from '@angular/core';
import { PolicyService } from '../../services/policy';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { Policy } from '../../models/policy';
import type { Observable } from 'rxjs';

@Component({
  selector: 'app-policy-list',
  imports: [CommonModule],
  templateUrl: './policy-list.html',
  styleUrls: ['./policy-list.scss'],
})
export class PolicyList implements OnInit {
  private readonly policyService = inject(PolicyService);

  policies: Policy[] = [];
  constructor() {}

  ngOnInit(): void {
    this.policyService.getPolicy().subscribe({
      next: (policies: Policy[]) => {
        this.policies = policies;
      },
      error: (error) => {
        console.error('Failed to fetch policies:', error);
      },
    });
  }
}
