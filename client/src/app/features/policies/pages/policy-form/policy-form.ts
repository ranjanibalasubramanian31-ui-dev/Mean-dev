import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import { Router } from "@angular/router";

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

import { PolicyService } from "../../services/policy";
import type {
  CreatePolicyRequest,
  PolicyStatus,
} from "../../models/policy";

@Component({
  selector: "app-policy-form",
  imports: [ReactiveFormsModule],
  templateUrl: "./policy-form.html",
  styleUrls: ["./policy-form.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolicyForm {
  private readonly policyService = inject(PolicyService);
  private readonly router = inject(Router);
  readonly isSubmitting = signal(false);
  readonly successMessage = signal("");
  readonly errorMessage = signal("");

  readonly policyForm = new FormGroup({
    policyNumber: new FormControl("", {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(/^POL-\d{3,}$/),
      ],
    }),

    customerName: new FormControl("", {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
      ],
    }),

    policyType: new FormControl("", {
      nonNullable: true,
      validators: [Validators.required],
    }),

    premium: new FormControl<number | null>(null, {
      validators: [
        Validators.required,
        Validators.min(0),
      ],
    }),

    status: new FormControl<PolicyStatus>("Active", {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  submit(): void {
    this.successMessage.set("");
    this.errorMessage.set("");

    if (this.policyForm.invalid) {
      this.policyForm.markAllAsTouched();
      return;
    }

    const formValue = this.policyForm.getRawValue();

    if (formValue.premium === null) {
      return;
    }

    const request: CreatePolicyRequest = {
      ...formValue,
      premium: formValue.premium,
    };

    this.isSubmitting.set(true);

    this.policyService.createPolicy(request).subscribe({
      next: (createdPolicy) => {
        this.successMessage.set(
          `Policy ${createdPolicy.policyNumber} created successfully.`
        );

        this.policyForm.reset({
          policyNumber: "",
          customerName: "",
          policyType: "",
          premium: null,
          status: "Active",
        });

        this.isSubmitting.set(false);
        this.router.navigate(["policies/list"]);
      },

      error: (error: unknown) => {
        console.error("Create policy failed:", error);

        this.errorMessage.set(
          "Unable to create the policy. Please check the entered details."
        );

        this.isSubmitting.set(false);
      },
    });
  }
}