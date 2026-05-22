---
sidebar_position: 5
---

# Intake Forms

Intake forms collect patient information required for clinical review, order processing, and subscription workflows.

## Assignment Types

- Staff-assigned intake from the EMR
- Product or phase-required intake created from order requirements
- Patient-submitted intake from the portal

## Workflow Notes

Use `intake.pending` for reminders or follow-up when an intake is assigned or required but not yet submitted.

Use order payload fields such as `order.pendingFormIds`, `order.requiredFormIds`, and `order.intakeSubmitted` for broader order-level workflows.
